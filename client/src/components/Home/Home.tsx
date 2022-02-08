import CurrentConversation from "../CurrentConversation/CurrentConversation";
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

interface HomeProps {
  panelShowing: string;
  setPanelShowing: Function;
  newMessages: message[];
}

const Home: React.FC<HomeProps> = ({
  panelShowing,
  setPanelShowing,
  newMessages,
}) => {
  const { isNewUser } = useAuth();

  const panelWidth = "240px";

  useEffect(() => {
    if (panelShowing !== "default") {
      setPanelShowing("default");
    }
  }, []);

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
        <ConversationsList />
      </Sidebar>
      <Flex
        className={styles.conversationWindow}
        direction="column"
        transition="0s ease-in-out"
        filter={panelShowing === "default" ? "none" : "blur(1px)"}
      >
        <CurrentConversation newMessages={newMessages} />
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
