import {
  Flex,
  Text,
  ModalBody,
  FormControl,
  useColorModeValue,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { BsGearFill } from "react-icons/bs";
import { useAuth } from "../../context/authContext";
import ModalHeader from "./ModalHeader";
import { createNewRoom, updateUserProfile } from "../../utilities/database";
import { useState } from "react";
import StyledInput from "../StyledInput/StyledInput";
import SubmitBtn from "../Login/SubmitBtn";

interface CustomizeProfileTemplateProps {
  onClose: any;
  inputBgColor: string;
}

const CustomizeProfileTemplate: React.FC<CustomizeProfileTemplateProps> = ({
  onClose,
  inputBgColor,
}) => {
  const { enrichedUserData } = useAuth();
  const initialUsername = enrichedUserData["displayName"];

  const [username, setUsername] = useState(initialUsername || "");
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    if (!enrichedUserData) return;
    if (!enrichedUserData["uid"]) return;
    if (username === enrichedUserData["displayName"]) return;
    const uid = enrichedUserData["uid"];
    updateUserProfile(uid, username);
    setPending(false);
    onClose();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <ModalHeader />
      <ModalBody>
        <Flex direction="column" align="center">
          <UserAvatar
            enrichedUserData={enrichedUserData}
            showStatus={false}
            size="2xl"
          />
          <Text
            mb="0.3rem"
            fontWeight="semibold"
            fontSize="1.6rem"
            textAlign="center"
            minH="2.4rem"
          >
            {username}
          </Text>
        </Flex>
        <Text mb="1rem" fontSize="0.9rem">
          This is your public username. It will appear in search results when a
          user looks you up by your id. It will also be used in chats if you
          don't choose a unique username within the group.
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

export default CustomizeProfileTemplate;
