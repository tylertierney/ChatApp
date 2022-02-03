import { useColorModeValue, useColorMode, Button } from "@chakra-ui/react";
import theme from "../../theme";
import { useAuth } from "../../context/authContext";
import UserMenu from "../UserMenu/UserMenu";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Navbar: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  const brandPrimaryDarker = "#ed257b";
  const darkgray = theme.colors.brand.darkgray;
  const bgColor = useColorModeValue(brandPrimaryDarker, darkgray);

  const { currentUser, login } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "7%",
        backgroundColor: bgColor,
        zIndex: 2,
        boxShadow: "0px 0px 20px 1px rgb(0, 0, 0, 0.4)",
        color: "white",
      }}
    >
      {/* <Button onClick={() => toggleColorMode()}>toggle dark</Button> */}
      <ThemeSwitch />
      {currentUser ? (
        <UserMenu />
      ) : (
        <Button
          ml="10px"
          variant="unstyled"
          height="100%"
          bgColor="brand.primary.1000"
          borderRadius={0}
          p="0 1rem"
          onClick={() => login}
        >
          Log In
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
