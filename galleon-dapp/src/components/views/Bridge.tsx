import { useEffect } from "react";

import { Flex } from "@chakra-ui/react";
// import { ChartTypeSelector } from 'components/dashboard/ChartTypeSelector'
import Page from "components/Page";
import PageTitle from "components/PageTitle";

import {
  LiFiWidget,
  WidgetConfig,
  WidgetEvent,
  useWidgetEvents,
} from "@lifi/widget";
import type { Route } from "@lifi/sdk";
import { RouteExecutionUpdate } from "@lifi/widget/types/events";
import { useMemo } from "react";
import { useLogging } from "hooks/useLogging";

const Bridge = () => {
  const widgetEvents = useWidgetEvents();
  const { logCounter, logMessage, KNOWN_LABELS, LOG_SEVERITY } = useLogging();

  // BRIDGE EVENTS
  useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      logMessage(
        "onRouteExecutionStarted fired.",
        KNOWN_LABELS.BRIDGE_EXECUTION_STARTED,
        LOG_SEVERITY.INFO,
        route.id
      );
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_STARTED, route);
      console.log("onRouteExecutionStarted fired.", route);
    };
    const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
      logMessage(
        "onRouteExecutionUpdated fired.",
        KNOWN_LABELS.BRIDGE_EXECUTION_UPDATED,
        LOG_SEVERITY.INFO,
        update.route.id
      );
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_UPDATED, update);
      console.log("onRouteExecutionUpdated fired.", update);
    };
    const onRouteExecutionCompleted = (route: Route) => {
      logMessage(
        "onRouteExecutionCompleted fired.",
        KNOWN_LABELS.BRIDGE_EXECUTION_COMPLETED,
        LOG_SEVERITY.INFO,
        route.id
      );
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_COMPLETED, route);
      console.log("onRouteExecutionCompleted fired.", route);
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      logMessage(
        "onRouteExecutionFailed fired.",
        KNOWN_LABELS.BRIDGE_EXECUTION_FAILED,
        LOG_SEVERITY.INFO,
        update.route.id
      );
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_FAILED, update);
      console.log("onRouteExecutionFailed fired.", update);
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted
    );
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);

    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  const widgetConfig: WidgetConfig = useMemo(
    () => ({
      integrator: "Galleon",
      containerStyle: {
        border: "1px solid #f8e6df",
        borderRadius: "12px",
      },
      theme: {
        palette: {
          primary: { main: "#040728" },
          secondary: { main: "#FEF3E2" },
        },
        shape: {
          borderRadius: 12,
          borderRadiusSecondary: 12,
        },
        typography: {
          fontFamily: "Morion, sans-serif",
        },
      },
      tokens: {
        featured: [
          {
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            symbol: "USDC",
            decimals: 18,
            chainId: 1,
            name: "USD Coin",
            logoURI: "https://etherscan.io/token/images/centre-usdc_28.png",
          },
        ],
      },
      // set source chain to Polygon
      fromChain: 1,
      // set destination chain to Optimism
      toChain: 10,
      // set source token to USDC (Ethereum)
      fromToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      // set source token to USDC (Optimism)
      toToken: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
      // set source token amount to 10 USDC (Polygon)
      fromAmount: 1000,
      variant: "expandable",
      appearance: "light",
    }),
    []
  );

  return (
    <Page>
      <>
        <PageTitle
          title="Galleon Bridge Utility"
          subtitle="Our products are available on multiple chains. We partnered with LI.FI to give you the easiest bridging experience in moving your assets to access them."
        />
        <div className="mt-6">
          <div className=" bg-theme-white border-2 border-theme-navy rounded-xl shadow-md shadow-theme-black divide-y divide-theme-navy bg-[url('./assets/Frame.png')]  bg-no-repeat bg-cover bg-center">
            <div className="w-full flex items-center justify-between p-6  ">
              <Flex direction="column" grow={1} flexBasis="0">
                <LiFiWidget config={widgetConfig} />
              </Flex>
            </div>
          </div>
        </div>
      </>
    </Page>
  );
};

export default Bridge;
