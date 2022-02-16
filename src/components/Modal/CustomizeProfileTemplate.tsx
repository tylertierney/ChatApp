import {
  Flex,
  Text,
  ModalBody,
  FormControl,
  ModalFooter,
  Button,
  Icon,
} from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useAuth } from "../../context/authContext";
import ModalHeader from "./ModalHeader";
import { updateUserProfile } from "../../utilities/database";
import React, { useState } from "react";
import StyledInput from "../StyledInput/StyledInput";
import SubmitBtn from "../Login/SubmitBtn";
import styles from "./CustomizeProfileTemplate.module.css";
import { AiFillCamera } from "react-icons/ai";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "../../context/Toast/Toast";

interface CustomizeProfileTemplateProps {
  onClose: any;
  inputBgColor: string;
}

const CustomizeProfileTemplate: React.FC<CustomizeProfileTemplateProps> = ({
  onClose,
  inputBgColor,
}) => {
  const { addToast } = useToast();
  const { enrichedUserData, isNewUser, setIsNewUser } = useAuth();
  const initialUsername = enrichedUserData["displayName"];
  const initialProfilePicture = enrichedUserData["photoURL"];

  const [username, setUsername] = useState(initialUsername || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureURL, setProfilePictureURL] = useState(
    initialProfilePicture || ""
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const closeModal = () => {
      setPending(false);
      onClose();
      setIsNewUser(false);
    };

    e.preventDefault();
    setPending(true);
    if (!enrichedUserData) {
      closeModal();
      return;
    }
    if (!enrichedUserData["uid"]) {
      closeModal();
      return;
    }

    const uid = enrichedUserData["uid"];

    console.log(enrichedUserData);

    if (username !== enrichedUserData["displayName"]) {
      updateUserProfile(uid, { displayName: username });
      addToast({ type: "info", text: "Username updated!" });
    }

    if (!profilePicture) {
      closeModal();
      return;
    }
    const storageRef = ref(storage, uid);
    uploadBytes(storageRef, profilePicture)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            updateUserProfile(uid, { photoURL: url });
            addToast({ type: "info", text: "Profile picture updated!" });
            closeModal();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleProfilePicUpload = (files: FileList | null) => {
    if (!files) return;
    if (files.length === 0) return;
    const file = files[0];
    if (file.size > 2097152) {
      setError("Image size must be less than 2mb");
    } else {
      setError("");
    }
    setProfilePictureURL(URL.createObjectURL(file));
    setProfilePicture(file);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <ModalHeader />
      <ModalBody>
        <Flex direction="column" align="center">
          <Flex position="relative" mb="1rem">
            <UserAvatar
              enrichedUserData={enrichedUserData}
              showStatus={false}
              size="2xl"
              src={profilePictureURL}
            />
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/png, image/jpeg, image/jpg, image/svg"
              style={{ display: "none" }}
              onChange={(e) => handleProfilePicUpload(e.target.files)}
            />
            <label htmlFor="profilePicture">
              <label
                className={styles.cameraIcon}
                htmlFor="profilePicture"
                aria-label="Edit Profile Picture"
              >
                <Icon as={AiFillCamera} color="brand.text.light" />
              </label>
            </label>
          </Flex>

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
        <Text mb="0.5rem" fontSize="0.9rem">
          This is your public username. It will appear in search results when a
          user looks you up using your id.
        </Text>
        <Text mb="1rem" fontSize="0.9rem">
          It will also be used in chats if you don't choose a unique username
          within the group.
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
        <Text mb="1rem" fontSize="0.9rem">
          You can change your username and profile picture any time.
        </Text>
        <Text mb="1rem" fontSize="0.9rem" textAlign="center" color="orange">
          {error}
        </Text>
      </ModalBody>

      <ModalFooter>
        {!isNewUser && (
          <Button variant="ghost" onClick={onClose} mb="1rem" mr="1rem">
            Cancel
          </Button>
        )}
        <Flex w="100px" h="100%" align="center">
          <SubmitBtn text="Confirm" pending={pending} error={error} />
        </Flex>
      </ModalFooter>
    </form>
  );
};

export default CustomizeProfileTemplate;
