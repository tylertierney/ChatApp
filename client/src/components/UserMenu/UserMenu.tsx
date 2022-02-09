import {
  Avatar,
  Button,
  Flex,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import styles from "./UserMenu.module.css";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const { currentUser, logout } = useAuth();

  const btnColor = useColorModeValue("brand.white", "brand.gray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  const hoverColor = useColorModeValue(
    "brand.hovergraylight",
    "brand.hovergraydark"
  );

  const menuItems = [
    {
      text: "Sign Out",
      icon: AiOutlineLogout,
      action: () => logout(),
    },
  ];

  const menuItemsArr = menuItems.map((item, idx) => {
    return (
      <Button
        key={idx}
        variant="unstyled"
        className={styles.menuItem}
        onClick={item.action}
        color={textColor}
        _hover={{ backgroundColor: hoverColor }}
        _focus={{ backgroundColor: hoverColor }}
        w="100%"
        borderRadius="0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0.2rem 1.5rem"
        height="3.6rem"
      >
        <Text as="span">{item.text}</Text>
        <Icon fontSize="1.2rem" as={item.icon} />
      </Button>
    );
  });

  if (currentUser == null) return null;

  return (
    <Flex className={styles.container}>
      <Flex className={styles.userInfo}>
        <Avatar size="md" mb="0.4rem" />
        <Text mb="0.3rem">{currentUser["displayName"]}</Text>
        <Button
          className={styles.statusBtn}
          bgColor={btnColor}
          _hover={{ backgroundColor: btnColor }}
        >
          <div className={styles.activeIndicator}></div>
          <Text>Active</Text>
        </Button>
      </Flex>
      {menuItemsArr}
    </Flex>
  );
};

export default UserMenu;
