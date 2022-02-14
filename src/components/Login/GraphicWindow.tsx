import styles from "./Login.module.css";
import { Flex, Text } from "@chakra-ui/react";

const GraphicWindow: React.FC = () => {
  return (
    <Flex className={styles.graphicWindow}>
      <Flex direction="column" minW="400px" maxW="400px">
        <Text
          fontSize="3.4rem"
          lineHeight={0.1}
          fontWeight="thin"
          color="white"
          as="span"
          w="100%"
          textAlign="left"
        >
          Share your&nbsp;
        </Text>
        <br />
        <Text
          lineHeight={0.8}
          fontSize="4.2rem"
          fontWeight="bold"
          textAlign="center"
          color="white"
          as="span"
        >
          biggest
        </Text>
        <br />
        <Text
          fontSize="3.4rem"
          lineHeight={0.1}
          fontWeight="thin"
          color="white"
          w="100%"
          textAlign="right"
          as="span"
        >
          ideas
        </Text>
      </Flex>
    </Flex>
  );
};

export default GraphicWindow;
