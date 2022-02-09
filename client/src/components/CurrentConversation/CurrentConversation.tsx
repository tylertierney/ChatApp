import { Flex } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";
import { message } from "../../models/message";
import Message from "../Message/Message";
import { useAuth } from "../../context/authContext";
import { useNewMessages } from "../Home/Home";

interface CurrentConvoProps {}

const CurrentConversation: React.FC<CurrentConvoProps> = () => {
  const { newMessages, activeRoom } = useNewMessages();

  if (!activeRoom.messages) return null;

  const dictionary: any = {};

  for (let i = 0; i < activeRoom.members.length; i++) {
    const member = activeRoom.members[i];
    dictionary[member.uid] = member.nameInGroup;
  }

  for (let j = 0; j < activeRoom.messages.length; j++) {
    const msg = activeRoom.messages[j];
    console.log(msg.uid);
    console.log(dictionary[`${msg.uid}`]);
    activeRoom.messages[j].displayName = dictionary[`${msg.uid}`];
  }

  console.log(activeRoom.messages);

  return (
    // <Flex direction="column" w="100%" flexGrow={1}>
    <>
      {activeRoom.messages.map((msg: any, idx: any) => {
        return <Message key={idx} message={msg} />;
      })}
      {newMessages.map((msg, idx) => {
        return <Message key={idx} message={msg} />;
      })}
    </>
    // </Flex>
  );
};

export default CurrentConversation;
