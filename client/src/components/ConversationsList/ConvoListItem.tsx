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
import { getRoomFromID } from "../../helperFunctions";
import { useNewMessages } from "../Home/Home";

interface ConvoListItemProps {
  room: any;
  bgColor: string;
  setActiveRoom: Function;
}

const ConvoListItem: React.FC<ConvoListItemProps> = ({
  room,
  bgColor,
  setActiveRoom,
}) => {
  const { setPanelShowing } = usePanelShowing();

  const linkBaseClass = styles.linkComponent;
  const linkActiveClass = styles.linkComponentActive;

  const mostRecentMsg = room.messages[room.messages.length - 1].text;

  const handleClick = () => {
    setPanelShowing("default");
    setActiveRoom(room);
  };

  return (
    <>
      <NavLink
        to={`${room.id}`}
        className={({ isActive }) =>
          isActive ? linkActiveClass : linkBaseClass
        }
        // onClick={() => setPanelShowing("default")}
        onClick={() => handleClick()}
      >
        <Button
          bgColor="unset"
          height="auto"
          borderRadius="0px"
          className={styles.convoListItem}
          role="group"
          width="100%"
        >
          <Avatar size="md" mr="10px" />
          <Flex className={styles.listItemTextContainer}>
            <Text className={styles.liHeader}>{room["name"]}</Text>
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
              {mostRecentMsg}
            </Text>
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
