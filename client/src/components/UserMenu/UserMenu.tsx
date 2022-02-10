import {
  Avatar,
  Button,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import styles from "./UserMenu.module.css";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const { currentUser, logout, enrichedUserData } = useAuth();
  const [idIsCopied, setIdIsCopied] = useState(false);

  const btnColor = useColorModeValue("brand.white", "brand.gray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  const hoverColor = useColorModeValue(
    "brand.hovergraylight",
    "brand.hovergraydark"
  );
  const toast = useToast();

  if (!enrichedUserData) return null;

  const menuItems = [
    {
      text: `User ID: ${enrichedUserData["uid"]}`,
      icon: (
        <Icon
          className={styles.copyIcon}
          as={MdContentCopy}
          aria-label="Copy User ID"
          fontSize="1.2rem"
        />
      ),
      action: () => {
        navigator.clipboard.writeText(enrichedUserData["uid"] || "");
        toast({
          title: "Copied User ID",
          // status: "success",
          duration: 1500,
          isClosable: false,
          variant: "subtle",
        });
        setIdIsCopied(true);
      },
    },
    {
      text: "Sign Out",
      icon: <AiOutlineLogout fontSize="1.2rem" />,
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
        height="3.8rem"
        padding="0 1.2rem"
      >
        <Text as="span" overflow="hidden" textOverflow="ellipsis" maxW="160px">
          {item.text}
        </Text>
        {item.icon}
        {/* {item.text.includes("User") && (
          <Text className={styles.copiedIndicator}>Copied!</Text>
        )} */}
      </Button>
    );
  });

  if (currentUser == null) return null;

  return (
    <Flex className={styles.container}>
      <Flex className={styles.userInfo}>
        <Avatar size="md" mb="0.4rem" />
        <Text mb="0.3rem">{enrichedUserData["displayName"]}</Text>
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
