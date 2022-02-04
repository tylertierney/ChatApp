import { useAuth } from "../../context/authContext";
import { Flex, Text, Input, Image } from "@chakra-ui/react";
import horizontalLogo from "../../svg/chatapp_logo_horizontal.svg";

const Login: React.FC = () => {
  return (
    <Flex align="center" justify="center" h="100%" w="100%">
      <Flex
        w="50%"
        h="100%"
        direction="column"
        align="center"
        justify="center"
        background="linear-gradient(315deg, rgba(120,120,255,1) 0%, rgba(163,163,255,1) 50%, rgba(203,163,255,1) 100%)"
      >
        <Text
          fontSize="3.9rem"
          lineHeight={0.8}
          fontWeight="thin"
          w="90%"
          color="white"
        >
          <Text as="span" w="100%" textAlign="left" color="inherit">
            Share your&nbsp;
          </Text>
          <Text
            lineHeight={1}
            fontSize="5rem"
            fontWeight="bold"
            textAlign="center"
            color="inherit"
          >
            grandest
          </Text>
          <Text w="100%" textAlign="right" color="inherit">
            &nbsp;ideas
          </Text>
        </Text>
      </Flex>
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        width="50%"
        height="100%"
        border="solid red 1px"
      >
        <Image
          mt="2rem"
          src="../../svg/chatapp_logo_horizontal.svg"
          alt="Chatmosphere logo"
          width="45%"
          maxW="220px"
        />
      </Flex>
    </Flex>
  );
};

export default Login;
