import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import AuthProvider from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import UserDataProvider from "./context/userDataContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          {/* <UserDataProvider> */}
          <App />
          {/* </UserDataProvider> */}
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
