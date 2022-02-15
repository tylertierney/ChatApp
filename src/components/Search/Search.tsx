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

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      setResults([]);
      return;
    }
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
      <Flex className={styles.groupControls}>
        <Text
          className={styles.groupTitle}
        >{`Results (${results.length})`}</Text>
      </Flex>
      {results.length > 0 && (
        <>
          <Divider />
          {results.map((res: any, idx: any) => (
            <>
              <SearchResult
                key={idx}
                result={res}
                homeRef={homeRef}
                setIsSearching={setIsSearching}
              />
              <Divider />
            </>
          ))}
        </>
      )}
    </Flex>
  );
};

export default Search;