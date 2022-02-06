import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";

interface ConvoListProps {}

const ConversationsList: React.FC<ConvoListProps> = () => {
  return (
    <Flex
      className={styles.convosContainer}
      bgColor={useColorModeValue("brand.softwhite", "#3b3a3d")}
      zIndex={1}
    >
      hi
    </Flex>
  );
};

export default ConversationsList;
