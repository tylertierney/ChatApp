import { useColorMode, Switch } from "@chakra-ui/react";

const ThemeSwitch: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Switch
      onChange={toggleColorMode}
      boxShadow="none"
      _focus={{ boxShadow: "0", outline: "none" }}
    />
  );
};

export default ThemeSwitch;
