import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  Button,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Heading,
  Icon,
  Flex,
  useColorModeValue,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { RefObject, useState } from "react";
import { BsGearFill } from "react-icons/bs";
import StyledInput from "../StyledInput/StyledInput";
import SubmitBtn from "../Login/SubmitBtn";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useAuth } from "../../context/authContext";
import { addRoomToUsers, createNewRoom } from "../../helperFunctions";

interface InfoModalProps {
  onOpen: any;
  isOpen: any;
  onClose: any;
  homeRef: RefObject<HTMLDivElement>;
  targetUser: any;
}

const InfoModal: React.FC<InfoModalProps> = ({
  onOpen,
  isOpen,
  onClose,
  homeRef,
  targetUser,
}) => {
  const { enrichedUserData } = useAuth();
  const [username, setUsername] = useState("");
  const [pending, setPending] = useState(false);

  const inputBgColor = useColorModeValue(
    "var(--backgroundWhite)",
    "var(--independenceBlue)"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewRoom([targetUser, enrichedUserData]);
  };

  return (
    <>
      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalProps={{ containerRef: homeRef }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={inputBgColor}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Flex w="100%" align="center" p="0.4rem 1rem 0 1rem">
              <Flex align="center" opacity="0.8">
                <Heading mr="10px">Customize</Heading>
                <Icon as={BsGearFill} fontSize="1.8rem" />
              </Flex>
            </Flex>
            <ModalBody>
              <Text mb="0.5rem">You are starting a chat with:</Text>
              <Flex direction="column" align="center">
                <UserAvatar
                  enrichedUserData={targetUser}
                  showStatus={false}
                  size="2xl"
                />
                <Text
                  mb="0.3rem"
                  fontWeight="semibold"
                  fontSize="1.6rem"
                  textAlign="center"
                >
                  {targetUser["displayName"] ||
                    targetUser["email"] ||
                    "Anonymous"}
                </Text>
              </Flex>
              <Text mb="1rem">
                Choose your username. It will only be visible to other members
                of this chat.
              </Text>
              <FormControl isRequired>
                <StyledInput
                  autofillType="username"
                  name="username"
                  placeholder="Username"
                  inputValue={username}
                  setInputValue={setUsername}
                  pending={pending}
                  inputBgColor={inputBgColor}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose} mb="1rem" mr="1rem">
                Cancel
              </Button>
              <Flex w="100px" h="100%" align="center">
                <SubmitBtn text="Confirm" pending={pending} />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal> */}
      <p>hi</p>
    </>
  );
};

export default InfoModal;
