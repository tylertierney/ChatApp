import "./App.css";

import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import socketIOClient from "socket.io-client";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
const ENDPOINT = "http://localhost:4001";

const App = () => {
  const [response, setResponse] = useState("");
  const [socket, setSocket]: any = useState(null);

  useEffect((): any => {
    setSocket(socketIOClient(ENDPOINT));
    // const socket = socketIOClient(ENDPOINT);
    if (socket == null) return null;
    socket.on("message", (data: any) => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Flex flexGrow={1}>
        <Home response={response} socket={socket} />
      </Flex>
    </>
  );
};

export default App;
