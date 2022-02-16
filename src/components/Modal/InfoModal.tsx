import {
  Modal,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { RefObject } from "react";
import NewRoomTemplate from "./NewRoomTemplate";
import CustomizeProfileTemplate from "./CustomizeProfileTemplate";
import { useAuth } from "../../context/authContext";
import EditRoomTemplate from "./EditRoomTemplate";

interface InfoModalProps {
  onOpen: any;
  isOpen: any;
  onClose: any;
  homeRef: RefObject<HTMLDivElement>;
  targetUser?: any;
  currentUser?: any;
  type: string;
  setIsSearching?: Function;
  activeRoom?: any;
}

const InfoModal: React.FC<InfoModalProps> = ({
  onOpen,
  isOpen,
  onClose,
  homeRef,
  targetUser,
  currentUser,
  type,
  setIsSearching,
  activeRoom,
}) => {
  const inputBgColor = useColorModeValue(
    "var(--backgroundWhite)",
    "var(--independenceBlue)"
  );

  const { enrichedUserData } = useAuth();

  const getTemplateFromType = (type: string) => {
    if (type === "Create Group" && setIsSearching) {
      return (
        <NewRoomTemplate
          targetUser={targetUser}
          onClose={onClose}
          inputBgColor={inputBgColor}
          setIsSearching={setIsSearching}
        />
      );
    }
    if (type === "Customize Profile") {
      return (
        <CustomizeProfileTemplate
          onClose={onClose}
          inputBgColor={inputBgColor}
        />
      );
    }
    if (type === "Edit Room") {
      return (
        <EditRoomTemplate
          onClose={onClose}
          inputBgColor={inputBgColor}
          targetUser={targetUser}
          currentUser={currentUser}
          roomId={activeRoom["id"]}
        />
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalProps={{ containerRef: homeRef }}
        size="sm"
        autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={inputBgColor}>
          {getTemplateFromType(type)}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
