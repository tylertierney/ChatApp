import "./App.css";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
// import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { message } from "./models/message";
import { useAuth } from "./context/authContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import socket from "./socket";

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
        <Flex flexGrow={1} height="93%" position="relative">
          <Routes>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
            {currentUser && (
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
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Flex>
      </Flex>
      {/* {pending && <LoadingScreen />} */}
    </>
  );
};

export default App;
