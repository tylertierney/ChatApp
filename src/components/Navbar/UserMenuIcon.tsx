import { Button } from "@chakra-ui/react";

import { useAuth } from "../../context/authContext";

import UserAvatar from "../UserAvatar/UserAvatar";

interface UserMenuIconProps {
  panelShowing: string;
  setPanelShowing: Function;
}

const UserMenuIcon: React.FC<UserMenuIconProps> = ({
  panelShowing,
  setPanelShowing,
}) => {
  const { enrichedUserData } = useAuth();

  if (!enrichedUserData) return null;

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
      <UserAvatar
        size="sm"
        enrichedUserData={enrichedUserData}
        showStatus={true}
        src={enrichedUserData["photoURL"] || ""}
        status={enrichedUserData["isActive"]}
      />
    </Button>
  );
};

export default UserMenuIcon;
