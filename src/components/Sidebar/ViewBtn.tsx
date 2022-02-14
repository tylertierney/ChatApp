import styles from "./Sidebar.module.css";
import { Flex, Icon } from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";

interface ViewBtnProps {
  handleWindowViewToggle: Function;
  panelShowing: string;
}

const ViewBtn: React.FC<ViewBtnProps> = ({
  handleWindowViewToggle,
  panelShowing,
}) => {
  return (
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
  );
};

export default ViewBtn;
