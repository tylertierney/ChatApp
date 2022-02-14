import { Flex, Text, Avatar, useColorModeValue } from "@chakra-ui/react";
import styles from "./Message.module.css";
import { useAuth } from "../../context/authContext";
import UserAvatar from "../UserAvatar/UserAvatar";

interface MessageProps {
  message: any;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { uid, formattedDate, text, displayName, photoURL, isThreaded } =
    message;
  const { enrichedUserData } = useAuth();
  const msgClass = useColorModeValue(styles.msgLight, styles.msgDark);

  let incoming = true;
  if (uid === enrichedUserData.uid) {
    incoming = false;
  }

  const avatarBox = (
    <Flex
      className={styles.avatarContainer}
      visibility={isThreaded ? "hidden" : "visible"}
    >
      <Avatar
        size="sm"
        className={styles.avatar}
        src={photoURL}
        name={displayName}
        iconLabel={uid + " avatar"}
        bgColor={photoURL ? "white" : ""}
        boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
      />
    </Flex>
  );

  const textBox = (
    <Flex
      align={incoming ? "flex-start" : "flex-end"}
      className={styles.textContainer}
    >
      <Flex
        className={styles.nameAndDate}
        justify={incoming ? "flex-start" : "flex-end"}
        flexFlow={incoming ? "initial" : "row-reverse"}
        display={isThreaded ? "none" : "flex"}
      >
        <Text
          className={styles.userName}
          as="span"
          textAlign={incoming ? "left" : "right"}
        >
          {displayName || "Anonymous"}
        </Text>
        <Text className={styles.date} as="span" fontWeight="medium">
          {formattedDate}
        </Text>
      </Flex>
      <Text textAlign={incoming ? "left" : "right"} className={styles.msgText}>
        {text}
      </Text>
    </Flex>
  );

  return (
    <Flex
      className={`${styles.msgContainer} ${msgClass}`}
      pl={incoming ? "0" : "1rem"}
      pr={incoming ? "1rem" : "0"}
      pt={isThreaded ? "0" : ""}
      onClick={() => console.log(message)}
    >
      {incoming ? (
        <>
          {avatarBox}
          {textBox}
        </>
      ) : (
        <>
          {textBox}
          {avatarBox}
        </>
      )}
    </Flex>
  );
};

export default Message;
