import styles from "./Login.module.css";
import { BiLoaderAlt } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";

interface SubmitBtnProps {
  text: string;
  pending: boolean;
  error?: string;
}
const SubmitBtn: React.FC<SubmitBtnProps> = ({ text, pending, error }) => {
  let isError = false;
  if (error) {
    isError = true;
  }

  return (
    <button
      type="submit"
      className={`${styles.buttons} ${styles.submitBtn}`}
      disabled={pending || isError}
      style={{
        opacity: pending || isError ? "0.7" : "1",
        cursor: pending || error ? "not-allowed" : "pointer",
      }}
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
