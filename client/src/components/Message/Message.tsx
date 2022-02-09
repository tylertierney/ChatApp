import { message } from "../../models/message";
import {
  Flex,
  Divider,
  Text,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./Message.module.css";
import { useAuth } from "../../context/authContext";

interface MessageProps {
  // room: any;
  message: any;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { uid, date, text, displayName } = message;
  const { enrichedUserData } = useAuth();

  // const parsedDate = date.toDate().toLocaleTimeString([], {
  //   hour: "numeric",
  //   minute: "2-digit",
  // });
  const parsedDate = "11/11/2022";

  let incoming = true;

  if (uid === enrichedUserData.uid) {
    incoming = false;
  }
  console.log(typeof new Date());

  const avatarBox = (
    <Flex className={styles.avatarContainer}>
      <Avatar
        size="sm"
        className={styles.avatar}
        name={displayName}
        iconLabel={uid + " avatar"}
      />
    </Flex>
  );

  const textBox = (
    <Flex
      align={incoming ? "flex-start" : "flex-end"}
      className={styles.textContainer}
    >
      <Text className={styles.nameAndDate}>
        <Text className={styles.userName} as="span">
          {displayName}
        </Text>
        <Text className={styles.date} as="span" fontWeight="medium">
          {parsedDate}
        </Text>
      </Text>
      <Text textAlign={incoming ? "left" : "right"} className={styles.msgText}>
        {text}
      </Text>
    </Flex>
  );

  return (
    <Flex
      _hover={{
        backgroundColor: useColorModeValue(
          "brand.hovergraylight",
          "brand.hovergraydark"
        ),
      }}
      onClick={() => console.log(message)}
      className={styles.msgContainer}
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
