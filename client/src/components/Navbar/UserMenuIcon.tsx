import { Button, Avatar, AvatarBadge } from "@chakra-ui/react";

interface UserMenuIconProps {
  panelShowing: string;
  setPanelShowing: Function;
}

const UserMenuIcon: React.FC<UserMenuIconProps> = ({
  panelShowing,
  setPanelShowing,
}) => {
  const handlePanelOpen = (panelShowing: string) => {
    if (panelShowing === "userMenu") {
      setPanelShowing("default");
    } else {
      setPanelShowing("userMenu");
    }
  };

  return (
    <Button
      border="2px solid transparent"
      _focus={{ outline: "none" }}
      as={Button}
      height="100%"
      p="0 1rem"
      variant="unstyled"
      onClick={() => handlePanelOpen(panelShowing)}
      _active={{ backgroundColor: "transparent" }}
      _hover={{ backgroundColor: "transparent" }}
    >
      <Avatar size="sm" cursor="poiner">
        <AvatarBadge boxSize="0.7rem" bgColor="lightgreen" />
      </Avatar>
    </Button>
  );
};

export default UserMenuIcon;
