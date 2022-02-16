import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import InfoModal from "../Modal/InfoModal";
import { RefObject } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../context/authContext";

interface RoomToolbarProps {
  showRoomToolbar: boolean;
  homeRef: RefObject<HTMLDivElement>;
  activeRoom: any;
}
const RoomToolbar: React.FC<RoomToolbarProps> = ({
  showRoomToolbar,
  homeRef,
  activeRoom,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { enrichedUserData } = useAuth();
  const roomSettingsBgColor = useColorModeValue("#f1f3f6", "#50505b");
  const roomSettingsTextColor = useColorModeValue(
    "brand.text.dark",
    "brand.text.light"
  );

  if (!activeRoom || !activeRoom.members) return null;

  const targetUser = activeRoom.members.find(
    (member: any) => member.uid !== enrichedUserData.uid
  );
  const currentUser = activeRoom.members.find(
    (member: any) => member.uid === enrichedUserData.uid
  );

  return (
    <>
      <Flex
        w="100%"
        backgroundColor={roomSettingsBgColor}
        justify="space-between"
        paddingX="1rem"
        position="sticky"
        h="40px"
        top={showRoomToolbar ? "0" : "-50px"}
        boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.4)"
        zIndex={2}
        transition="0.3s ease-in-out"
        align="center"
      >
        <Text fontWeight="semibold" fontSize="1.3rem">
          {targetUser.nameInGroup}
        </Text>
        <Button
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="3px"
          fontSize="1rem"
          onClick={onOpen}
          height="32px"
          width="60px"
          backgroundColor="transparent"
          _focus={{
            backgroundColor: "transparent",
          }}
          _hover={{
            opacity: "0.7",
          }}
          userSelect="none"
        >
          <Icon
            color={roomSettingsTextColor}
            as={HiDotsHorizontal}
            fontSize="2rem"
            mt="0px"
          ></Icon>
        </Button>
      </Flex>
      <InfoModal
        homeRef={homeRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        type="Edit Room"
        targetUser={targetUser}
        currentUser={currentUser}
        activeRoom={activeRoom}
      />
    </>
  );
};

export default RoomToolbar;
