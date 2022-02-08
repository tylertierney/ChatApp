import { Flex } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";
import { message } from "../../models/message";
import Message from "../Message/Message";
import { useAuth } from "../../context/authContext";
import { useNewMessages } from "../Home/Home";

interface CurrentConvoProps {}

const CurrentConversation: React.FC<CurrentConvoProps> = () => {
  const { newMessages } = useNewMessages();

  // if (!newMessages) return null;

  return (
    <Flex direction="column" w="100%" flexGrow={1}>
      {newMessages.map((msg, idx) => {
        return <Message key={idx} message={msg} />;
      })}
    </Flex>
  );
};

export default CurrentConversation;
