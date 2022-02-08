import { Flex, Text, Icon } from "@chakra-ui/react";
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
    <button className={styles.roomMenuItem}>
      <Flex className={styles.listItemTextContainer}>
        <Text className={styles.roomName}>{roomInfo["name"]}</Text>
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
