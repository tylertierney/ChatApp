import { Flex, Icon } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { MdPlayArrow } from "react-icons/md";

interface ConvoListProps {
  panelShowing: string;
  setPanelShowing: Function;
}

const ConversationsList: React.FC<ConvoListProps> = ({
  panelShowing,
  setPanelShowing,
}) => {
  const handleWindowViewToggle = () => {
    if (panelShowing === "conversations_list") {
      setPanelShowing("default");
    } else {
      setPanelShowing("conversations_list");
    }
  };

  return (
    <Flex
      className={styles.window}
      transform={
        panelShowing === "conversations_list" ? "translate(220px, 0)" : "none"
      }
    >
      <Flex
        className={styles.viewBtn}
        bgColor="brand.primary.1000"
        align="center"
        justify="center"
        onClick={() => handleWindowViewToggle()}
      >
        <Icon
          as={MdPlayArrow}
          fontSize="1.3rem"
          className={styles.viewBtnArrow}
          transform={
            panelShowing === "conversations_list" ? "scaleX(-1)" : "none"
          }
        />
      </Flex>
      <Flex className={styles.convosContainer} bgColor="brand.gray" zIndex={1}>
        hi
      </Flex>
    </Flex>
  );
};

export default ConversationsList;
