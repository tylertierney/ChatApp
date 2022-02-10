import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import AuthProvider from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import UserDataProvider from "./context/userDataContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Home from "./components/Home/Home";
import CurrentConversation from "./components/CurrentConversation/CurrentConversation";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <UserDataProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path=":userId" element={<Home />}>
                  <Route path=":groupId" element={<CurrentConversation />} />
                </Route>
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </UserDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
