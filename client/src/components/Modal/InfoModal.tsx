import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";

interface InfoModalProps {
  onOpen: any;
  isOpen: any;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ onOpen, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            hgfdhgfdhgfdhgdhgdfhgfdhgfdhgfdhgfdhgfdhgfdghfdhgfdhgfdhgfdhgfdhgfd
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
