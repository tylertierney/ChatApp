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
import { Link, NavLink } from "react-router-dom";
import { usePanelShowing } from "../../App";
import { getRoomFromID, searchForUser } from "../../helperFunctions";
import { useNewMessages } from "../Home/Home";

interface ConvoListItemProps {
  room: any;
  setActiveRoom: Function;
}

const ConvoListItem: React.FC<ConvoListItemProps> = ({
  room,
  setActiveRoom,
}) => {
  const { setPanelShowing } = usePanelShowing();
  const bgColor = useColorModeValue(
    "rgba(242, 246, 247, 1)",
    "rgba(67, 67, 84, 1)"
  );
  const transp = useColorModeValue(
    "rgba(242, 246, 247, 0)",
    "rgba(67, 67, 84, 0)"
  );

  const linkBaseClass = styles.linkComponent;
  const linkActiveClass = styles.linkComponentActive;

  const mostRecentMsg = room.messages[room.messages.length - 1].text;

  const handleClick = () => {
    console.log(room);
    setPanelShowing("default");
    setActiveRoom(room);
  };

  useEffect(() => {
    for (let i = 0; i < room.members.length; i++) {
      const member = room.members[i];

      searchForUser(member.uid)
        .then((res) => {
          room.members[i].photoURL = res.photoURL;
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <>
      <NavLink
        to={`${room.id}`}
        className={({ isActive }) =>
          isActive ? linkActiveClass : linkBaseClass
        }
        onClick={() => handleClick()}
      >
        <Button
          bgColor="unset"
          height="auto"
          borderRadius="0px"
          className={styles.convoListItem}
          role="group"
          width="100%"
          padding="0.7rem 0 0.7rem 1rem"
        >
          <Avatar size="md" mr="10px" iconLabel={room.name} name={room.name} />
          <Flex className={styles.listItemTextContainer}>
            <Text className={styles.liHeader}>{room["name"]}</Text>
            <Text as="span" className={styles.convoPreviewText}>
              {mostRecentMsg}
            </Text>
            <Flex
              display="block"
              height="100%"
              transition="0.2s ease-in-out"
              width="3rem"
              top="0"
              right="0"
              position="absolute"
              opacity="1"
              backgroundColor="transparent"
              background={`linear-gradient(to right, ${transp} 0%, ${bgColor} 100%)`}
              _groupHover={{
                opacity: "0",
                right: "-100px",
              }}
            ></Flex>
          </Flex>
          <Icon
            as={MdArrowForwardIos}
            className={styles.listItemArrow}
            color="white"
          />
        </Button>
        <Divider />
      </NavLink>
    </>
  );
};

export default ConvoListItem;
