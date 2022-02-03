import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const initial = { currentUser: null, login: null, logout: null };

export const AuthContext = createContext(initial);

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user has changed: " + JSON.stringify(user));
        setCurrentUser(user);
        setPending(false);
      } else {
        setPending(false);
      }
    });
  }, []);

  const login = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "tytierney@yahoo.com",
      "asdf123"
    );
    console.log(userCredential.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const ctx: any = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
