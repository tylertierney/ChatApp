import { useAuth } from "../../context/authContext";
import {
  Flex,
  Text,
  Input,
  Image,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import horizontalLogo from "../../svg/chatapp_logo_horizontal.svg";
import styles from "./Login.module.css";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";

const Login: React.FC = () => {
  return (
    <Flex align="center" justify="center" h="100%" w="100%">
      <Flex
        direction="column"
        align="center"
        justify="center"
        background="linear-gradient(315deg, rgba(120,120,255,1) 0%, rgba(163,163,255,1) 50%, rgba(203,163,255,1) 100%)"
        className={styles.graphicWindow}
      >
        <Flex direction="column" minW="400px" maxW="400px">
          <Text
            fontSize="3.9rem"
            lineHeight={0.3}
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
            lineHeight={1}
            fontSize="5rem"
            fontWeight="bold"
            textAlign="center"
            color="white"
            as="span"
          >
            grandest
          </Text>
          <br />
          <Text
            fontSize="3.9rem"
            lineHeight={0.3}
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
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        className={styles.formWindow}
      >
        <form className={styles.formHTML}>
          <Flex
            bgColor="rgb(0, 0, 0, 0.02)"
            borderRadius="full"
            mt="2rem"
            width="60px"
            height="60px"
            border="1px solid rgb(0, 0, 0, 0.1)"
            padding="10px"
            boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
          >
            <Image
              src="../../svg/chatapp_logo.svg"
              alt="Chatmosphere logo"
              maxW="200px"
            />
          </Flex>
          <Text fontWeight="semibold" fontSize="1.8rem">
            Welcome back!
          </Text>
          <Text fontWeight="thin" mb="1.8rem" textAlign="center">
            Login using your email/password or choose a provider.
          </Text>
          <InputGroup className={styles.inputGroup}>
            <Input
              type="email"
              autoComplete="email"
              name="email"
              id="email"
              aria-label="email"
              className={styles.inputHTML}
              _focus={{
                backgroundColor: "rgb(0, 0, 0, 0.06)",
              }}
            />
            <InputRightElement
              children={
                <Icon as={HiOutlineAtSymbol} opacity="0.5" fontSize="1.4rem" />
              }
            />
          </InputGroup>
          {/* <Flex className={styles.inputGroup}>
            <input className={styles.inputHTML} />
          </Flex> */}
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
