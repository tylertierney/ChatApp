import "./App.css";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/authContext";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

interface PanelContextType {
  panelShowing: string;
  setPanelShowing: Function;
}

const App = () => {
  const { currentUser, pending } = useAuth();
  const navigate = useNavigate();

  const [panelShowing, setPanelShowing] = useState<string>("default");

  // if (!currentUser) {
  //   navigate("/register");
  // }

  useEffect(() => {
    if (!currentUser) {
      navigate("/register");
    }
  }, []);

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
