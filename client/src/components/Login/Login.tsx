import { useAuth } from "../../context/authContext";
import {
  Flex,
  Text,
  Image,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import styles from "./Login.module.css";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import StyledInput from "../StyledInput/StyledInput";
import { useState } from "react";
import smallLogo from "../../svg/test2.svg";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Flex className={styles.window}>
      <Flex className={styles.graphicWindow}>
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
      <Flex className={styles.formWindow}>
        <form className={styles.formHTML} onSubmit={(e) => handleSubmit(e)}>
          <Flex className={styles.logoContainer}>
            <Image src={smallLogo} alt="Chatmosphere logo" />
          </Flex>
          <Text fontWeight="semibold" fontSize="1.6rem">
            Welcome back!
          </Text>
          <Text fontWeight="light" mb="1.8rem" textAlign="center">
            Login using your email/password or choose a provider.
          </Text>
          <FormControl isRequired>
            <StyledInput
              name="email"
              icon={HiOutlineAtSymbol}
              placeholder="Email"
              inputValue={email}
              setInputValue={setEmail}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <StyledInput
            name="password"
            icon={AiOutlineLock}
            placeholder="Password"
            inputValue={password}
            setInputValue={setPassword}
          />
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
        <Text mt="9rem">
          Don&apos;t have an account yet?&nbsp;
          <Link to="/register">
            <Text
              decoration="underline"
              as="span"
              color="var(--inputLightblue)"
            >
              Sign up!
            </Text>
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
