import { Text } from "@chakra-ui/react";
import Message from "../Message/Message";
import { useNewMessages } from "../Home/Home";
import { enrichMessages } from "../../utilities/database";

interface CurrentConvoProps {}

const CurrentConversation: React.FC<CurrentConvoProps> = () => {
  const { newMessages, activeRoom } = useNewMessages();

  if (!activeRoom) return null;
  if (!activeRoom.messages) return null;

  const dictionary: any = {};

  activeRoom.members.forEach((member: any) => {
    dictionary[member.uid] = {
      displayName: member.nameInGroup,
      photoURL: member.photoURL,
    };
  });
  const filteredNewMessages = newMessages.filter(
    (msg: any) => msg.roomId === activeRoom.id
  );

  const allMessages = [...activeRoom.messages, ...filteredNewMessages];

  const enriched = enrichMessages(allMessages, dictionary, activeRoom.id);

  const noMessagesPlaceholder = (
    <Text mt="1rem" w="100%" textAlign="center">
      There's nothing here yet. Say something!
    </Text>
  );

  return (
    <>
      {enriched.length === 0
        ? noMessagesPlaceholder
        : enriched.map((msg: any, idx: any) => {
            return <Message key={idx} message={msg} />;
          })}
    </>
  );
};

export default CurrentConversation;
