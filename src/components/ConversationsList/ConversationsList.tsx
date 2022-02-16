import {
  Divider,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { useAuth } from "../../context/authContext";
import { AiOutlinePlusCircle } from "react-icons/ai";

import ConvoListItem from "./ConvoListItem";
import Search from "../Search/Search";
import { RefObject, useEffect, useState } from "react";

interface ConvoListProps {
  setActiveRoom: Function;
  homeRef: RefObject<HTMLDivElement>;
  newMessages: any[];
}

const ConversationsList: React.FC<ConvoListProps> = ({
  setActiveRoom,
  homeRef,
  newMessages,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const convosListBgColor = useColorModeValue(
    "rgba(242, 246, 247, 1)",
    "rgba(67, 67, 84, 1)"
  );
  const iconColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const { enrichedUserData } = useAuth();

  let rooms: any = [];

  if (enrichedUserData) {
    if (enrichedUserData.rooms) {
      rooms = enrichedUserData["rooms"];
    }
  }

  const sortedRoomsArr = rooms.sort((a: any, b: any) => {
    const mostRecentMsgA = a.messages[a.messages.length - 1];
    const mostRecentMsgB = b.messages[b.messages.length - 1];

    if (!mostRecentMsgA || !mostRecentMsgB) {
      return 1;
    }
    if (
      typeof mostRecentMsgA.date !== "string" ||
      typeof mostRecentMsgB.date !== "string"
    ) {
      return 1;
    }
    const timeOfA = mostRecentMsgA.date;
    const timeOfB = mostRecentMsgB.date;

    if (timeOfA > timeOfB) {
      return -1;
    }
    if (timeOfA < timeOfB) {
      return 1;
    }
    return 0;
  });

  const roomsArr = sortedRoomsArr.map((rm: any, idx: number) => {
    const filteredNewMessages = newMessages.filter(
      (msg: any) => msg.roomId === rm.id
    );
    return (
      <ConvoListItem
        key={idx}
        room={rm}
        setActiveRoom={setActiveRoom}
        newMessages={filteredNewMessages}
      />
    );
  });

  return (
    <Flex
      className={styles.convosContainer}
      bgColor={convosListBgColor}
      zIndex={1}
    >
      <Flex className={styles.groupControls}>
        <Text className={styles.groupTitle}>DMs</Text>
        <IconButton
          icon={<AiOutlinePlusCircle />}
          aria-label="Add new direct message"
          fontSize="1.7rem"
          variant="unstyled"
          onClick={() => setIsSearching(true)}
          color={iconColor}
          className={styles.plusButton}
        />
      </Flex>
      <Divider />
      {roomsArr}
      <Search
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        iconColor={iconColor}
        bgColor={convosListBgColor}
        homeRef={homeRef}
      />
    </Flex>
  );
};

export default ConversationsList;
