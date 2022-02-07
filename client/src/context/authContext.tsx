import { useContext, createContext, useEffect, useState } from "react";
import { auth, db, provider } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { signOut, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
};

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setPending(false);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          try {
            const userObj = {
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              isAnonymous: user.isAnonymous,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              providerData: user.providerData,
              uid: user.uid,
            };
            await setDoc(doc(db, "users", user.uid), userObj);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        navigate(`/${user.uid}`, { replace: true });
      } else {
        setCurrentUser(null);
        setPending(false);
        navigate("/login", { replace: true });
      }
    });
  }, []);

  const ctx: any = {
    currentUser,
    pending,
    signInViaGithub,
    logout,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
