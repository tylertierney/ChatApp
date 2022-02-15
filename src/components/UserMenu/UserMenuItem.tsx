import { Button, Divider, useColorModeValue } from "@chakra-ui/react";
import { ReactChild } from "react";
import styles from "./UserMenu.module.css";
interface UserMenuItemProps {
  textColor: string;
  clickHandler: () => void;
  children: ReactChild;
}
const UserMenuItem: React.FC<UserMenuItemProps> = ({
  textColor,
  clickHandler,
  children,
}) => {
  const menuItemClass = useColorModeValue(
    styles.menuItemLight,
    styles.menuItemDark
  );

  return (
    <>
      <Button
        variant="unstyled"
        className={`${styles.menuItem} ${menuItemClass}`}
        onClick={clickHandler}
        color={textColor}
        w="100%"
        borderRadius="0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="3.8rem"
        padding="0 1.2rem"
      >
        {children}
      </Button>
      <Divider />
    </>
  );
};

export default UserMenuItem;
