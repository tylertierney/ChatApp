import { Icon, Flex, Text } from "@chakra-ui/react";
import {
  ReactChild,
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./Toast.module.css";

const ToastContext = createContext<any>(null);

let id = 1;

interface ToastContextProps {
  children: ReactChild;
}

const ToastProvider: React.FC<ToastContextProps> = ({ children }) => {
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = useCallback(
    (content) => {
      setToasts((toasts) => [...toasts, { id: id++, content }]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  const Toast: React.FC<ToastProps> = ({ id, type, text }) => {
    const { removeToast } = useToast();

    useEffect(() => {
      const timer = setTimeout(() => {
        setToasts((toasts) => toasts.filter((t) => t.id !== id));
        console.log(toasts.filter((t) => t.id !== id));
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }, [id, removeToast]);

    return (
      <Flex
        userSelect="none"
        w="100%"
        h="40px"
        align="center"
        justify="center"
        gap="2"
        borderRadius="10px"
        backgroundColor="#2c2c38"
        color="white"
        boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.2)"
        className={styles.toast}
      >
        {type === "info" && <Icon as={FaInfoCircle} color="inherit" />}
        <Text color="inherit">{text}</Text>
      </Flex>
    );
  };

  const ToastContainer: React.FC<any> = ({ toasts }) => {
    return (
      <Flex
        zIndex="5"
        position="fixed"
        bottom="40px"
        left="50%"
        transform="translate(-50%, 0)"
        align="center"
        justify="center"
        direction="column"
        w="260px"
        gap="2"
      >
        {toasts.map((item: any) => {
          return (
            <Toast
              key={item.id}
              id={item.id}
              type={item.content.type}
              text={item.content.text}
            />
          );
        })}
      </Flex>
    );
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);

interface ToastProps {
  id: number;
  type: string;
  text: string;
}
