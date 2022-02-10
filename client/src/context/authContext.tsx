import { useContext, createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  enrichUserData,
  generateUserDBobject,
  generateWelcomeRoom,
  getRoomFromID,
} from "../helperFunctions";

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
  userFromDB: {
    displayName: null,
    email: null,
    emailVerified: false,
    isAnonymous: null,
    phoneNumber: null,
    photoURL: null,
    providerData: null,
    uid: null,
    rooms: [],
  },
  enrichedUserData: {
    displayName: null,
    email: null,
    emailVerified: false,
    isAnonymous: null,
    phoneNumber: null,
    photoURL: null,
    providerData: null,
    uid: null,
    rooms: [],
  },
};

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userFromDB, setUserFromDB] = useState<any>(null);
  const [enrichedUserData, setEnriched] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const welcomeRoomObj = generateWelcomeRoom(
          user.email,
          user.uid,
          user.displayName
        );
        const welcomeRoomId = welcomeRoomObj.id;
        const userObj = generateUserDBobject(user, welcomeRoomId);

        setCurrentUser(user);
        setPending(false);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        // This is a new signup
        if (!docSnap.exists()) {
          const uid = user.uid;
          console.log(userObj);
          try {
            setIsNewUser(true);
            await setDoc(doc(db, "users", uid), userObj);
            await setDoc(doc(db, "rooms", welcomeRoomId), welcomeRoomObj);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          // setUserFromDB(userObj);

          const enriched = await enrichUserData(userObj);
          setEnriched(enriched);
          navigate(`/${user.uid}/${welcomeRoomId}`, { replace: true });
        }
        // This is a returning user
        else {
          const userFromDatabase = { ...docSnap.data() };
          const enriched = await enrichUserData(userFromDatabase);
          setEnriched(enriched);
          // const firstGroup = userFromDatabase.groups[0];
          // console.log(firstGroup);
          navigate(`/${user.uid}/${userFromDatabase.rooms[0].id}`, {
            replace: true,
          });
        }
      } else {
        setCurrentUser(null);
        setPending(false);
        navigate("/register", { replace: true });
      }
    });
  }, []);

  const ctx: any = {
    currentUser,
    pending,
    signInViaGithub,
    logout,
    isNewUser,
    userFromDB,
    enrichedUserData,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
