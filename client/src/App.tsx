import "./App.css";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/authContext";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";
import ToastProvider from "./context/Toast/Toast";

interface PanelContextType {
  panelShowing: string;
  setPanelShowing: Function;
}

const App = () => {
  const { currentUser, pending } = useAuth();
  const navigate = useNavigate();
  const [windowSafeHeight, setWindowSafeHeight] = useState("");

  const [panelShowing, setPanelShowing] = useState<string>("default");

  useEffect(() => {
    // if (!currentUser) {
    //   navigate("/register");
    // }
    const safeHeight = window.innerHeight + "px";
    setWindowSafeHeight(safeHeight);
    window.document.body.style.overflowY = "hidden";
    smoothscroll.polyfill();

    return () => {
      window.document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <ToastProvider>
      <Flex
        direction="column"
        h={windowSafeHeight}
        width="100%"
        filter={pending ? "blur(2px)" : "none"}
        overflow="hidden"
        overscrollBehavior="contain"
      >
        <Navbar panelShowing={panelShowing} setPanelShowing={setPanelShowing} />
        <Outlet context={{ panelShowing, setPanelShowing }} />
      </Flex>
    </ToastProvider>
  );
};

export default App;

export const usePanelShowing = () => {
  return useOutletContext<PanelContextType>();
};
