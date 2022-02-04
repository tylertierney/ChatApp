import { Flex } from "@chakra-ui/react";
import styles from "./LoadingDots.module.css";

interface DotsProps {
  size: string;
}

const LoadingDots: React.FC<DotsProps> = ({ size }) => {
  return (
    <Flex align="center">
      <Flex
        bgColor="brand.primary.1000"
        className={styles.dot}
        w={size}
        h={size}
        mr={String(parseInt(size) / 3) + "px"}
      ></Flex>
      <Flex
        bgColor="brand.primary.1000"
        className={styles.dot}
        w={size}
        h={size}
        mr={String(parseInt(size) / 3) + "px"}
      ></Flex>
      <Flex
        bgColor="brand.primary.1000"
        className={styles.dot}
        w={size}
        h={size}
      ></Flex>
    </Flex>
  );
};

export default LoadingDots;
