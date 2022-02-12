import { Flex } from "@chakra-ui/react";

import styles from "./ToggleSwitch.module.css";

interface ToggleSwitchProps {
  icon?: any;
  trackColor: string;
  active: boolean;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  icon,
  trackColor,
  active,
}) => {
  let left = "-4px";
  if (active) {
    left = "12px";
  }

  return (
    <div style={{ backgroundColor: trackColor }} className={styles.container}>
      <Flex
        transition="inherit"
        width="26px"
        height="26px"
        position="absolute"
        left={left}
        top="-1px"
        backgroundColor="white"
        borderRadius="50%"
        boxShadow="0px 0px 5px 1px rgb(0, 0, 0, 0.1)"
        align="center"
        justify="center"
        border="1px solid"
        // borderColor={trackColor}
        borderColor="rgb(0, 0, 0, 0.2)"
      >
        {icon}
      </Flex>
    </div>
    // </button>
  );
};

export default ToggleSwitch;
