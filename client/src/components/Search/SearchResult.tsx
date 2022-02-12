import {
  Button,
  Avatar,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "../ConversationsList/ConversationsList.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { getRandomColor } from "../../helperFunctions";
import { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { useAuth } from "../../context/authContext";
import InfoModal from "../Modal/InfoModal";

interface SearchResultProps {
  result: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const { enrichedUserData } = useAuth();

  const bgColor = useColorModeValue(
    "rgba(242, 246, 247, 1)",
    "rgba(67, 67, 84, 1)"
  );
  const transp = useColorModeValue(
    "rgba(242, 246, 247, 0)",
    "rgba(67, 67, 84, 0)"
  );
  const borderColor = useColorModeValue("brand.hovergraydark", "white");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [isMoved, setIsMoved] = useState(false);

  const handleCreateNewRoom = (targetUser: any, currentUser: any) => {};

  const { onOpen, isOpen, onClose } = useDisclosure();

  const openModal = () => {
    onOpen();
  };

  return (
    <>
      <Button
        bgColor="unset"
        height="auto"
        borderRadius="0px"
        className={styles.convoListItem}
        role="group"
        width="100%"
        padding="0.7rem 0 0.7rem 1rem"
        onClick={() => setIsMoved(true)}
        transition="0.3s ease-in-out"
        right={isMoved ? "100%" : "0"}
        overflow="visible"
        onBlur={() => setIsMoved(false)}
      >
        <Avatar
          size="md"
          mr="10px"
          iconLabel="User Avatar"
          overflow="hidden"
          icon={<Icon as={FaUserAlt} fontSize="2.2rem" mt="0.7rem" />}
          src={result.photoURL}
          bgColor={getRandomColor()}
          borderWidth="2px"
          borderStyle="solid"
          borderColor={borderColor}
        />
        <Flex className={styles.listItemTextContainer} overflow="hidden">
          <Text className={styles.liHeader} fontSize="1.2rem">
            {result.displayName || result.email}
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
        <Flex
          w="100%"
          h="100%"
          backgroundColor="transparent"
          borderLeft="3px solid white"
          position="absolute"
          left="100%"
          top="0"
          align="center"
          justify="space-around"
          color={textColor}
          opacity="0.8"
          _hover={{
            opacity: "1",
          }}
          transition="0.3s ease-in-out"
          onClick={onOpen}
        >
          <Icon as={BiUserPlus} fontSize="2.8rem" opacity="inherit" />
          <Text fontSize="1.4rem" color="inherit" opacity="inherit">
            New chat
          </Text>
          <Icon
            as={MdArrowForwardIos}
            opacity="inherit"
            fontSize="1.5rem"
            color="inherit"
          />
          <InfoModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Button>
      <Divider />
    </>
  );
};

export default SearchResult;
