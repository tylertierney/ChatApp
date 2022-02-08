import { useColorModeValue, Button, Icon, Flex } from "@chakra-ui/react";
import theme from "../../theme";
import { useAuth } from "../../context/authContext";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import UserMenuIcon from "./UserMenuIcon";
import styles from "./Navbar.module.css";

interface NavProps {
  panelShowing: string;
  setPanelShowing: Function;
}

const Navbar: React.FC<NavProps> = ({ panelShowing, setPanelShowing }) => {
  const darkgray = theme.colors.brand.darkgray;
  const primaryColorDarker = theme.colors.brand.primary.darker;
  const bgColor = useColorModeValue(theme.colors.brand.white, darkgray);

  const { currentUser } = useAuth();

  const location = useLocation();

  const getBtnProps = (pathname: string) => {
    if (pathname === "/login") {
      return { link: "/register", text: "Sign Up" };
    } else {
      return { link: "/login", text: "Log In" };
    }
  };

  return (
    <nav
      className={styles.navbar}
      style={{
        backgroundColor: bgColor,
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
          <Logo />
        </Link>
      </Flex>
      <Flex align="center">
        <ThemeSwitch />
        {currentUser ? (
          <UserMenuIcon
            panelShowing={panelShowing}
            setPanelShowing={setPanelShowing}
          />
        ) : (
          <Link
            to={getBtnProps(location.pathname).link}
            style={{ height: "inherit" }}
          >
            <Button
              ml="10px"
              variant="unstyled"
              height="37px"
              bgColor={primaryColorDarker}
              p="0 0.5rem"
              boxShadow="1px 1px 5px 1px rgb(0, 0, 0, 0.1)"
              borderRadius="6px"
              color="white"
              width="90px"
              background="var(--pinkGradient)"
            >
              <Flex align="center" justify="center">
                {getBtnProps(location.pathname).text}
                <Icon as={IoIosArrowForward} ml="2px" />
              </Flex>
            </Button>
          </Link>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
