import { useContext, createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

const signInViaGithub = () => {
  signInWithRedirect(auth, provider);
};

const logout = async () => {
  await signOut(auth);
};

const initial = {
  currentUser: null,
  login,
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setPending(false);
        // Removing the navigate function in order for testing locally
        // navigate(`/${user.uid}`);
      } else {
        setCurrentUser(null);
        setPending(false);
        // Removing the navigate function in order for testing locally
        // navigate("/login");
      }
    });
  }, []);

  const ctx: any = {
    currentUser,
    pending,
    login,
    signInViaGithub,
    logout,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
