import { useColorModeValue, Button, Icon, Flex, Image } from "@chakra-ui/react";
import theme from "../../theme";
import { useAuth } from "../../context/authContext";
import UserMenu from "../UserMenu/UserMenu";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../svg/test.svg";

const Navbar: React.FC = () => {
  const darkgray = theme.colors.brand.darkgray;
  const primaryColorDarker = theme.colors.brand.primary.darker;
  const bgColor = useColorModeValue(theme.colors.brand.white, darkgray);

  const { currentUser } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "7%",
        backgroundColor: bgColor,
        zIndex: 2,
        boxShadow: "0px 0px 20px 1px rgb(0, 0, 0, 0.4)",
        color: "white",
        padding: "0 1rem",
      }}
    >
      <Flex
        height="100%"
        w="120px"
        maxW="120px"
        align="center"
        justify="center"
      >
        <Link
          to="/"
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            top: "0",
            left: "0",
          }}
        >
          <Image
            position="absolute"
            top="50%"
            transform="translate(0, -50%)"
            src={logo}
            htmlHeight="100%"
            htmlWidth="100%"
          />
        </Link>
      </Flex>

      <Flex align="center">
        <ThemeSwitch />
        {currentUser ? (
          <UserMenu />
        ) : (
          <Link to="/login" style={{ height: "inherit" }}>
            <Button
              ml="10px"
              variant="unstyled"
              height="37px"
              bgColor={primaryColorDarker}
              p="0 0.5rem"
              boxShadow="1px 1px 5px 1px rgb(0, 0, 0, 0.1)"
              borderRadius="6px"
              color="white"
            >
              <Flex align="center" justify="space-between">
                Log In
                <Icon as={IoIosArrowForward} />
              </Flex>
            </Button>
          </Link>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
