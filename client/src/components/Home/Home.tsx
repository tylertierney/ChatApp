import CurrentConversation from "../CurrentConversation/CurrentConversation";
import ConversationsList from "../ConversationsList/ConversationsList";
import InputGroup from "../InputGroup/InputGroup";
import { Flex } from "@chakra-ui/react";
import styles from "./Home.module.css";
import { useState } from "react";
import { message } from "../../models/message";

interface HomeProps {
  newMessages: message[];
  socket: any;
}

const Home: React.FC<HomeProps> = ({ newMessages, socket }) => {
  const [panelShowing, setPanelShowing] = useState("default");

  return (
    <>
      <ConversationsList
        panelShowing={panelShowing}
        setPanelShowing={setPanelShowing}
      />
      <Flex
        className={styles.conversationWindow}
        direction="column"
        bgColor="brand.gray"
        filter={panelShowing === "default" ? "none" : "brightness(50%)"}
      >
        <CurrentConversation newMessages={newMessages} />
        <InputGroup />
        <Flex
          display={panelShowing === "default" ? "none" : "initial"}
          className={styles.overlay}
          onClick={() => setPanelShowing("default")}
        ></Flex>
      </Flex>
    </>
  );
};

export default Home;
