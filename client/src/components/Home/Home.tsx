import ConversationsList from "../ConversationsList/ConversationsList";
import InputGroup from "../InputGroup/InputGroup";
import { Flex, useToast } from "@chakra-ui/react";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { message } from "../../models/message";
import Sidebar from "../Sidebar/Sidebar";
import UserMenu from "../UserMenu/UserMenu";
import { useAuth } from "../../context/authContext";
import { useUserData } from "../../context/userDataContext";
import { usePanelShowing } from "../../App";
import socket from "../../socket";

import { useParams } from "react-router-dom";
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
  const params = useParams();

  const panelWidth = "260px";
  const [newMessages, setNewMessages] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<any>({});

  useEffect(() => {
    if (panelShowing !== "default") {
      setPanelShowing("default");
    }
    if (!enrichedUserData) return;
    for (let i = 0; i < enrichedUserData.rooms.length; i++) {
      const rm = enrichedUserData.rooms[i];
      if (rm["id"] === params.groupId) {
        setActiveRoom(rm);
      }
    }
  }, []);

  useEffect((): any => {
    // SocketSubscribed is used to prevent memory leaks
    let socketSubscribed = true;
    const roomId = activeRoom["id"];
    socket.on("message", (msg: message) => {
      if (socketSubscribed) {
        setNewMessages(() => [...newMessages, msg]);
      }
    });

    return () => {
      socketSubscribed = false;
    };
  }, [newMessages.length]);

  return (
    <Flex
      maxH="92vh"
      flexGrow={1}
      height="92%"
      position="relative"
      overflowX="hidden"
      className={styles.homeContainer}
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
        <InputGroup
          activeRoom={activeRoom}
          panelShowing={panelShowing}
          panelWidth={panelWidth}
        />
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
      {/* <Flex className={styles.copyTextToast} w="100px" h="20px" backgroundColor="green"></Flex> */}
    </Flex>
  );
};

export default Home;

export const useNewMessages = () => {
  return useOutletContext<NewMessagesType>();
};
