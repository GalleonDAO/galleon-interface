import React from "react";
import "dotenv/config";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "App";
import theme from "theme";

import "@fontsource/ibm-plex-sans";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";

import Dashboard from "components/views/Homepage";

import { ARBITRUM, MAINNET, OPTIMISM, POLYGON } from "constants/chains";

import "./index.css";
import { MarketDataProvider } from "providers/MarketData/MarketDataProvider";

const Providers = (props: { children: any }) => {
  const gtmParams = {
    id: process.env.REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID ?? "",
  };

  return (
    <ChakraProvider theme={theme}>
      <MarketDataProvider>
        <GTMProvider state={gtmParams}>{props.children}</GTMProvider>
      </MarketDataProvider>
    </ChakraProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
