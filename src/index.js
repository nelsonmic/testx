import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import { ConfigProvider } from "react-avatar";
import { SkeletonTheme } from "react-loading-skeleton";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider resetCSS={false}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider colors={["#232355", "#1D5C63", "#D82148"]}>
              <SkeletonTheme baseColor="#d9d9d9">
                <App />
              </SkeletonTheme>
            </ConfigProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
