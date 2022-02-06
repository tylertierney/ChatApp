import { useAuth } from "../../context/authContext";
import {
  Flex,
  Text,
  Image,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import styles from "./Login.module.css";

import StyledInput from "../StyledInput/StyledInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import GraphicWindow from "./GraphicWindow";
import WelcomeMessage from "./WelcomeMessage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { readableErrorMessage } from "../../helperFunctions";
import SubmitBtn from "./SubmitBtn";

const Login: React.FC = () => {
  const { login, signInViaGithub } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const trimmedEmail = email.trim();
    const trimmedPw = password.trim();
    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPw)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        setPending(false);
      })
      .catch((err) => {
        setError(err);
        setPending(false);
      });
  };

  if (error) {
    console.log(error["message"]);
  }

  const dividerColor = useColorModeValue("brand.text.dark", "brand.text.light");

  return (
    <Flex className={styles.window}>
      <GraphicWindow />
      <Flex className={styles.formWindow}>
        <Flex className={styles.verticalColumn}>
          <form className={styles.formHTML} onSubmit={(e) => handleSubmit(e)}>
            <WelcomeMessage
              header="Welcome back!"
              text="Login using your email/password or choose a provider."
            />
            <Text className={styles.errorMessage}>
              {error ? readableErrorMessage(error["code"]) : " "}
            </Text>
            <FormControl isRequired>
              <StyledInput
                name="email"
                placeholder="Email"
                autofillType="email"
                error={false}
                inputValue={email}
                setInputValue={setEmail}
                pending={pending}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <StyledInput
              name="password"
              placeholder="Password"
              autofillType="current-password"
              error={false}
              inputValue={password}
              setInputValue={setPassword}
              pending={pending}
            />
            <SubmitBtn text="Log In" pending={pending} />
          </form>
          <Flex className={styles.signupDivider}>
            <Flex bgColor={dividerColor}></Flex>
            <Text as="span">or</Text>
            <Flex bgColor={dividerColor}></Flex>
          </Flex>
          <button
            className={`${styles.buttons} ${styles.githubBtn}`}
            style={{
              borderColor: dividerColor,
            }}
            onClick={() => signInViaGithub()}
          >
            <Text as="span" color="inherit" mr="0.5rem">
              Sign in with Github
            </Text>
            <Icon as={BsGithub} fontSize="1.4rem" />
          </button>
          <Text className={styles.alternateLoginLink}>
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
    </Flex>
  );
};

export default Login;
