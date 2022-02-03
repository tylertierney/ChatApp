import { useColorMode, Switch } from "@chakra-ui/react";

const ThemeSwitch: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return <Switch onChange={toggleColorMode} />;
};

export default ThemeSwitch;
