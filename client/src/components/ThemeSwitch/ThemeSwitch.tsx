import { useColorMode, useColorModeValue, Flex, Icon } from "@chakra-ui/react";
import styles from "./ThemeSwitch.module.css";
import { IoMdSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";

const ThemeSwitch: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  const left = useColorModeValue("-4px", "12px");
  const trackColor = useColorModeValue("#ff579fab", "#737d9a");
  const icon = useColorModeValue(BsMoonStarsFill, IoMdSunny);
  const iconColor = useColorModeValue("#737d9a", "#ff579fab");

  return (
    <button
      style={{ backgroundColor: trackColor }}
      className={styles.container}
      onClick={toggleColorMode}
    >
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
        borderColor={iconColor}
      >
        <Icon as={icon} color={iconColor} />
      </Flex>
    </button>
    // </Flex>
  );
};

export default ThemeSwitch;
