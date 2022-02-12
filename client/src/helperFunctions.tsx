import { v4 as uuidv4 } from "uuid";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

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

export const readableErrorMessage = (msg: string) => {
  switch (msg) {
    case "auth/user-not-found":
      return "A user wasn't found at that email address";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "A user already exists with that email address";
    default:
      return "Something went wrong";
  }
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

export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

export const formatDate = (isoString: string, difference: number) => {
  let parsedDate;
  if (difference < 10) {
    parsedDate = "Just now";
  } else if (difference < 60) {
    parsedDate = difference + "s ago";
  } else if (difference < 600) {
    parsedDate = Math.floor(difference / 60) + "m ago";
  } else if (difference < 86400) {
    parsedDate = new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } else if (difference < 604800) {
    const time = new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const weekday = new Date(isoString).toLocaleDateString([], {
      weekday: "short",
    });
    parsedDate = weekday + " " + time;
  } else {
    parsedDate = new Date(isoString).toLocaleDateString([], {
      day: "numeric",
      month: "short",
    });
  }
  return parsedDate;
};

export const createNewRoom = (targetUser: any, currentUser: any) => {
  const newRoomId = generateUUID();
};
