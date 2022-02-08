import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { useAuth } from "../../context/authContext";

import ConvoListItem from "./ConvoListItem";

interface ConvoListProps {}

const ConversationsList: React.FC<ConvoListProps> = () => {
  const listBgColor = useColorModeValue("white", "brand.darkgray");
  const convosListBgColor = useColorModeValue("#f9f2f9", "#434354");

  const { userFromDB } = useAuth();

  let arr: any = [];
  if (userFromDB) {
    if (userFromDB.rooms) {
      arr = userFromDB["rooms"];
    }
  }

  return (
    <Flex
      className={styles.convosContainer}
      bgColor={convosListBgColor}
      zIndex={1}
    >
      <Text className={styles.groupTitle}>Rooms</Text>
      <Flex
        className={styles.roomsContainer}
        // bgColor={listBgColor}
      >
        {arr.map((rm: any, idx: any) => (
          <ConvoListItem key={idx} room={rm} bgColor={convosListBgColor} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ConversationsList;
