import { useColorModeValue, Button, Icon, Flex } from "@chakra-ui/react";
import theme from "../../theme";
import { useAuth } from "../../context/authContext";
import UserMenu from "../UserMenu/UserMenu";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const darkgray = theme.colors.brand.darkgray;
  const primaryColorDarker = theme.colors.brand.primary.darker;
  const bgColor = useColorModeValue(primaryColorDarker, darkgray);
  const btnBgColor = useColorModeValue("white", primaryColorDarker);
  const btnColor = useColorModeValue(primaryColorDarker, "white");

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
      <ThemeSwitch />
      {currentUser ? (
        <UserMenu />
      ) : (
        <Link to="/login">
          <Button
            marginX="10px"
            variant="unstyled"
            height="70%"
            bgColor={btnBgColor}
            p="0 0.5rem"
            onClick={() => login()}
            boxShadow="1px 1px 5px 1px rgb(0, 0, 0, 0.1)"
            borderRadius="6px"
            color={btnColor}
          >
            <Flex align="center" justify="space-between">
              Log In
              <Icon as={IoIosArrowForward} />
            </Flex>
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
