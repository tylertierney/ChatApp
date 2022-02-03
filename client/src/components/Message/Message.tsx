import { message } from "../../models/message";
import {
  Flex,
  Divider,
  Text,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

interface MessageProps {
  message: message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { sender, date, text } = message;

  let parsedDate = new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Flex
      height="40px"
      w="100%"
      align="center"
      _hover={{
        backgroundColor: useColorModeValue(
          "brand.hovergraylight",
          "brand.hovergraydark"
        ),
      }}
      p="2rem 20px"
    >
      <Avatar
        size="sm"
        mr="1.2rem"
        name={sender}
        iconLabel={sender + " avatar"}
      />
      <Flex direction="column" w="100%">
        <Text>
          <Text as="span" fontWeight="bold" mr="10px">
            {sender}
          </Text>
          <Text as="span" fontSize="0.7rem" fontWeight="medium">
            {parsedDate}
          </Text>
        </Text>
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
};

export default Message;
