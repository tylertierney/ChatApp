import {
  Avatar,
  Button,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  useClipboard,
  IconButton,
} from "@chakra-ui/react";
import { AiFillCamera, AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import styles from "./UserMenu.module.css";
import { MdContentCopy } from "react-icons/md";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FaChevronDown } from "react-icons/fa";
import UserMenuItem from "./UserMenuItem";
import { useToast } from "../../context/Toast/Toast";
import { useEffect, useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const { currentUser, logout, enrichedUserData } = useAuth();
  const [uid, setUid] = useState("");
  const { onCopy } = useClipboard(uid);
  const editIconColor = useColorModeValue(
    "brand.text.dark",
    "brand.text.light"
  );

  useEffect(() => {
    if (enrichedUserData && enrichedUserData["uid"]) {
      setUid(enrichedUserData["uid"]);
    }
  }, [enrichedUserData]);

  // const btnColor = useColorModeValue("brand.white", "brand.gray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  // const hoverColor = useColorModeValue("brand.hovergraylight", "#595969");
  const [activeStatus, setActiveStatus] = useState(true);

  const { addToast } = useToast();

  if (!enrichedUserData) return null;

  if (currentUser == null) return null;

  const clickHandlerForToast = () => {
    if (uid) {
      onCopy();
    }

    addToast({ type: "info", text: "User ID Copied!" });
  };

  let status = "Active";
  if (!activeStatus) {
    status = "Offline";
  }

  let toggleSwitchTrackColor = "lightgreen";

  if (!activeStatus) {
    toggleSwitchTrackColor = "orange";
  }

  return (
    <>
      <Flex className={styles.container}>
        <Flex className={styles.userInfo} gap="3px">
          <Flex position="relative">
            <UserAvatar
              size="2xl"
              enrichedUserData={enrichedUserData}
              showStatus={false}
            />
            <IconButton
              fontSize="1.8rem"
              aria-label="Edit Profile Picture"
              variant="unstyled"
              position="absolute"
              bottom="0"
              right="0"
              transform="translate(0, 25%)"
              opacity="1"
              borderRadius="50%"
              backgroundColor="var(--independenceBlue)"
              border="2px solid"
              borderColor="rgb(255, 255, 255, 0.7)"
            >
              <Icon as={AiFillCamera} color="brand.text.light" />
            </IconButton>
          </Flex>
          <Flex align="center" justify="center" w="100%">
            <Text
              mb="0.3rem"
              fontWeight="semibold"
              fontSize="1.6rem"
              // maxW="80%"
              overflow="hidden"
              overflowWrap="normal"
              textOverflow="ellipsis"
              textAlign="center"
            >
              {enrichedUserData["displayName"] ||
                enrichedUserData["email"] ||
                "Anonymous"}
            </Text>
            <Button
              color={editIconColor}
              position="absolute"
              right="10px"
              variant="unstyled"
              // ml="auto"
            >
              <Icon as={AiOutlineEdit} fontSize="1.6rem" />
            </Button>
          </Flex>
        </Flex>
        <Divider />
        <UserMenuItem
          textColor={textColor}
          clickHandler={() => setActiveStatus(!activeStatus)}
        >
          <>
            <Text as="span" fontSize="1.25rem">
              Status:&nbsp;
              <Text as="span" fontWeight="light">
                {status}
              </Text>
            </Text>

            <ToggleSwitch
              trackColor={toggleSwitchTrackColor}
              active={activeStatus}
            />
          </>
        </UserMenuItem>
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
              fontSize="1.4rem"
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
