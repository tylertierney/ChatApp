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

// interface UserDataContextProps {
//   children: ReactChild;
// }

export const UserDataContext = createContext(initial);

const UserDataProvider: React.FC = ({ children }) => {
  const { currentUser, userFromDB, favoritePerson } = useAuth();
  useEffect(() => {
    let _rooms = null;
    if (favoritePerson !== null && favoritePerson !== undefined) {
      _rooms = getRoomsFromUser(favoritePerson);
    }
    updateRooms(_rooms);
    // updateRooms([{ favoriteColor: "blue" }, { name: "tyler" }]);
  }, [currentUser, favoritePerson]);

  //  This works, but getting userFromDB (above ^) seems to be having a problem
  //   useEffect(() => {
  //     console.log("current user has changed");

  //     updateRooms([{ favoriteColor: "blue" }, { name: "tyler" }]);
  //   }, [currentUser, userFromDB]);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "updateRooms":
        return { ...state, rooms: action.payload };
    }
  };

  const [userData, dispatch] = useReducer(reducer, initial);

  const updateRooms = (rooms: any) => {
    // const copyOfUserData = { ...userData };

    // copyOfUserData.rooms = rooms;
    // console.log(copyOfUserData);

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
