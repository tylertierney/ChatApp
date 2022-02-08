import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { useAuth } from "../../context/authContext";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { useUserData } from "../../context/userDataContext";

interface ConvoListProps {
  rooms: any;
}

const ConversationsList: React.FC<ConvoListProps> = ({ rooms }) => {
  // const { userData, userFromDB } = useUserData();
  // const { favoritePerson } = useAuth();

  const listBgColor = useColorModeValue("white", "brand.darkgray");
  const convosListBgColor = useColorModeValue("#f9f2f9", "#434354");

  let roomsArr = null;
  // console.log(userData);

  // if (userData) {
  //   if (userData.rooms) {
  //     roomsArr = userData.rooms.map((room: any, idx: number) => {
  //       return (
  //         <button key={idx} className={styles.roomMenuItem}>
  //           <Flex className={styles.listItemTextContainer}>
  //             <Text className={styles.roomName}>{room["name"]}</Text>
  //           </Flex>
  //           <Icon
  //             as={MdArrowForwardIos}
  //             className={styles.listItemArrow}
  //             color="white"
  //           />
  //         </button>
  //       );
  //     });
  //   }
  // }

  if (!rooms) return null;

  if (rooms[0] === {}) return null;

  console.log(rooms);

  return (
    <Flex
      className={styles.convosContainer}
      bgColor={convosListBgColor}
      zIndex={1}
    >
      <Text className={styles.groupTitle}>Rooms</Text>
      <button onClick={() => console.log(rooms)}>btn</button>
      <Flex className={styles.roomsContainer} bgColor={listBgColor}>
        {/* {rooms.map((room: any, idx: any) => (
          <p key={idx}>a</p>
        ))} */}
        {JSON.stringify(rooms[0])}
      </Flex>
    </Flex>
  );
};

export default ConversationsList;
