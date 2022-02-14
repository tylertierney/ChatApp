import { useContext, createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import {
  enrichUserData,
  generateUserDBobject,
  generateWelcomeRoom,
} from "../utilities/database";

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
  setIsNewUser: (isNewUser: boolean) => false,
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
    isActive: true,
  },
};

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
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
          try {
            setIsNewUser(true);
            await setDoc(doc(db, "users", uid), userObj);
            await setDoc(doc(db, "rooms", welcomeRoomId), welcomeRoomObj);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          const enriched = await enrichUserData(userObj);
          setEnriched(enriched);
          navigate(`/${user.uid}/${welcomeRoomId}`, { replace: true });
        }
        // This is a returning user
        else {
          const userFromDatabase = { ...docSnap.data() };
          const enriched = await enrichUserData(userFromDatabase);
          setEnriched(enriched);
          navigate(`/${user.uid}/${userFromDatabase.rooms[0].id}`, {
            replace: true,
          });
        }

        // This listens for changes to the user object in firestore
        // and keeps the UI in-sync with any changes to any field

        const unsub = onSnapshot(doc(db, "users", user.uid), async (doc) => {
          const data = { ...doc.data() };
          const enriched = await enrichUserData(data);
          setEnriched(enriched);
        });
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
    setIsNewUser,
    enrichedUserData,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
