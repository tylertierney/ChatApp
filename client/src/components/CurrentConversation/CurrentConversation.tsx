import { Text } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";
import Message from "../Message/Message";
import { useNewMessages } from "../Home/Home";
import { formatDate } from "../../utilities/ui";
import { searchForUser } from "../../utilities/database";

interface CurrentConvoProps {}

const CurrentConversation: React.FC<CurrentConvoProps> = () => {
  const { newMessages, activeRoom } = useNewMessages();

  if (!activeRoom.messages) return null;

  const dictionary: any = {};

  const allMessages = [...activeRoom.messages, ...newMessages];

  for (let i = 0; i < activeRoom.members.length; i++) {
    const member = activeRoom.members[i];

    // const getPhotoUrl = async (uid: string) => {
    //   await searchForUser(member.uid)
    //     .then((user) => {
    //       console.log(user.photoURL);
    //       return user.photoURL;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    // const photoURL = getPhotoUrl(member.uid);

    dictionary[member.uid] = {
      displayName: member.nameInGroup,
      photoURL: member.photoURL,
    };
  }

  let prevMsgTime = -Infinity;
  let prevMsgSender = "";
  for (let j = 0; j < allMessages.length; j++) {
    const msg = allMessages[j];

    msg.displayName = dictionary[`${msg.uid}`].displayName;
    msg.photoURL = dictionary[`${msg.uid}`].photoURL;

    // Below this, we're formatting the date.
    const { date } = msg;

    let isoString;
    switch (typeof date) {
      case "string":
        isoString = date;
        break;
      default:
        isoString = new Date(date.toDate()).toISOString();
    }

    const currentTime = Math.round(new Date().getTime() / 1000);
    const messageTimeInSeconds = Math.round(
      new Date(isoString).getTime() / 1000
    );

    const difference = currentTime - messageTimeInSeconds;
    const parsedDate = formatDate(isoString, difference);
    msg.formattedDate = parsedDate;

    // While we have these numbers, we'll determine whether or
    // not the message should be 'threaded', meaning it won't display
    // the user avatar or name, for readability purposes

    let isThreaded = false;
    if (messageTimeInSeconds - prevMsgTime < 60 && prevMsgSender === msg.uid) {
      isThreaded = true;
    }
    msg.isThreaded = isThreaded;

    prevMsgSender = msg.uid;
    prevMsgTime = messageTimeInSeconds;
  }

  const noMessagesPlaceholder = (
    <Text mt="1rem" w="100%" textAlign="center">
      There's nothing here yet. Say something!
    </Text>
  );

  return (
    <>
      {activeRoom.messages.length === 0 && newMessages.length === 0
        ? noMessagesPlaceholder
        : activeRoom.messages.map((msg: any, idx: any) => {
            return <Message key={idx} message={msg} />;
          })}
      {newMessages.map((msg, idx) => {
        const newMsg: any = { ...msg };
        if (newMsg.roomId === activeRoom["id"]) {
          return <Message key={idx} message={msg} />;
        }
      })}
    </>
  );
};

export default CurrentConversation;
