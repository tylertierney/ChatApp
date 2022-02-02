import CurrentConversation from "../CurrentConversation/CurrentConversation";
import ConversationsList from "../ConversationsList/ConversationsList";
import InputGroup from "../InputGroup/InputGroup";
import { Flex } from "@chakra-ui/react";
import styles from "./Home.module.css";
import { useState } from "react";

interface HomeProps {
  response: string;
  socket: any;
}

const Home: React.FC<HomeProps> = ({ response, socket }) => {
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
        <CurrentConversation response={response} />
        <InputGroup socket={socket} />
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
