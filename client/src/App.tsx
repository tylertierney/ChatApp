import "./App.css";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
// import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { message } from "./models/message";
import { useAuth } from "./context/authContext";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import socket from "./socket";
import { useUserData } from "./context/userDataContext";

const App = () => {
  const [newMessages, setNewMessages] = useState<message[] | []>([]);
  const { pending } = useAuth();
  const { currentUser } = useAuth();

  useEffect((): any => {
    socket.on("message", (msg: message) => {
      setNewMessages(() => [...newMessages, msg]);
    });
  }, [newMessages.length]);

  useEffect(() => {
    setNewMessages([{ sender: "Bob", date: new Date(), text: "hi there" }]);
  }, []);

  const [panelShowing, setPanelShowing] = useState("default");

  return (
    <>
      <Flex
        direction="column"
        h="100%"
        width="100%"
        filter={pending ? "blur(2px)" : "none"}
      >
        <Navbar panelShowing={panelShowing} setPanelShowing={setPanelShowing} />

        {/* {currentUser && (
            <Route
              path={`/${currentUser["uid"]}`}
              element={
                <Home
                  panelShowing={panelShowing}
                  setPanelShowing={setPanelShowing}
                  newMessages={newMessages}
                />
              }
            />
          )} */}
        {/* {currentUser && (
            <Home
              panelShowing={panelShowing}
              setPanelShowing={setPanelShowing}
              newMessages={newMessages}
            />
          )} */}
        <Home
          panelShowing={panelShowing}
          setPanelShowing={setPanelShowing}
          newMessages={newMessages}
        />
        <Outlet />
      </Flex>
    </>
  );
};

export default App;
