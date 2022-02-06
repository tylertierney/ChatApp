import { Flex } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";
import { message } from "../../models/message";
import Message from "../Message/Message";

interface CurrentConvoProps {
  newMessages: message[];
}

const CurrentConversation: React.FC<CurrentConvoProps> = ({ newMessages }) => {
  return (
    <Flex className={styles.window} direction="column">
      <Flex direction="column" w="100%" flexGrow={1}>
        {newMessages.map((msg, idx) => {
          return <Message key={idx} message={msg} />;
        })}
      </Flex>
    </Flex>
  );
};

export default CurrentConversation;
