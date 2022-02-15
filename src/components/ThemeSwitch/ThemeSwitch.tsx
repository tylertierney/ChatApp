import { useColorMode, useColorModeValue, Icon } from "@chakra-ui/react";
import { IoMdSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const ThemeSwitch: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const trackColor = useColorModeValue("#ff579fab", "#737d9a");
  const moonIcon = <Icon as={BsMoonStarsFill} color="#737d9a" />;
  const sunIcon = <Icon as={IoMdSunny} color="#ff579fab" />;

  const icon = useColorModeValue(moonIcon, sunIcon);

  const active = useColorModeValue(false, true);

  return (
    <button style={{ appearance: "none" }} onClick={toggleColorMode}>
      <ToggleSwitch icon={icon} trackColor={trackColor} active={active} />
    </button>
  );
};

export default ThemeSwitch;
