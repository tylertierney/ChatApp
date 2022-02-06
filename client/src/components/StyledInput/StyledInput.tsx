import { HiOutlineAtSymbol } from "react-icons/hi";
import {
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import {
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import styles from "./StyledInput.module.css";
import { useState } from "react";

interface InputProps {
  name: string;
  placeholder: string;
  autofillType: string;
  error: boolean;
  inputValue: string;
  setInputValue: Function;
  pending: boolean;
}

const StyledInput: React.FC<InputProps> = ({
  name,
  placeholder,
  autofillType,
  error,
  inputValue,
  setInputValue,
  pending,
}) => {
  const inputBgColor = useColorModeValue(
    "var(--backgroundWhite)",
    "var(--backgroundGray)"
  );
  const inputPlaceholderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.4)",
    "rgb(255, 255, 255, 0.4)"
  );

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [showPw, setShowPw] = useState(false);

  let minLength = 1;

  if (name === "password") {
    minLength = 7;
  }

  const getInputRightElemChildren = (name: string) => {
    if (name === "email") {
      return (
        <>
          <Icon as={HiOutlineAtSymbol} fontSize="1.4rem" />
        </>
      );
    }
    return (
      <>
        <Icon
          as={showPw ? AiOutlineEyeInvisible : AiOutlineEye}
          fontSize="1.4rem"
          onClick={() => setShowPw(!showPw)}
          cursor="pointer"
          visibility={inputValue === "" ? "hidden" : "visible"}
        />

        <Icon as={AiOutlineLock} fontSize="1.4rem" />
      </>
    );
  };

  return (
    <InputGroup
      className={
        inputValue === ""
          ? `${styles.inputGroup}`
          : `${styles.inputGroup} ${styles.something}`
      }
      bgColor={inputBgColor}
      _focus={{ backgroundColor: inputBgColor }}
      _focusWithin={{ backgroundColor: inputBgColor }}
      _after={{ color: inputPlaceholderColor, content: `"${placeholder}"` }}
      color={textColor}
    >
      <Input
        type={showPw ? "text" : name}
        autoComplete={autofillType}
        name={name}
        id={name}
        aria-label={name}
        className={styles.inputHTML}
        _focus={{
          backgroundColor: inputBgColor,
        }}
        _hover={{
          borderColor: "var(--inputLightblue)",
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        boxShadow={`0 0 0 30px ${inputBgColor} inset`}
        color={textColor}
        minLength={minLength}
        isDisabled={pending}
      />
      <InputRightElement
        right={name === "email" ? "0px" : "10px"}
        className={styles.inputIcon}
        children={getInputRightElemChildren(name)}
      />
    </InputGroup>
  );
};

export default StyledInput;
