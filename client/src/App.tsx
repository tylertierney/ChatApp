import "./App.css";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { message } from "./models/message";
import { useAuth } from "./context/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";

const App = () => {
  const [newMessages, setNewMessages] = useState<message[] | []>([]);
  const { pending } = useAuth();

  // useEffect((): any => {
  //   socket.on("message", (msg: message) => {
  //     setNewMessages((newMessages) => [...newMessages, msg]);
  //   });

  // }, [newMessages.length]);

  useEffect(() => {
    setNewMessages([{ sender: "Bob", date: new Date(), text: "hi there" }]);
  }, []);

  return (
    <>
      <Flex
        direction="column"
        h="100%"
        width="100%"
        filter={pending ? "blur(2px)" : "none"}
      >
        <Navbar />
        <Flex flexGrow={1} height="93%" position="relative">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home newMessages={newMessages} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Flex>
      </Flex>
      {pending && <LoadingScreen />}
    </>
  );
};

export default App;
