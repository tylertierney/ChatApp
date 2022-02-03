import "./App.css";

import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import socket from "./socket";
import { message } from "./models/message";

const App = () => {
  const [newMessages, setNewMessages] = useState<message[] | []>([]);

  useEffect((): any => {
    socket.on("message", (msg: message) => {
      setNewMessages([...newMessages, msg]);
    });
    console.log(newMessages);
  }, [newMessages.length]);

  return (
    <>
      <Navbar />
      <Flex flexGrow={1} height="93%" position="relative">
        <Home newMessages={newMessages} socket={socket} />
      </Flex>
    </>
  );
};

export default App;
