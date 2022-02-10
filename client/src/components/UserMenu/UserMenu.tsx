import {
  Avatar,
  Button,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import styles from "./UserMenu.module.css";
import { MdContentCopy } from "react-icons/md";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FaChevronDown } from "react-icons/fa";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const { currentUser, logout, enrichedUserData } = useAuth();
  // const bgColor = useColorModeValue(
  //   "rgba(242, 246, 247, 1)",
  //   "var(--hovergraydark)"
  // );
  const btnColor = useColorModeValue("brand.white", "brand.gray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  const hoverColor = useColorModeValue("brand.hovergraylight", "#595969");
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
          duration: 1500,
          isClosable: false,
          variant: "subtle",
        });
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
      </Button>
    );
  });

  if (currentUser == null) return null;

  return (
    <Flex className={styles.container}>
      <Flex className={styles.userInfo} gap="3px">
        <UserAvatar
          size="lg"
          enrichedUserData={enrichedUserData}
          showStatus={false}
        />
        <Text mb="0.3rem">{enrichedUserData["displayName"]}</Text>
        <Button
          className={styles.statusBtn}
          bgColor={btnColor}
          _hover={{ backgroundColor: hoverColor }}
          height="1.8rem"
          backgroundColor="transparent"
        >
          <div className={styles.activeIndicator}></div>
          <Text>Active</Text>
          <Icon as={FaChevronDown} ml="0.2rem" />
        </Button>
      </Flex>
      {menuItemsArr}
    </Flex>
  );
};

export default UserMenu;
