import { v4 as uuidv4 } from "uuid";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const generateUUID = () => {
  return uuidv4();
};

export const generateWelcomeRoom = (
  uid: string,
  displayName: string | null
) => {
  const welcomeRoomId = generateUUID();
  const welcomeRoomMemberObj: any = {};
  welcomeRoomMemberObj[`${uid}`] = { nameInGroup: displayName };
  const welcomeRoomObj = {
    id: welcomeRoomId,
    name: "Welcome!",
    members: [welcomeRoomMemberObj],
    messages: [
      {
        uid: "ChatmosBot",
        date: new Date(),
        text: "Welcome to Chatmosphere!",
      },
      {
        uid: "ChatmosBot",
        data: new Date(),
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

  console.log(welcomeRoomId);

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

export const getRoomsFromUser = (userFromDB: any) => {
  const result: any[] = [];
  // if (userFromDB == undefined) return [];

  if (userFromDB["rooms"]) {
    const _rooms = [...userFromDB["rooms"]];

    for (let i = 0; i < _rooms.length; i++) {
      const roomData = getRoomFromID(_rooms[i]).then((data) =>
        result.push(data)
      );
    }
  }
  // }

  return result;
};

export const getRoomFromID = async (roomID: string) => {
  const docRef = doc(db, "rooms", roomID);
  const docSnap = await getDoc(docRef);
  const roomData = docSnap.data();

  return roomData;
};

export const enrichUserData = (userFromDB: any) => {
  const newRooms: any = [];
  console.log(userFromDB);
  userFromDB.rooms.forEach((rm: any) => {
    getRoomFromID(rm)
      .then((data) => {
        newRooms.push(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  userFromDB.rooms = newRooms;
  console.log(userFromDB);
  return userFromDB;
};
