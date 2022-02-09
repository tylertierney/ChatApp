import ConversationsList from "../ConversationsList/ConversationsList";
import InputGroup from "../InputGroup/InputGroup";
import { Flex } from "@chakra-ui/react";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { message } from "../../models/message";
import Sidebar from "../Sidebar/Sidebar";
import UserMenu from "../UserMenu/UserMenu";
import { useAuth } from "../../context/authContext";
import { useUserData } from "../../context/userDataContext";
import { usePanelShowing } from "../../App";
import socket from "../../socket";

import { Outlet, useOutletContext } from "react-router-dom";

interface NewMessagesType {
  newMessages: message[];
  activeRoom: any;
  setActiveRoom: Function;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { currentUser, isNewUser, enrichedUserData } = useAuth();
  const { panelShowing, setPanelShowing } = usePanelShowing();

  const panelWidth = "240px";

  useEffect(() => {
    if (panelShowing !== "default") {
      setPanelShowing("default");
    }
  }, []);

  const [newMessages, setNewMessages] = useState<any[]>([
    { uid: "12345", date: new Date(), text: "hi there" },
  ]);
  const [activeRoom, setActiveRoom] = useState<any>({});

  useEffect((): any => {
    socket.on("message", (msg: message) => {
      setNewMessages(() => [...newMessages, msg]);
    });
  }, [newMessages.length]);

  return (
    <Flex
      maxH="93vh"
      flexGrow={1}
      height="93%"
      position="relative"
      overflowX="hidden"
    >
      <Sidebar
        panelShowing={panelShowing}
        setPanelShowing={setPanelShowing}
        side="left"
        panelWidth={panelWidth}
      >
        <ConversationsList setActiveRoom={setActiveRoom} />
      </Sidebar>
      <Flex
        className={styles.conversationWindow}
        direction="column"
        transition="0s ease-in-out"
        filter={panelShowing === "default" ? "none" : "blur(1px)"}
      >
        <Flex className={styles.messagesWindow} direction="column">
          <Outlet context={{ newMessages, activeRoom, setActiveRoom }} />
        </Flex>
        <InputGroup panelShowing={panelShowing} panelWidth={panelWidth} />
        <Flex
          display={panelShowing === "default" ? "none" : "initial"}
          className={styles.overlay}
          onClick={() => setPanelShowing("default")}
        ></Flex>
      </Flex>
      <Sidebar
        panelShowing={panelShowing}
        setPanelShowing={setPanelShowing}
        side="right"
        panelWidth={panelWidth}
      >
        <UserMenu />
      </Sidebar>
    </Flex>
  );
};

export default Home;

export const useNewMessages = () => {
  return useOutletContext<NewMessagesType>();
};
