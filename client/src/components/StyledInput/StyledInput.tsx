import {
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import styles from "./StyledInput.module.css";

interface InputProps {
  name: string;
  icon: any;
  placeholder: string;
  inputValue: string;
  setInputValue: Function;
}

const StyledInput: React.FC<InputProps> = ({
  name,
  icon,
  placeholder,
  inputValue,
  setInputValue,
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
        type={name}
        autoComplete={name}
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
        placeholder=" "
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        boxShadow={`0 0 0 30px ${inputBgColor} inset`}
        color={textColor}
      />
      <InputRightElement
        className={styles.inputIcon}
        children={<Icon as={icon} fontSize="1.4rem" />}
      />
    </InputGroup>
  );
};

export default StyledInput;
