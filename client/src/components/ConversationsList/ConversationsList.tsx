import { Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import styles from "./ConversationsList.module.css";
import { useAuth } from "../../context/authContext";

import ConvoListItem from "./ConvoListItem";
import { useUserData } from "../../context/userDataContext";
import { useEffect, useState } from "react";

interface ConvoListProps {}

const ConversationsList: React.FC<ConvoListProps> = () => {
  const convosListBgColor = useColorModeValue("#d9dceb", "#434354");

  const { userFromDB } = useAuth();

  let arr: any = [];
  if (userFromDB) {
    if (userFromDB.rooms) {
      arr = userFromDB["rooms"];
    }
  }

  // NEW STUFF
  // const { userData, enrichRooms } = useUserData();

  // let rooms: any = [];

  // if (userData) {
  //   if (userData.rooms) {
  //     rooms = userData.rooms;
  //   }
  // }

  // END NEW STUFF

  return (
    <Flex
      className={styles.convosContainer}
      bgColor={convosListBgColor}
      zIndex={1}
    >
      <Text className={styles.groupTitle}>Rooms</Text>
      <Divider />
      <Flex className={styles.roomsContainer}>
        {arr.map((rm: any, idx: any) => (
          <ConvoListItem key={idx} room={rm} bgColor={convosListBgColor} />
        ))}
        {/* {rooms.map((rm: any, idx: number) => (
          <p key={idx}>{rm.name}</p>
        ))} */}
        {/* {userData.rooms.map((rm: any, idx: number)=><p key={idx}>{JSON.stringify(rm)}</p>)} */}
      </Flex>
    </Flex>
  );
};

export default ConversationsList;
