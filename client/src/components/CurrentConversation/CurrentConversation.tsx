import { Flex } from "@chakra-ui/react";
import styles from "./CurrentConversation.module.css";

interface CurrentConvoProps {
  response: string;
}

const CurrentConversation: React.FC<CurrentConvoProps> = ({ response }) => {
  return (
    <Flex flexGrow={1} className={styles.window}>
      <p>{response}</p>
    </Flex>
  );
};

export default CurrentConversation;
