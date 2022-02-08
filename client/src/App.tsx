import "./App.css";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/authContext";
import { Outlet, useOutletContext } from "react-router-dom";

interface PanelContextType {
  panelShowing: string;
  setPanelShowing: Function;
}

const App = () => {
  const { pending } = useAuth();
  // const { currentUser } = useAuth();

  const [panelShowing, setPanelShowing] = useState<string>("default");

  return (
    <>
      <Flex
        direction="column"
        h="100%"
        width="100%"
        filter={pending ? "blur(2px)" : "none"}
      >
        <Navbar panelShowing={panelShowing} setPanelShowing={setPanelShowing} />
        <Outlet context={{ panelShowing, setPanelShowing }} />
      </Flex>
    </>
  );
};

export default App;

export const usePanelShowing = () => {
  return useOutletContext<PanelContextType>();
};
