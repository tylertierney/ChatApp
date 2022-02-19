import {
  Flex,
  IconButton,
  Input,
  useColorModeValue,
  Text,
  Divider,
} from "@chakra-ui/react";
import searchStyles from "./Search.module.css";
import styles from "../ConversationsList/ConversationsList.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ChangeEvent, RefObject, useState } from "react";
import { searchForUser } from "../../utilities/database";
import SearchResult from "./SearchResult";
import { useAuth } from "../../context/authContext";
import LoadingDots from "../LoadingDots/LoadingDots";

interface SearchProps {
  isSearching: boolean;
  setIsSearching: Function;
  iconColor: string;
  bgColor: string;
  homeRef: RefObject<HTMLDivElement>;
}

const Search: React.FC<SearchProps> = ({
  isSearching,
  setIsSearching,
  iconColor,
  bgColor,
  homeRef,
}) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const searchInputColor = useColorModeValue("brand.gray", "brand.darkgray");
  const { enrichedUserData } = useAuth();

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      setResults([]);
      return;
    }
    // if (e.target.value === enrichedUserData["uid"]) {
    //   setResults([]);
    //   return;
    // }
    const res = await searchForUser(e.target.value);
    if (!res.uid) {
      setResults([]);
      return;
    }

    setResults([res]);
  };

  return (
    <Flex
      position="absolute"
      transition="0.3s ease-in-out"
      top={isSearching ? "0" : "-110%"}
      bgColor={bgColor}
      className={searchStyles.searchContainer}
    >
      <Flex
        className={searchStyles.searchBox}
        p="0 0 0 1rem"
        bgColor={searchInputColor}
      >
        <Input
          type="text"
          onChange={(e) => handleSearch(e)}
          value={searchText}
          variant="unstyled"
          color="white"
          placeholder="Group ID or User ID"
        />
        <IconButton
          icon={<AiOutlineCloseCircle />}
          aria-label="Exit search"
          onClick={() => setIsSearching(false)}
          variant="unstyled"
          fontSize="1.4rem"
          margin="0 0 0 0.5rem"
          color="white"
        />
      </Flex>
      {results.length > 0 ? (
        <>
          <Flex className={styles.groupControls}>
            <Text
              className={styles.groupTitle}
            >{`Results (${results.length})`}</Text>
          </Flex>
          <Divider />
          {results.map((res: any, idx: any) => (
            <SearchResult
              key={idx}
              result={res}
              homeRef={homeRef}
              setIsSearching={setIsSearching}
            />
          ))}
        </>
      ) : (
        <Flex
          w="100%"
          h="100%"
          justify="flex-start"
          align="center"
          paddingX="1rem"
          direction="column"
        >
          <Flex mt="4rem">
            <LoadingDots size="20px" />
          </Flex>
          <Text w="100%" textAlign="center" mt="1rem">
            Paste a User ID into the search bar to find someone.
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Search;
