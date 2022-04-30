import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider resetCSS={false}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </RecoilRoot>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
