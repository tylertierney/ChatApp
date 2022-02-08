import {
  useContext,
  createContext,
  useReducer,
  ReactChild,
  useEffect,
} from "react";
import { useAuth } from "./authContext";
import { getRoomsFromUser } from "../helperFunctions";

const initial: any = {
  rooms: [],
};

export const UserDataContext = createContext(initial);

const UserDataProvider: React.FC = ({ children }) => {
  const { currentUser, userFromDB } = useAuth();
  useEffect(() => {
    let _rooms = null;
    if (userFromDB !== null && userFromDB !== undefined) {
      _rooms = getRoomsFromUser(userFromDB);
    }
    updateRooms(_rooms);
  }, [currentUser, userFromDB]);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "updateRooms":
        return { ...state, rooms: action.payload };
    }
  };

  const [userData, dispatch] = useReducer(reducer, initial);

  const updateRooms = (rooms: any) => {
    dispatch({ type: "updateRooms", payload: rooms });
  };

  const ctx: any = {
    userData,
    updateRooms,
  };

  return (
    <UserDataContext.Provider value={ctx}>{children}</UserDataContext.Provider>
  );
};

export default UserDataProvider;

export const useUserData = () => useContext(UserDataContext);
