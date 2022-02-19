import ConversationsList from "../ConversationsList/ConversationsList";
import InputGroup from "../InputGroup/InputGroup";
import { Flex, useDisclosure } from "@chakra-ui/react";
import styles from "./Home.module.css";
import { useEffect, useState, useRef } from "react";
import { message } from "../../models/message";
import Sidebar from "../Sidebar/Sidebar";
import UserMenu from "../UserMenu/UserMenu";
import { useAuth } from "../../context/authContext";
import { usePanelShowing } from "../../App";
import socket from "../../socket";
import { useParams } from "react-router-dom";
import { Outlet, useOutletContext } from "react-router-dom";
import { addNewMessageToDb } from "../../utilities/database";
import InfoModal from "../Modal/InfoModal";
import RoomToolbar from "../RoomToolbar/RoomToolbar";

interface HomeRefType {
  homeRef: any;
}

interface NewMessagesType {
  newMessages: message[];
  activeRoom: any;
  setActiveRoom: Function;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const homeRef = useRef<any>(null);
  const { enrichedUserData, isNewUser } = useAuth();
  const { panelShowing, setPanelShowing } = usePanelShowing();
  const params = useParams();

  const panelWidth = "260px";
  const [newMessages, setNewMessages] = useState<any>([]);
  const [activeRoom, setActiveRoom] = useState<any>({});
  const currentConvoRef = useRef<any>(null);

  const handleSmoothScroll = (ref: any) => {
    if (ref.current) {
      const height = parseInt(window.getComputedStyle(ref.current).height);
      ref.current.scrollTo({ top: height, left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!enrichedUserData) return;
    const rm = enrichedUserData.rooms.filter(
      (rm) => rm["id"] === params.groupId
    )[0];
    setActiveRoom(rm);
    handleSmoothScroll(currentConvoRef);
    if (isNewUser) {
      onOpen();
    }
  }, [enrichedUserData, params.groupId, isNewUser, onOpen]);

  useEffect(() => {
    if (panelShowing !== "default") {
      setPanelShowing("default");
    }
    homeRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!enrichedUserData) return;
    enrichedUserData.rooms.forEach((rm: any) => {
      const roomId = rm.id;
      socket.emit("joinRoom", roomId);
    });
  }, [enrichedUserData]);

  useEffect((): any => {
    // SocketSubscribed is used to prevent memory leaks
    let socketSubscribed = true;
    socket.on("message", (msg: message, roomId: string) => {
      addNewMessageToDb(msg, roomId);
      let newMsg: any = { ...msg };
      newMsg.roomId = roomId;

      if (socketSubscribed) {
        setNewMessages((newMessages: any[]) => [...newMessages, newMsg]);
      }
    });
    if (currentConvoRef.current) {
      handleSmoothScroll(currentConvoRef);
      setConvoRefScrollTop(currentConvoRef.current.scrollTop);
    }

    return () => {
      socketSubscribed = false;
    };
  }, [activeRoom]);

  const [showRoomToolbar, setShowRoomToolbar] = useState(false);
  const [convoRefScrollTop, setConvoRefScrollTop] = useState(0);

  const handleConvoScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = currentConvoRef.current.scrollTop;
    if (scrollTop < convoRefScrollTop - 10) {
      setShowRoomToolbar(true);
    }
    if (scrollTop > convoRefScrollTop) {
      setShowRoomToolbar(false);
    }
    setConvoRefScrollTop(scrollTop);
  };

  useEffect(() => {
    handleSmoothScroll(currentConvoRef);
  }, [newMessages.length]);

  if (!enrichedUserData) return null;

  return (
    <Flex
      maxH="92vh"
      flexGrow={1}
      height="92%"
      position="relative"
      overflowX="hidden"
      className={styles.homeContainer}
      ref={homeRef}
    >
      <Sidebar
        panelShowing={panelShowing}
        setPanelShowing={setPanelShowing}
        side="left"
        panelWidth={panelWidth}
      >
        <ConversationsList
          setActiveRoom={setActiveRoom}
          homeRef={homeRef}
          newMessages={newMessages}
        />
      </Sidebar>
      <Flex
        className={styles.conversationWindow}
        direction="column"
        transition="0s ease-in-out"
        filter={panelShowing === "default" ? "none" : "blur(1px)"}
      >
        <Flex
          className={styles.messagesWindow}
          direction="column"
          ref={currentConvoRef}
          onScroll={(e) => handleConvoScroll(e)}
        >
          <RoomToolbar
            showRoomToolbar={showRoomToolbar}
            homeRef={homeRef}
            activeRoom={activeRoom}
          />
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
        <UserMenu homeRef={homeRef} />
      </Sidebar>
      <InfoModal
        homeRef={homeRef}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        type="Customize Profile"
        targetUser={null}
      />
    </Flex>
  );
};

export default Home;

export const useNewMessages = () => {
  return useOutletContext<NewMessagesType>();
};

export const useHomeRef = () => {
  return useOutletContext<HomeRefType>();
};
