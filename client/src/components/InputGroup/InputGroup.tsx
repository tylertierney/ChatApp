import { Flex, Input, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./InputGroup.module.css";
import socket from "../../socket";

interface InputGroupProps {
  socket?: any;
}

const InputGroup: React.FC<InputGroupProps> = () => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = () => {
    if (messageText) {
      socket.emit("message", messageText);
      setMessageText("");
    }
  };

  return (
    <Flex
      boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.1)"
      borderTop="1px solid rgb(0, 0, 0, 0.1)"
    >
      <Flex
        bgColor={useColorModeValue("brand.softwhite", "brand.darkgray")}
        width="100%"
      >
        <Input
          borderRadius={0}
          border="none"
          type="text"
          aria-label="Message text"
          _focus={{ outline: "none" }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          paddingRight={0}
          height="50px"
          maxH="50px"
          overflow="hidden"
        />

        <Button
          className={styles.submitBtn}
          variant="unstyled"
          onClick={messageText ? () => handleSubmit() : () => null}
          _focus={{ outline: "none" }}
          borderRadius={0}
          width="60px"
          height="100%"
          bgColor={messageText ? "brand.primary.1000" : "transparent"}
          color={messageText ? "white" : "brand.text.dark"}
          cursor={messageText ? "pointer" : "default"}
        >
          <Icon as={RiSendPlaneFill} color="inherit" fontSize="1.3rem" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default InputGroup;
