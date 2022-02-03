import { Flex } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";
import { message } from "../../models/message";
import Message from "../Message/Message";
import { useAuth } from "../../context/authContext";

interface CurrentConvoProps {
  newMessages: message[];
}

const CurrentConversation: React.FC<CurrentConvoProps> = ({ newMessages }) => {
  const something = useAuth();
  console.log(something);

  return (
    <Flex flexGrow={1} className={styles.window} direction="column">
      {newMessages.map((msg, idx) => {
        return <Message key={idx} message={msg} />;
      })}
    </Flex>
  );
};

export default CurrentConversation;
