import { useColorModeValue } from "@chakra-ui/react";
import theme from "../../theme";

const Navbar: React.FC = () => {
  const primaryColor = theme.colors.brand.gray;
  const secondaryColor = theme.colors.brand.darkgray;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "7%",
        backgroundColor: useColorModeValue(primaryColor, secondaryColor),
        zIndex: 2,
        boxShadow: "0px 0px 20px 1px rgb(0, 0, 0, 0.4)",
      }}
    >
      hi
    </nav>
  );
};

export default Navbar;
