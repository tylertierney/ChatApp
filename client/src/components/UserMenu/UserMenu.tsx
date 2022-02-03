import {
  Avatar,
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Flex,
  Text,
  Icon,
  MenuDivider,
  AvatarBadge,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/authContext";

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  const { currentUser, logout } = useAuth();

  const bgColor = useColorModeValue("brand.softwhite", "brand.darkgray");
  const btnColor = useColorModeValue("brand.white", "brand.gray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");
  const hoverColor = useColorModeValue(
    "brand.hovergraylight",
    "brand.hovergray.dark"
  );

  const menuItems = [
    {
      text: "Sign Out",
      icon: FiLogOut,
      action: () => logout,
    },
  ];

  const menuItemsArr = menuItems.map((item, idx) => {
    return (
      <MenuItem
        key={idx}
        onClick={item.action}
        color={textColor}
        _hover={{ backgroundColor: hoverColor }}
      >
        <Flex align="center">
          <Text mr="10px">{item.text}</Text>
          <Icon fontSize="1.2rem" as={item.icon} />
        </Flex>
      </MenuItem>
    );
  });

  return (
    <Menu gutter={0}>
      <MenuButton
        border="2px solid transparent"
        _focus={{ outline: "none" }}
        as={Button}
        height="100%"
        p="0 1rem"
        variant="unstyled"
      >
        <Avatar size="sm" cursor="poiner">
          <AvatarBadge boxSize="0.7rem" bgColor="lightgreen" />
        </Avatar>
      </MenuButton>
      <MenuList bgColor={bgColor}>
        <Flex direction="column" align="center">
          <Avatar size="md" />
          <Text>Tyler Tierney</Text>
          <Button
            bgColor={btnColor}
            height="1.2rem"
            fontSize="0.8rem"
            _hover={{ backgroundColor: btnColor }}
            cursor="pointer"
          >
            <div
              style={{
                height: "0.7rem",
                width: "0.7rem",
                borderRadius: "50%",
                backgroundColor: "lightgreen",
                border: "1px solid white",
                marginRight: "6px",
              }}
            ></div>
            <Text>Active</Text>
          </Button>
        </Flex>
        <MenuDivider />
        {/* <MenuItem color={textColor} _hover={{ backgroundColor: hoverColor }}>
          <Flex align="center">
            <Text mr="10px">Logout</Text>
            <Icon fontSize="1.2rem" as={FiLogOut} />
          </Flex>
        </MenuItem> */}
        {menuItemsArr}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
