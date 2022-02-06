import styles from "./Login.module.css";
import { BiLoaderAlt } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";

interface SubmitBtnProps {
  text: string;
  pending: boolean;
}
const SubmitBtn: React.FC<SubmitBtnProps> = ({ text, pending }) => {
  return (
    <button
      type="submit"
      className={`${styles.buttons} ${styles.submitBtn}`}
      disabled={pending}
    >
      {pending ? (
        <Icon
          as={BiLoaderAlt}
          fontSize="1.4rem"
          strokeWidth="3px"
          className={styles.loadingSpinner}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitBtn;
