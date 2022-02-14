import {
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  useClipboard,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/authContext";
import styles from "./UserMenu.module.css";
import { MdContentCopy } from "react-icons/md";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserMenuItem from "./UserMenuItem";
import { useToast } from "../../context/Toast/Toast";
import { RefObject, useEffect, useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { usePanelShowing } from "../../App";
import InfoModal from "../Modal/InfoModal";

interface UserMenuProps {
  homeRef: RefObject<HTMLDivElement>;
}
const UserMenu: React.FC<UserMenuProps> = ({ homeRef }) => {
  const { currentUser, logout, enrichedUserData } = useAuth();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [uid, setUid] = useState("");
  const { onCopy } = useClipboard(uid);

  useEffect(() => {
    if (enrichedUserData && enrichedUserData["uid"]) {
      setUid(enrichedUserData["uid"]);
    }
  }, [enrichedUserData]);
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  const [activeStatus, setActiveStatus] = useState(true);

  const { addToast } = useToast();

  if (!enrichedUserData) return null;

  if (!currentUser) return null;

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

  const openModal = () => {
    onOpen();
  };

  return (
    <>
      <Flex className={styles.container}>
        <Flex className={styles.userInfo} gap="3px">
          <Flex position="relative" mb="1rem">
            <UserAvatar
              size="2xl"
              enrichedUserData={enrichedUserData}
              showStatus={false}
              src={enrichedUserData["photoURL"] || ""}
            />
            <IconButton
              className={styles.editProfileBtn}
              aria-label="Edit Profile"
              variant="unstyled"
              onClick={() => openModal()}
              borderRadius="50%"
              fontSize="1.8rem"
              position="absolute"
              bgColor="var(--independenceBlue)"
            >
              <Icon as={AiOutlineEdit} color="brand.text.light" />
            </IconButton>
          </Flex>
          <Flex align="center" justify="center" w="100%">
            <Text
              mb="0.3rem"
              fontWeight="semibold"
              fontSize="1.5rem"
              overflow="hidden"
              overflowWrap="normal"
              textOverflow="ellipsis"
              textAlign="center"
            >
              {enrichedUserData["displayName"]}
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <UserMenuItem
          textColor={textColor}
          // clickHandler={() => setActiveStatus(!activeStatus)}
          clickHandler={() => console.log(enrichedUserData)}
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
        <InfoModal
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          homeRef={homeRef}
          targetUser={null}
          type="Customize Profile"
        />
      </Flex>
    </>
  );
};

export default UserMenu;
