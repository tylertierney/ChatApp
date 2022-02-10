import {
  Button,
  Avatar,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Divider,
} from "@chakra-ui/react";
import styles from "../ConversationsList/ConversationsList.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { getRandomColor } from "../../helperFunctions";

interface SearchResultProps {
  result: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const bgColor = useColorModeValue(
    "rgba(242, 246, 247, 1)",
    "rgba(67, 67, 84, 1)"
  );
  const transp = useColorModeValue(
    "rgba(242, 246, 247, 0)",
    "rgba(67, 67, 84, 0)"
  );
  const borderColor = useColorModeValue("brand.hovergraydark", "white");

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
        onClick={() => console.log(result)}
      >
        <Avatar
          size="md"
          mr="10px"
          iconLabel="User Avatar"
          overflow="hidden"
          icon={<Icon as={FaUserAlt} fontSize="2.2rem" mt="0.7rem" />}
          bgColor={getRandomColor()}
          borderWidth="2px"
          borderStyle="solid"
          borderColor={borderColor}
        />
        <Flex className={styles.listItemTextContainer}>
          <Text className={styles.liHeader}>Hello</Text>
          {/* <Text as="span" className={styles.convoPreviewText}>
            {mostRecentMsg}
          </Text> */}
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
    </>
  );
};

export default SearchResult;
