import {
  Flex,
  Text,
  ModalBody,
  FormControl,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useAuth } from "../../context/authContext";
import ModalHeader from "./ModalHeader";
import { createNewRoom, updateNameInRoom } from "../../utilities/database";
import { useState } from "react";
import StyledInput from "../StyledInput/StyledInput";
import SubmitBtn from "../Login/SubmitBtn";

interface NewRoomTemplateProps {
  targetUser: any;
  onClose: any;
  inputBgColor: string;
  currentUser: any;
  roomId: string;
}

const EditRoomTemplate: React.FC<NewRoomTemplateProps> = ({
  targetUser,
  onClose,
  inputBgColor,
  currentUser,
  roomId,
}) => {
  const { enrichedUserData } = useAuth();
  const initialUsername = currentUser.nameInGroup;
  const [username, setUsername] = useState(initialUsername);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    if (!enrichedUserData) return;
    if (!enrichedUserData["uid"]) return;
    if (username === "") {
      setError("Input a username to confirm your changes");
      setPending(false);
      return;
    }

    await updateNameInRoom(currentUser.uid, username, roomId);

    setPending(false);
    onClose();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <ModalHeader />
      <ModalBody>
        <Text mb="0.5rem">You are chatting with:</Text>
        <Flex direction="column" align="center">
          <UserAvatar
            enrichedUserData={targetUser}
            showStatus={false}
            size="2xl"
            src={targetUser["photoURL"]}
          />
          <Text
            mb="0.3rem"
            fontWeight="semibold"
            fontSize="1.6rem"
            textAlign="center"
          >
            {targetUser.nameInGroup}
          </Text>
        </Flex>
        <Text mb="1rem">
          Choose your username. It will only be visible to other members of this
          chat.
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
  );
};

export default EditRoomTemplate;
