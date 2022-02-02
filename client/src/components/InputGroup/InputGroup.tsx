import { Flex, Input, Button, Icon } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./InputGroup.module.css";

interface InputGroupProps {
  socket: any;
}

const InputGroup: React.FC<InputGroupProps> = ({ socket }) => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = () => {
    if (messageText) {
      socket.emit("message", messageText);
      setMessageText("");
    }
  };

  return (
    <Flex>
      <Input
        borderRadius={0}
        borderLeft="none"
        type="text"
        aria-label="Message text"
        bgColor="brand.darkgray"
        _focus={{ outline: "none" }}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button
        className={styles.submitBtn}
        variant="unstyled"
        onClick={messageText ? () => handleSubmit() : () => null}
        _focus={{ outline: "none" }}
        bgColor={messageText ? "brand.primary.1000" : "brand.darkgray"}
      >
        <Icon as={RiSendPlaneFill} color="inherit" fontSize="1.3rem" />
      </Button>
    </Flex>
  );
};

export default InputGroup;
