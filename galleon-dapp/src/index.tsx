import React from "react";
import "dotenv/config";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "App";
import theme from "theme";

import "@fontsource/ibm-plex-sans";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import { Config, DAppProvider } from "@usedapp/core";

import Dashboard from "components/views/Homepage";
import LiquidityMining from "components/views/LiquidityMining";

import ETHMAXY from "components/views/productpages/ETHMAXY";
import DBL from "components/views/productpages/DBL";
import Products from "components/views/Products";
import { ARBITRUM, MAINNET, OPTIMISM, POLYGON } from "constants/chains";
import LiquidityMiningProvider from "providers/LiquidityMining/LiquidityMiningProvider";
import { MarketDataProvider } from "providers/MarketData/MarketDataProvider";
import SetComponentsProvider from "providers/SetComponents/SetComponentsProvider";

import "./index.css";

const config: Config = {
  readOnlyChainId: MAINNET.chainId,
  readOnlyUrls: {
    [MAINNET.chainId]:
      process.env.REACT_APP_MAINNET_ALCHEMY_API ??
      "https://eth-mainnet.alchemyapi.io/v2/RUwft-_xhH_-Vg8CXWomBhXIqcevPS19",
    [POLYGON.chainId]:
      process.env.REACT_APP_POLYGON_ALCHEMY_API ??
      "https://polygon-mainnet.g.alchemy.com/v2/toY-lsDEkfOqpWApuezyXm6SDvQY05Ba",
    [OPTIMISM.chainId]:
      process.env.REACT_APP_OPTIMISM_ALCHEMY_API ??
      "https://opt-mainnet.g.alchemy.com/v2/apSdigw1kX2_Fi6QjUTvAUKugMWTCdOU",
    [ARBITRUM.chainId]:
      process.env.REACT_APP_ARBITRUM_ALCHEMY_API ??
      "https://arb-mainnet.g.alchemy.com/v2/SgU4gbtBjFY9zc6aLNc21ZU6cWe-E01U",
  },
};

const Providers = (props: { children: any }) => {
  const gtmParams = {
    id: process.env.REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID ?? "",
  };

  return (
    <ChakraProvider theme={theme}>
      <DAppProvider config={config}>
        <MarketDataProvider>
          {/* <LiquidityMiningProvider> */}
          <SetComponentsProvider>
            <GTMProvider state={gtmParams}>{props.children}</GTMProvider>
          </SetComponentsProvider>
          {/* </LiquidityMiningProvider> */}
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
            {/* <Route path="liquidity-mining" element={<LiquidityMining />} /> */}
            <Route path="products" element={<Products />} />
            <Route path="ethmaxy" element={<ETHMAXY />} />
            <Route path="dbl" element={<DBL />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
