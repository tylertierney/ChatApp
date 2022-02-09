import { Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { useAuth } from "../../context/authContext";

import ConvoListItem from "./ConvoListItem";

interface ConvoListProps {
  setActiveRoom: Function;
}

const ConversationsList: React.FC<ConvoListProps> = ({ setActiveRoom }) => {
  const convosListBgColor = useColorModeValue("#d9dceb", "#434354");

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
      <Text className={styles.groupTitle}>Rooms</Text>
      <Divider />
      <Flex className={styles.roomsContainer}>
        {rooms.map((rm: any, idx: any) => (
          <ConvoListItem
            key={idx}
            room={rm}
            bgColor={convosListBgColor}
            setActiveRoom={setActiveRoom}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ConversationsList;
