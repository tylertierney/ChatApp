import {
  useContext,
  createContext,
  useReducer,
  ReactChild,
  useEffect,
} from "react";
import { useAuth } from "./authContext";
import { getRoomFromID, getRoomsFromUser } from "../helperFunctions";

export const UserDataContext = createContext<any>({});

const UserDataProvider: React.FC = ({ children }) => {
  const { userFromDB } = useAuth();

  useEffect(() => {
    if (!userFromDB) return;
    updateUserInitially(userFromDB);
    enrichRooms(userFromDB);
  }, [userFromDB]);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "updateUserInitially":
        return action.payload;
      case "enrichRooms":
        console.log({ ...state, ...action.payload });
        return { ...state, ...action.payload };
    }
  };

  const [userData, dispatch] = useReducer(reducer, null);

  const updateUserInitially = (userFromDB: any) => {
    dispatch({ type: "updateUserInitially", payload: userFromDB });
  };

  const enrichRooms = (userFromDB: any) => {
    let _userFromDB = { ...userFromDB };
    // let _userData = { ...userData };

    const newRooms: any = [];

    _userFromDB.rooms.forEach((rm: any, idx: number) => {
      getRoomFromID(rm)
        .then((data) => {
          newRooms.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // _userData.rooms = newRooms;
    dispatch({ type: "enrichRooms", payload: { rooms: newRooms } });
  };

  const ctx: any = {
    userData,
    updateUserInitially,
    enrichRooms,
  };

  return (
    <UserDataContext.Provider value={ctx}>{children}</UserDataContext.Provider>
  );
};

export default UserDataProvider;

export const useUserData = () => useContext(UserDataContext);
