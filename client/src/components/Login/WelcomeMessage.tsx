import smallLogo from "../../svg/test2.svg";
import { Flex, Text, Image } from "@chakra-ui/react";
import styles from "./Login.module.css";

interface MsgProps {
  header: string;
  text: string;
}

const WelcomeMessage: React.FC<MsgProps> = ({ header, text }) => {
  return (
    <>
      <Flex className={styles.logoContainer}>
        <Image src={smallLogo} alt="Chatmosphere logo" />
      </Flex>
      <Text fontWeight="semibold" fontSize="1.6rem" userSelect="none">
        {header}
      </Text>
      <Text fontWeight="light" mb="1rem" textAlign="center" userSelect="none">
        {text}
      </Text>
    </>
  );
};

export default WelcomeMessage;
