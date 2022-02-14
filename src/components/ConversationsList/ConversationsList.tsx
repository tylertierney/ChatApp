import {
  Divider,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { useAuth } from "../../context/authContext";
import { AiOutlinePlusCircle } from "react-icons/ai";

import ConvoListItem from "./ConvoListItem";
import Search from "../Search/Search";
import { RefObject, useState } from "react";

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
      <Flex className={styles.roomsContainer}>
        {rooms.map((rm: any, idx: any) => (
          <ConvoListItem
            key={idx}
            room={rm}
            setActiveRoom={setActiveRoom}
            newMessages={newMessages}
          />
        ))}
      </Flex>
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
