import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "App";
import theme from "theme";

import "@fontsource/ibm-plex-sans";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import Dashboard from "components/views/Homepage";

import "./index.css";
import { initLogger } from "utils/logger";
import {
  KNOWN_LABELS,
  KNOWN_SERVICES,
  LOG_SEVERITY,
} from "@galleondao/logging-lib";

export const logger = initLogger(process.env.REACT_APP_APIM_SUBSCRIPTION_KEY);

document.addEventListener("click", (event) => {
  // @ts-ignore
  const eventName: string = event.target.innerText;
  // @ts-ignore
  const isAnchor = event.target.nodeName === "A";
  // @ts-ignore
  // const isSpan = event.target.nodeName === "SPAN";
  // @ts-ignore
  // const isParagraph = event.target.nodeName === "P";

  if (isAnchor) {
    // @ts-ignore
    console.log(event.target.href);
    console.dir(eventName);
    logger.logCounter({
      serviceName: KNOWN_SERVICES.GALLEON_UI,
      environment: process.env.NODE_ENV,
      label: KNOWN_LABELS.NAVIGATED,
      // @ts-ignore
      metadata: { url: event.target.href },
    });
  }
});

window.onerror = function (msg, url, line) {
  logger.logMessage({
    serviceName: KNOWN_SERVICES.GALLEON_UI,
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

const Providers = (props: { children: any }) => {
  const gtmParams = {
    id: process.env.REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID ?? "",
  };

  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
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
