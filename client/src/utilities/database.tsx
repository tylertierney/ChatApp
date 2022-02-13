import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

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
  if (!displayName) nameInGroup = email;
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
        text: "Welcome to Chatmosphere!",
      },
      {
        uid: "chatmosbot",
        date: new Date(),
        text: "I'm not a real person. Speaking to me will do nothing for you. This is your first conversation. ",
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
  for (let i = 0; i < userFromDatabase.rooms.length; i++) {
    let rm = userFromDatabase.rooms[i];
    const roomData = await getRoomFromID(rm);
    userFromDatabase.rooms[i] = roomData;
  }
  return userFromDatabase;
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
    members: [...membersArr],
    messages: [],
  };

  await setDoc(doc(db, "rooms", newRoomId), newRoomObj);

  await addRoomToUsers(members, newRoomId);
};

export const addRoomToUsers = async (users: any[], newRoomId: string) => {
  users.forEach(async (user) => {
    const userObj = await searchForUser(user.uid);
    const rooms = userObj.rooms;
    const newRooms = [rooms, newRoomId];
    await updateDoc(doc(db, "users", user.uid), { rooms: newRooms });
  });
};

export const addNewMessageToDb = async (newMessage: any, roomId: string) => {
  const roomData = await getRoomFromID(roomId);
  const messages = roomData.messages;
  const newMessages = [...messages, newMessage];
  await updateDoc(doc(db, "rooms", roomId), { messages: newMessages });
};

export const updateUserProfile = async (uid: string, newUsername: string) => {
  if (!auth.currentUser) return null;

  // First, update the user in the users database in Firestore
  const userObj = await searchForUser(uid);
  await updateDoc(doc(db, "users", uid), { displayName: newUsername });

  // Then, update the user profile in Firebase Auth
  await updateProfile(auth.currentUser, {
    displayName: newUsername,
  });

  // TODO: add a .then/.catch in order to return a success or error response
  // Then, use the toast context to display this to the user
};
