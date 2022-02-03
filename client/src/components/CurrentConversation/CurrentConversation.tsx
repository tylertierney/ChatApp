import { Flex } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";
import { message } from "../../models/message";
import Message from "../Message/Message";

interface CurrentConvoProps {
  newMessages: message[];
}

const CurrentConversation: React.FC<CurrentConvoProps> = ({ newMessages }) => {
  return (
    <Flex
      flexGrow={1}
      className={styles.window}
      direction="column"
      p="10px 20px"
    >
      {newMessages.map((msg, idx) => {
        return <Message key={idx} message={msg} />;
      })}
    </Flex>
  );
};

export default CurrentConversation;
