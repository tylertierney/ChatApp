import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { formatDate } from "./ui";

export const generateUUID = () => {
  return uuidv4();
};

export const generateWelcomeRoom = (
  email: string | null,
  uid: string,
  displayName: string | null
) => {
  const welcomeRoomId = generateUUID();
  let nameInGroup = displayName;
  if (!displayName) nameInGroup = email || "Anonymous";
  const welcomeRoomMemberObj = { uid: uid, nameInGroup };
  const chatmosBotMemberObj = { uid: "chatmosbot", nameInGroup: "ChatmosBot" };
  const welcomeRoomObj = {
    id: welcomeRoomId,
    name: "Welcome!",
    members: [welcomeRoomMemberObj, chatmosBotMemberObj],
    messages: [
      {
        uid: "chatmosbot",
        date: new Date(),
        text: "I'm not a real person. And I'm not one of those fancy bots that will respond to you.",
      },
      {
        uid: "chatmosbot",
        date: new Date(),
        text: "Welcome to Chatmosphere!",
      },
    ],
  };

  return welcomeRoomObj;
};

export const generateUserDBobject = (user: any, welcomeRoomId: string) => {
  const {
    displayName,
    email,
    emailVerified,
    isAnonymous,
    phoneNumber,
    photoURL,
    providerData,
    uid,
  } = user;

  const userObj = {
    displayName,
    email,
    emailVerified,
    isAnonymous,
    phoneNumber,
    photoURL,
    providerData,
    uid,
    rooms: [welcomeRoomId],
    isActive: true,
  };

  return userObj;
};

export const getRoomFromID = async (roomId: string) => {
  const docRef = doc(db, "rooms", roomId);
  const docSnap = await getDoc(docRef);
  const roomData = { ...docSnap.data() };
  return roomData;
};

export const enrichUserData = async (userFromDatabase: any) => {
  // At this point each "room" is an ID reference to a room.
  // Below, we go through each room and get the enriched version

  const enrichedRooms = await Promise.all(
    userFromDatabase.rooms.map(async (rm: any) => {
      const updatedRoom = await getRoomFromID(rm);

      // Then through each member and enrich each with the photoURL field
      // We also initiate a dictionary to use as a reference with the user's
      // in-group displayName. This will help when we enrich the messages.
      const dictionary: any = {};
      const enrichedMembers = await Promise.all(
        updatedRoom.members.map(async (member: any) => {
          dictionary[member.uid] = {
            displayName: member.nameInGroup,
            photoURL: member.photoURL,
          };
          if (member.uid === "chatmosbot") {
            member.photoURL = process.env.REACT_APP_CHATBOT_PROFILE_PIC_URL;
            return member;
          }
          const updatedMember = await searchForUser(member.uid);
          member.photoURL = updatedMember.photoURL;

          return member;
        })
      );

      // Now we loop through messages and enrich them with fields like
      // displayName, photoURL, formattedDate, and isThreaded
      const enrichedMessages = enrichMessages(
        updatedRoom.messages,
        dictionary,
        updatedRoom.id
      );

      updatedRoom.messages = enrichedMessages;
      updatedRoom.members = enrichedMembers;
      return updatedRoom;
    })
  );
  userFromDatabase.rooms = enrichedRooms;

  return userFromDatabase;
};

export const enrichMessages = (
  messages: any[],
  dictionary: any,
  roomId: string
) => {
  let prevMsgSender = "";
  let prevMsgTime = -Infinity;
  const enrichedMessages = messages.map((msg: any) => {
    msg.roomId = roomId;
    msg.displayName = dictionary[`${msg.uid}`].displayName;
    msg.photoURL = dictionary[`${msg.uid}`].photoURL;
    const { date } = msg;
    let isoString;
    switch (typeof date) {
      case "string":
        isoString = date;
        break;
      default:
        isoString = new Date(date.toDate()).toISOString();
    }
    const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
    const messageTimeInSeconds = Math.round(
      new Date(isoString).getTime() / 1000
    );
    const difference = currentTimeInSeconds - messageTimeInSeconds;
    const parsedDate = formatDate(isoString, difference);
    msg.formattedDate = parsedDate;

    let isThreaded = false;
    if (messageTimeInSeconds - prevMsgTime < 60 && prevMsgSender === msg.uid) {
      isThreaded = true;
    }
    msg.isThreaded = isThreaded;

    prevMsgSender = msg.uid;
    prevMsgTime = messageTimeInSeconds;

    return msg;
  });
  return enrichedMessages;
};

export const searchForUser = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const userData = { ...docSnap.data() };
  return userData;
};

export const createNewRoom = async (
  members: any[],
  currentUserUid: string,
  nameInGroup: string
) => {
  const membersArr = members.map((member) => {
    let nameToUse = member.displayName || member.email || "Anonymous";
    const { uid } = member;
    if (uid === currentUserUid) {
      return { uid, nameInGroup: nameInGroup };
    }
    return { uid, nameInGroup: nameToUse };
  });

  const newRoomId = generateUUID();

  const newRoomObj = {
    id: newRoomId,
    name: "",
    members: membersArr,
    messages: [],
  };

  await setDoc(doc(db, "rooms", newRoomId), newRoomObj);

  await addRoomToUsers(members, newRoomId);
};

export const addRoomToUsers = async (users: any[], newRoomId: string) => {
  users.forEach(async (user) => {
    const userObj = await searchForUser(user.uid);
    const rooms = userObj.rooms;
    const newRooms = [...rooms, newRoomId];
    await updateDoc(doc(db, "users", user.uid), { rooms: newRooms });
  });
};

export const addNewMessageToDb = async (newMessage: any, roomId: string) => {
  const roomData = await getRoomFromID(roomId);
  const messages = roomData.messages;
  const newMessages = [...messages, newMessage];
  await updateDoc(doc(db, "rooms", roomId), { messages: newMessages });
};

export const updateUserProfile = async (uid: string, newData: any) => {
  if (!auth.currentUser) return null;

  // First, update the user in the users database in Firestore
  await updateDoc(doc(db, "users", uid), newData);

  // Then, update the user profile in Firebase Auth
  await updateProfile(auth.currentUser, newData);

  // TODO: add a .then/.catch in order to return a success or error response
  // Then, use the toast context to display this to the user
};

export const updateUserProfileOnlyInDB = async (uid: string, newData: any) => {
  if (!auth.currentUser) return null;

  await updateDoc(doc(db, "users", uid), newData);
};

export const updateNameInRoom = async (
  uid: string,
  newUsername: string,
  roomId: string
) => {
  const roomData = await getRoomFromID(roomId);
  const newRoomMembers = roomData.members.map((member: any) => {
    if (member.uid === uid) {
      member.nameInGroup = newUsername;
    }
    return member;
  });

  await updateDoc(doc(db, "rooms", roomId), { members: newRoomMembers });
};
