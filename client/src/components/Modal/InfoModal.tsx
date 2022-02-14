import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalOverlay,
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
import { createNewRoom } from "../../utilities/database";
import NewRoomTemplate from "./NewRoomTemplate";
import CustomizeProfileTemplate from "./CustomizeProfileTemplate";

interface InfoModalProps {
  onOpen: any;
  isOpen: any;
  onClose: any;
  homeRef: RefObject<HTMLDivElement>;
  targetUser?: any;
  type: string;
  setIsSearching?: Function;
}

const InfoModal: React.FC<InfoModalProps> = ({
  onOpen,
  isOpen,
  onClose,
  homeRef,
  targetUser,
  type,
  setIsSearching,
}) => {
  const inputBgColor = useColorModeValue(
    "var(--backgroundWhite)",
    "var(--independenceBlue)"
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalProps={{ containerRef: homeRef }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent backgroundColor={inputBgColor}>
          {type === "Create Group" ? (
            setIsSearching && (
              <NewRoomTemplate
                targetUser={targetUser}
                onClose={onClose}
                inputBgColor={inputBgColor}
                setIsSearching={setIsSearching}
              />
            )
          ) : (
            <CustomizeProfileTemplate
              onClose={onClose}
              inputBgColor={inputBgColor}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
