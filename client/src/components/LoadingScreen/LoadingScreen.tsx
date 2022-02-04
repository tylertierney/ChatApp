import { Flex } from "@chakra-ui/react";
import LoadingDots from "../LoadingDots/LoadingDots";

const LoadingScreen: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
      bgColor="rgb(0, 0, 0, 0.7)"
      position="absolute"
      top="0"
      left="0"
      zIndex={5}
    >
      <LoadingDots size="50px" />
    </Flex>
  );
};

export default LoadingScreen;
