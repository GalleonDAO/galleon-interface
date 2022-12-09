import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  KNOWN_SERVICES,
  KNOWN_LABELS,
  LOG_SEVERITY,
} from "@galleondao/logging-lib";
import App from "App";
import theme from "theme";

import "@fontsource/ibm-plex-sans";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Config, DAppProvider } from "@usedapp/core";

import Dashboard from "components/views/Homepage";
import ETHMAXY from "components/views/productpages/ETHMAXY";
// import DBL from "components/views/productpages/DBL";
import Products from "components/views/Products";
import {
  ARBITRUM,
  MAINNET,
  OPTIMISM,
  POLYGON,
  SUPPORTED_CHAINS,
} from "constants/chains";
import { MarketDataProvider } from "providers/MarketData/MarketDataProvider";
import SetComponentsProvider from "providers/SetComponents/SetComponentsProvider";
import "./index.css";
import { initLogger } from "utils/logger";
import BYE from "components/views/productpages/BYE";
import Bridge from "components/views/Bridge";

export const logger = initLogger(process.env.REACT_APP_APIM_SUBSCRIPTION_KEY);

document.addEventListener("click", (event) => {
  // @ts-ignore
  const eventName: string = event.target.innerText;
  // @ts-ignore
  // const isButton = event.target.nodeName === "BUTTON";
  // @ts-ignore
  // const isAnchor = event.target.nodeName === "A";
  // @ts-ignore
  const isSpan = event.target.nodeName === "SPAN";
  // @ts-ignore
  const isParagraph = event.target.nodeName === "P";

  const NETWORKS = [...SUPPORTED_CHAINS.map((x) => x.name)];
  if (NETWORKS.includes(eventName) && isSpan) {
    // @ts-ignore
    console.log(event.target.nodeName);
    console.dir(eventName);
    logger.logCounter({
      serviceName: KNOWN_SERVICES.GALLEON_DAPP,
      environment: process.env.NODE_ENV,
      label: KNOWN_LABELS.NETWORK_CHANGE,
      metadata: {
        network: eventName,
        // @ts-ignore
        address: window.ethereum ? window.ethereum.selectedAddress : "",
      },
    });
  }

  const CSV_EVENT = "Download CSV";
  if (eventName === CSV_EVENT && isParagraph) {
    // @ts-ignore
    console.log(event.target.nodeName);
    console.dir(eventName);
    logger.logCounter({
      serviceName: KNOWN_SERVICES.GALLEON_DAPP,
      environment: process.env.NODE_ENV,
      label: KNOWN_LABELS.DOWNLOAD_CSV,
      metadata: {},
    });
  }
});

window.onerror = function (msg, url, line) {
  logger.logMessage({
    serviceName: KNOWN_SERVICES.GALLEON_DAPP,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    severity: LOG_SEVERITY.ERROR,
    functionName: "window.onerror",
    // @ts-ignore
    exception: JSON.stringify(msg),
    message: `error occured at url: ${url}, line number: ${line}`,
    correlationId: undefined,
  });
};

const config: Config = {
  readOnlyChainId: MAINNET.chainId,
  readOnlyUrls: {
    [MAINNET.chainId]: process.env.REACT_APP_MAINNET_ALCHEMY_API ?? "",
    [POLYGON.chainId]: process.env.REACT_APP_POLYGON_ALCHEMY_API ?? "",
    [OPTIMISM.chainId]: process.env.REACT_APP_OPTIMISM_ALCHEMY_API ?? "",
    [ARBITRUM.chainId]: process.env.REACT_APP_ARBITRUM_ALCHEMY_API ?? "",
  },
};

const Providers = (props: { children: any }) => {
  return (
    <ChakraProvider theme={theme}>
      <DAppProvider config={config}>
        <MarketDataProvider>
          <SetComponentsProvider>{props.children}</SetComponentsProvider>
        </MarketDataProvider>
      </DAppProvider>
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
            <Route path="products" element={<Products />} />
            <Route path="ethmaxy" element={<ETHMAXY />} />
            <Route path="bye" element={<BYE />} />
            <Route path="swap/*" element={<Bridge />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
