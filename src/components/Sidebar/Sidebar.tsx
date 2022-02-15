import { Flex, useColorModeValue } from "@chakra-ui/react";
import { ReactChild } from "react";

import styles from "./Sidebar.module.css";
import ViewBtn from "./ViewBtn";

interface SidebarProps {
  panelShowing: string;
  setPanelShowing: Function;
  side: string;
  panelWidth: string;
  children: ReactChild;
}

const Sidebar: React.FC<SidebarProps> = ({
  panelShowing,
  setPanelShowing,
  side,
  panelWidth,
  children,
}) => {
  const handleWindowViewToggle = () => {
    if (panelShowing === "conversations_list") {
      setPanelShowing("default");
    } else {
      setPanelShowing("conversations_list");
    }
  };

  const bgColor = useColorModeValue(
    "brand.softwhite",
    "brand.independenceBlue"
  );

  if (side === "left") {
    return (
      <Flex
        className={styles.windowLeft}
        width={panelWidth}
        minW={panelWidth}
        transform={
          panelShowing === "conversations_list"
            ? `translate(${panelWidth}, 0)`
            : `none`
        }
        bgColor={bgColor}
      >
        <ViewBtn
          handleWindowViewToggle={handleWindowViewToggle}
          panelShowing={panelShowing}
        />

        {children}
      </Flex>
    );
  }

  return (
    <Flex
      className={styles.windowRight}
      width={panelWidth}
      minW={panelWidth}
      left={panelShowing === "userMenu" ? "calc(100vw - 260px)" : "100vw"}
      bgColor={bgColor}
      visibility={
        side === "right" && panelShowing !== "userMenu" ? "hidden" : "visible"
      }
    >
      {children}
    </Flex>
  );
};

export default Sidebar;
