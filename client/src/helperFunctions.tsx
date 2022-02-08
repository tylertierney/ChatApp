import { v4 as uuidv4 } from "uuid";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const generateUUID = () => {
  return uuidv4();
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

  // if (userFromDB["rooms"]) {
  const _rooms = [...userFromDB["rooms"]];
  // _rooms.forEach((roomID) => {
  //   const roomData = getRoomFromID(roomID);
  //   result.push(roomData);
  // });
  for (let i = 0; i < _rooms.length; i++) {
    const roomData = getRoomFromID(_rooms[i]).then((data) => result.push(data));
    // result.push(roomData);
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
