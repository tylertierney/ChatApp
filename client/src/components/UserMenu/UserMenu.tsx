import {
  Avatar,
  Button,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  useClipboard,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import styles from "./UserMenu.module.css";
import { MdContentCopy } from "react-icons/md";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FaChevronDown } from "react-icons/fa";
import UserMenuItem from "./UserMenuItem";
import { useToast } from "../../context/Toast/Toast";
import { useEffect, useState } from "react";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const { currentUser, logout, enrichedUserData } = useAuth();
  const [uid, setUid] = useState("");
  const { onCopy } = useClipboard(uid);

  useEffect(() => {
    if (enrichedUserData && enrichedUserData["uid"]) {
      setUid(enrichedUserData["uid"]);
    }
  }, [enrichedUserData]);

  const btnColor = useColorModeValue("brand.white", "brand.gray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  const hoverColor = useColorModeValue("brand.hovergraylight", "#595969");
  const { addToast } = useToast();

  if (!enrichedUserData) return null;

  if (currentUser == null) return null;

  const clickHandlerForToast = () => {
    if (uid) {
      onCopy();
    }

    addToast({ type: "info", text: "User ID Copied!" });
  };

  return (
    <>
      <Flex className={styles.container}>
        <Flex className={styles.userInfo} gap="3px">
          <UserAvatar
            size="xl"
            enrichedUserData={enrichedUserData}
            showStatus={false}
          />
          <Text mb="0.3rem" fontWeight="semibold">
            {enrichedUserData["displayName"] ||
              enrichedUserData["email"] ||
              "Anonymous"}
          </Text>
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
        <Divider />
        <UserMenuItem textColor={textColor} clickHandler={clickHandlerForToast}>
          <>
            <Flex direction="column" maxW="160px">
              <Text textAlign="left" fontSize="1.25rem">
                Copy User ID
              </Text>
              <Text
                fontSize="0.9rem"
                fontWeight="light"
                overflow="hidden"
                textOverflow="ellipsis"
                opacity="0.7"
              >
                {enrichedUserData["uid"]}
              </Text>
            </Flex>
            <Icon
              className={styles.copyIcon}
              as={MdContentCopy}
              aria-label="Copy User ID"
              fontSize="1.2rem"
            />
          </>
        </UserMenuItem>
        <UserMenuItem textColor={textColor} clickHandler={logout}>
          <>
            <Text
              as="span"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="160px"
              fontSize="1.25rem"
            >
              Sign Out
            </Text>
            <AiOutlineLogout fontSize="1.5rem" />
          </>
        </UserMenuItem>
      </Flex>
    </>
  );
};

export default UserMenu;
