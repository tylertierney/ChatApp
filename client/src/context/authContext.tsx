import { useContext, createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut, signInWithRedirect } from "firebase/auth";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { generateUUID, getRoomsFromUser } from "../helperFunctions";

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
};

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userFromDB, setUserFromDB] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const welcomeRoomId = generateUUID();
        const welcomeRoomMemberObj: any = {};
        welcomeRoomMemberObj[`${user.uid}`] = { nameInGroup: user.displayName };
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
        setCurrentUser(user);
        setUserFromDB(userObj);
        setPending(false);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const uid = user.uid;

          try {
            setIsNewUser(true);
            await setDoc(doc(db, "users", uid), userObj);
            await setDoc(doc(db, "rooms", welcomeRoomId), welcomeRoomObj);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          const userFromDatabase = { ...docSnap.data() };
          setUserFromDB(userFromDatabase);
        }
        // navigate(`/${user.uid}`, { replace: true });
      } else {
        setCurrentUser(null);
        setPending(false);
        navigate("/register", { replace: true });
      }
    });

    return () => setCurrentUser(null);
  }, []);

  const ctx: any = {
    currentUser,
    pending,
    signInViaGithub,
    logout,
    isNewUser,
    userFromDB,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
