import { Flex, Text, Icon, Avatar, useColorModeValue } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

interface ConvoListItemProps {
  room: any;
}

const ConvoListItem: React.FC<ConvoListItemProps> = ({ room }) => {
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
    <button
      className={styles.convoListItem}
      onClick={() => console.log(roomInfo)}
    >
      <Avatar size="sm" mr="10px" />
      <Flex className={styles.listItemTextContainer}>
        <Text className={styles.liHeader}>{roomInfo["name"]}</Text>
        <Text
          as="span"
          className={styles.convoPreview}
          _after={{
            content: `""`,
            background:
              "linear-gradient(90deg,rgba(255, 255, 255, 0) 0% #23232a 100%)",
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
    </button>
  );
};

export default ConvoListItem;
