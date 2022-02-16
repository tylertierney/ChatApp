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
import { NavLink } from "react-router-dom";
import { usePanelShowing } from "../../App";
import { useAuth } from "../../context/authContext";

interface ConvoListItemProps {
  room: any;
  setActiveRoom: Function;
  newMessages: any[];
}

const ConvoListItem: React.FC<ConvoListItemProps> = ({
  room,
  setActiveRoom,
  newMessages,
}) => {
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

  const { enrichedUserData } = useAuth();
  const { setPanelShowing } = usePanelShowing();

  let mostRecentMsg: string | null = null;

  if (room.messages.length > 0) {
    mostRecentMsg = room.messages[room.messages.length - 1].text;
  }

  if (newMessages.length > 0) {
    mostRecentMsg = newMessages[newMessages.length - 1].text;
  }

  let targetUser = room.members.filter(
    (member: any) => member.uid !== enrichedUserData["uid"]
  );
  targetUser = targetUser[0];

  const handleClick = (room: any) => {
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
        onClick={() => handleClick(room)}
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
          <Avatar
            size="md"
            mr="10px"
            iconLabel={targetUser.nameInGroup}
            name={targetUser.nameInGroup}
            src={targetUser.photoURL}
            boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
            bgColor={targetUser.photoURL && "white"}
          />
          <Flex className={styles.listItemTextContainer}>
            <Text className={styles.liHeader}>{targetUser.nameInGroup}</Text>
            {mostRecentMsg && (
              <Text as="span" className={styles.convoPreviewText}>
                {mostRecentMsg}
              </Text>
            )}
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
