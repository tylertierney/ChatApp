import {
  Flex,
  Text,
  Icon,
  Avatar,
  useColorModeValue,
  Divider,
  Button,
} from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

interface ConvoListItemProps {
  room: any;
  bgColor: string;
}

const ConvoListItem: React.FC<ConvoListItemProps> = ({ room, bgColor }) => {
  const [roomInfo, setRoomInfo] = useState<any>({});
  const liBgColor = useColorModeValue("white", "#23232a");

  useEffect(() => {
    const getRoomFromID = async (roomID: string) => {
      const docRef = doc(db, "rooms", roomID);
      const docSnap = await getDoc(docRef);
      const roomData = docSnap.data();

      return roomData;
    };

    getRoomFromID(room)
      .then((data) => {
        console.log(data);
        setRoomInfo(() => data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (roomInfo === {} || roomInfo == undefined) return null;

  return (
    <Link to={`${room}`} className={styles.linkComponent}>
      <Button
        bgColor="unset"
        height="auto"
        borderRadius="0px"
        className={styles.convoListItem}
        onClick={() => console.log(roomInfo)}
        role="group"
        width="100%"
      >
        <Avatar size="md" mr="10px" />
        <Flex className={styles.listItemTextContainer}>
          <Text className={styles.liHeader}>{roomInfo["name"]}</Text>
          <Text
            as="span"
            className={styles.convoPreviewText}
            transition="0.3s ease-in-out"
            _after={{
              content: `""`,
              position: "absolute",
              height: "100%",
              width: "2.4rem",
              right: 0,
              top: 0,
              background: `linear-gradient(90deg, transparent 0%, ${bgColor} 100%)`,
              transition: "inherit",
              opacity: 1,
              _groupHover: {
                opacity: 0,
                background: `linear-gradient(90deg, transparent 0%, transparent 100%)`,
              },
            }}
          >
            Hey so for lunch I was thinking we could go to
          </Text>
        </Flex>
        <Icon
          as={MdArrowForwardIos}
          className={styles.listItemArrow}
          color="white"
        />
      </Button>
      <Divider />
    </Link>
  );
};

export default ConvoListItem;
