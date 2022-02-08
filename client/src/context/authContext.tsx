import { useContext, createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut, signInWithRedirect } from "firebase/auth";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { generateUUID, getRoomsFromUser } from "../helperFunctions";
import { userFromDB } from "../models/userFromDB";

const signInViaGithub = () => {
  signInWithRedirect(auth, provider);
};

const logout = async () => {
  await signOut(auth);
};

const initial = {
  currentUser: null,
  signInViaGithub,
  logout,
  pending: true,
  isNewUser: false,
  userFromDB: {},
  favoritePerson: null,
};

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userFromDB, setUserFromDB] = useState<any>({});
  const [favoritePerson, setFavoritePerson] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setPending(false);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const uid = user.uid;
          const displayName = user.displayName;

          try {
            const welcomeRoomId = generateUUID();
            const welcomeRoomObj = {
              id: welcomeRoomId,
              name: "Welcome!",
              members: [{ uid: { nameInGroup: displayName } }],
            };

            const userObj = {
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              isAnonymous: user.isAnonymous,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              providerData: user.providerData,
              uid: user.uid,
              rooms: [welcomeRoomId],
            };

            await setDoc(doc(db, "users", uid), userObj);
            await setDoc(doc(db, "rooms", welcomeRoomId), welcomeRoomObj);
            setIsNewUser(true);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        const userFromDatabase = { ...docSnap.data() };
        setFavoritePerson(userFromDatabase);
        // setUserFromDB(userFromDatabase);

        navigate(`/${user.uid}`, { replace: true });
      } else {
        setCurrentUser(null);
        setPending(false);
        navigate("/register", { replace: true });
      }
    });
  }, []);

  // useEffect(() => {
  //   const getUserFromDB = async () => {
  //     if (currentUser) {
  //       const docRef = doc(db, "users", currentUser.uid);
  //       const docSnap = await getDoc(docRef);
  //       const userFromDB = { ...docSnap.data() };
  //       return userFromDB;
  //       // setUserFromDB(() => userFromDB);
  //     } else {
  //       return null;
  //     }
  //   };

  //   const user = getUserFromDB();
  //   setUserFromDB(user);
  // }, [currentUser]);

  const ctx: any = {
    currentUser,
    pending,
    signInViaGithub,
    logout,
    isNewUser,
    userFromDB,
    favoritePerson,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
