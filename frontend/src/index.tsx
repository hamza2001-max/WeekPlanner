import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
