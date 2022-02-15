import { useColorModeValue, Avatar, Flex, Icon } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";

interface UserAvatarProps {
  enrichedUserData: any;
  size: string;
  showStatus: boolean;
  src?: string;
  status?: boolean;
}
const UserAvatar: React.FC<UserAvatarProps> = ({
  enrichedUserData,
  size,
  showStatus,
  src,
  status,
}) => {
  const borderColor = useColorModeValue("brand.hovergraydark", "white");

  let userName, userPhoto;

  if (enrichedUserData["displayName"]) {
    userName = enrichedUserData["displayName"];
  } else {
    if (enrichedUserData["email"]) {
      userName = enrichedUserData["email"];
    }
  }

  if (enrichedUserData["photoURL"]) {
    userPhoto = enrichedUserData["photoURL"];
  }

  let fontSize = "1.4rem",
    mt = "0.4rem";
  if (size === "lg") {
    fontSize = "3rem";
    mt = "1rem";
  }
  if (size === "xl") {
    fontSize = "4.3rem";
    mt = "1.7rem";
  }
  if (size === "2xl") {
    fontSize = "5.9rem";
    mt = "2.2rem";
  }

  return (
    <Flex align="center" justify="center" position="relative">
      <Avatar
        size={size}
        cursor="poiner"
        src={src || userPhoto}
        icon={<Icon as={FaUserAlt} fontSize={fontSize} mt={mt} />}
        borderWidth="2px"
        borderStyle="solid"
        overflow="hidden"
        borderColor={borderColor}
        bgColor={src ? "white" : ""}
        name={userName}
      />
      {showStatus && (
        <Flex
          width="12px"
          height="12px"
          position="absolute"
          borderRadius="50%"
          backgroundColor={status ? "lightgreen" : "orange"}
          bottom="-1px"
          right="0"
          border="2px solid"
          borderColor={borderColor}
        ></Flex>
      )}
    </Flex>
  );
};

export default UserAvatar;
