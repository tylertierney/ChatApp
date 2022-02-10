import { Flex, Input, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./InputGroup.module.css";
import socket from "../../socket";
import { useAuth } from "../../context/authContext";

interface InputGroupProps {
  activeRoom: any;
  panelShowing: string;
  panelWidth: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  activeRoom,
  panelShowing,
  panelWidth,
}) => {
  const { currentUser } = useAuth();
  const [messageText, setMessageText] = useState("");
  const bgColor = useColorModeValue("brand.softwhite", "brand.darkgray");

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText) return;
    const msgObj = {
      uid: currentUser["uid"],
      date: new Date(),
      text: messageText,
    };

    socket.emit("message", msgObj, activeRoom["id"]);
    setMessageText("");
  };
  console.log(activeRoom["id"]);

  return (
    <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
      <Flex bgColor={bgColor} width="100%">
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
          background="transparent"
          inputMode="search"
        />

        <Button
          className={styles.submitBtn}
          variant="unstyled"
          _focus={{ outline: "none" }}
          borderRadius={0}
          width="88px"
          height="100%"
          bgColor={messageText ? "brand.primary.1000" : "transparent"}
          color={messageText ? "white" : "brand.text.dark"}
          cursor={messageText ? "pointer" : "default"}
          type="submit"
        >
          <Icon as={RiSendPlaneFill} color="inherit" fontSize="2rem" />
        </Button>
      </Flex>
    </form>
  );
};

export default InputGroup;
