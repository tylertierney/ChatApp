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

  const allMessages = [...activeRoom.messages, ...newMessages];

  for (let i = 0; i < activeRoom.members.length; i++) {
    const member = activeRoom.members[i];
    dictionary[member.uid] = member.nameInGroup;
  }

  for (let j = 0; j < allMessages.length; j++) {
    const msg = allMessages[j];
    allMessages[j].displayName = dictionary[`${msg.uid}`];
  }

  return (
    <>
      {activeRoom.messages.map((msg: any, idx: any) => {
        return <Message key={idx} message={msg} />;
      })}
      {newMessages.map((msg, idx) => {
        return <Message key={idx} message={msg} />;
      })}
    </>
  );
};

export default CurrentConversation;
