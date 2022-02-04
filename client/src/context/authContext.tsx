import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const login = async () => {
  console.log("login activated in authcontext");
  const userCredential = await signInWithEmailAndPassword(
    auth,
    "tytierney@yahoo.com",
    "asdf123"
  );
};

const logout = async () => {
  await signOut(auth);
};

const initial = { currentUser: null, login, logout, pending: true };

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user has changed: " + user);
        setCurrentUser(user);
        setPending(false);
      } else {
        setCurrentUser(null);
        setPending(false);
      }
    });
  }, []);

  const ctx: any = {
    currentUser,
    pending,
    login,
    logout,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
