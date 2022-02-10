import { Flex, IconButton, Input, useColorModeValue } from "@chakra-ui/react";
import styles from "./Search.module.css";
import { useAuth } from "../../context/authContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";

interface SearchProps {
  isSearching: boolean;
  setIsSearching: Function;
  iconColor: string;
  bgColor: string;
}

const Search: React.FC<SearchProps> = ({
  isSearching,
  setIsSearching,
  iconColor,
  bgColor,
}) => {
  const { enrichedUserData } = useAuth();
  const [searchText, setSearchText] = useState("");
  const searchInputColor = useColorModeValue("brand.gray", "brand.darkgray");

  return (
    <Flex
      position="absolute"
      transition="0.3s ease-in-out"
      top={isSearching ? "0" : "-110%"}
      bgColor={bgColor}
      className={styles.searchContainer}
    >
      <Flex
        className={styles.searchBox}
        p="0 0 0 1rem"
        bgColor={searchInputColor}
      >
        <Input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          variant="unstyled"
          color="white"
          placeholder="Group ID or User ID"
        />
        <IconButton
          ml="0.5rem"
          icon={<AiOutlineCloseCircle />}
          aria-label="Exit search"
          onClick={() => setIsSearching(false)}
          variant="unstyled"
          fontSize="1.7rem"
          color="white"
        />
      </Flex>
    </Flex>
  );
};

export default Search;
