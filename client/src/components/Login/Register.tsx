import { useAuth } from "../../context/authContext";
import { Flex, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import styles from "./Login.module.css";

import StyledInput from "../StyledInput/StyledInput";
import { useState } from "react";

import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import GraphicWindow from "./GraphicWindow";
import WelcomeMessage from "./WelcomeMessage";
import { readableErrorMessage } from "../../helperFunctions";
import SubmitBtn from "./SubmitBtn";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const { signInViaGithub } = useAuth();

  if (error) {
    console.log(error["message"]);
  }

  const dividerColor = useColorModeValue("brand.text.dark", "brand.text.light");

  return (
    <Flex className={styles.window}>
      <GraphicWindow />
      <Flex className={styles.formWindow}>
        <Flex className={styles.verticalColumn}>
          <form className={styles.formHTML}>
            <WelcomeMessage
              header="Welcome to Chatmosphere!"
              text="Create an account with your email/password or choose a provider."
            />
            <Text className={styles.errorMessage}>
              {error ? readableErrorMessage(error["code"]) : " "}
            </Text>
            <StyledInput
              name="email"
              placeholder="Email"
              autofillType="email"
              error={false}
              inputValue={email}
              setInputValue={setEmail}
              pending={pending}
            />
            <StyledInput
              name="password"
              placeholder="Password"
              autofillType="new-password"
              error={false}
              inputValue={password}
              setInputValue={setPassword}
              pending={pending}
            />

            <SubmitBtn text="Sign Up" pending={pending} />
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
              Sign up with Github
            </Text>
            <Icon as={BsGithub} fontSize="1.4rem" />
          </button>
          <Text className={styles.alternateLoginLink}>
            Already have an account?&nbsp;
            <Link to="/login">
              <Text
                decoration="underline"
                as="span"
                color="var(--inputLightblue)"
              >
                Log in
              </Text>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
