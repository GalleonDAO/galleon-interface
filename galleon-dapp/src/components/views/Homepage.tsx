import { useEffect, useRef, useState } from "react";

import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import AllocationChart from "components/dashboard/AllocationChart";
// import { ChartTypeSelector } from 'components/dashboard/ChartTypeSelector'
import DownloadCsvView from "components/dashboard/DownloadCsvView";
import QuickTrade from "components/dashboard/QuickTrade";
import { assembleHistoryItems } from "components/dashboard/TransactionHistoryItems";
import TransactionHistoryTable, {
  TransactionHistoryItem,
} from "components/dashboard/TransactionHistoryTable";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import MarketChart, { PriceChartData } from "components/product/MarketChart";
import { getPriceChartData } from "components/product/PriceChartData";
import SectionTitle from "components/SectionTitle";
import { useUserMarketData } from "hooks/useUserMarketData";
import { useMarketData } from "providers/MarketData/MarketDataProvider";
import { getTransactionHistory } from "utils/alchemyApi";
import { exportCsv } from "utils/exportToCsv";
import { getFormattedChartPriceChanges } from "utils/priceChange";

import { getPieChartPositions } from "./DashboardData";
import { ARBITRUM, MAINNET, POLYGON, SUPPORTED_CHAINS } from "constants/chains";
import { classNames } from "utils";
import { logger } from "index";
import { KNOWN_LABELS, KNOWN_SERVICES } from "@galleondao/logging-lib";
import { useNetwork } from "hooks/useNetwork";
import { useAccount } from "hooks/useAccount";
import { LiFiWidget, WidgetConfig, WidgetEvent, useWidgetEvents } from '@lifi/widget';
import type { Route } from '@lifi/sdk';
import { RouteExecutionUpdate } from '@lifi/widget/types/events';
import { useMemo } from 'react';
import { useLogging } from "hooks/useLogging";

const Dashboard = () => {
  const { userBalances, totalBalanceInUSD, totalHourlyPrices, priceChanges } =
    useUserMarketData();
  const widgetEvents = useWidgetEvents();
  const { logCounter, logMessage, KNOWN_LABELS, LOG_SEVERITY } = useLogging();
  const { account } = useAccount();
  const { chainId, changeNetwork } = useNetwork();
  const isWeb = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  });
  const [csvDownloadUrl, setCsvDownloadUrl] = useState("");
  const [historyItems, setHistoryItems] = useState<TransactionHistoryItem[]>(
    []
  );
  const [priceChartData, setPriceChartData] = useState<PriceChartData[][]>([]);

  const csvDownloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Set only if chart data wasn't set yet e.g. by using chart type selector
    if (totalHourlyPrices.length < 1 || priceChartData.length > 0) {
      return;
    }
    const balanceData = getPriceChartData([
      { hourlyPrices: totalHourlyPrices },
    ]);
    setPriceChartData(balanceData);
  }, [totalHourlyPrices]);

  useEffect(() => {
    if (account === null || account === undefined) return;
    const fetchHistory = async () => {
      const chainIdNum = Number(chainId) ?? -1;
      const transactions = await getTransactionHistory(account, chainIdNum);
      const historyItems = assembleHistoryItems(transactions);
      setHistoryItems(historyItems);
    };
    fetchHistory();
  }, [account, chainId]);

  useEffect(() => {
    if (csvDownloadUrl === "") return;
    csvDownloadRef.current?.click();
    URL.revokeObjectURL(csvDownloadUrl);
    setCsvDownloadUrl("");
  }, [csvDownloadUrl]);

  // BRIDGE EVENTS
  useEffect(() => {
    const onRouteExecutionStarted = (route: Route) => {
      logMessage('onRouteExecutionStarted fired.', KNOWN_LABELS.BRIDGE_EXECUTION_STARTED, LOG_SEVERITY.INFO, route.id)
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_STARTED, route)
      console.log('onRouteExecutionStarted fired.', route);
    };
    const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
      logMessage('onRouteExecutionUpdated fired.', KNOWN_LABELS.BRIDGE_EXECUTION_UPDATED, LOG_SEVERITY.INFO, update.route.id)
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_UPDATED, update)
      console.log('onRouteExecutionUpdated fired.', update);
    };
    const onRouteExecutionCompleted = (route: Route) => {
      logMessage('onRouteExecutionCompleted fired.', KNOWN_LABELS.BRIDGE_EXECUTION_COMPLETED, LOG_SEVERITY.INFO, route.id)
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_COMPLETED, route)
      console.log('onRouteExecutionCompleted fired.', route);
    };
    const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
      logMessage('onRouteExecutionFailed fired.', KNOWN_LABELS.BRIDGE_EXECUTION_FAILED, LOG_SEVERITY.INFO, update.route.id)
      logCounter(KNOWN_LABELS.BRIDGE_EXECUTION_FAILED, update)
      console.log('onRouteExecutionFailed fired.', update);
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onRouteExecutionCompleted);
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);

    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  const widgetConfig: WidgetConfig = useMemo(() => ({
    integrator: 'Galleon',
    containerStyle: {
      border: '2px solid #040728',
      borderRadius: '12px',
    },
    theme: {
      palette: {
        primary: { main: '#040728' },
        secondary: { main: '#FEF3E2' },
      },
      shape: {
        borderRadius: 12,
        borderRadiusSecondary: 12,
      },
      typography: {
        fontFamily: 'Morion, sans-serif',
      },
    },
    tokens: {
      featured: [
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'USDC',
          decimals: 18,
          chainId: 1,
          name: 'USD Coin',
          logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
        },
      ],
    },
    // set source chain to Polygon
    fromChain: 1,
    // set destination chain to Optimism
    toChain: 10,
    // set source token to USDC (Ethereum)
    fromToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    // set source token to USDC (Optimism)
    toToken: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    // set source token amount to 10 USDC (Polygon)
    fromAmount: 1000,
    variant: 'expandable',
    appearance: 'light'
  }), []);

  const balancesPieChart = userBalances.map((userTokenBalance) => ({
    title: userTokenBalance.symbol,
    balance: userTokenBalance.balance,
    fiat: userTokenBalance.fiat,
  }));
  const pieChartPositions = getPieChartPositions(balancesPieChart);

  const onClickDownloadCsv = () => {
    const csv = exportCsv(historyItems, "index");
    const blob = new Blob([csv]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setCsvDownloadUrl(fileDownloadUrl);
  };

  const renderCsvDownloadButton =
    historyItems.length > 0 ? (
      <DownloadCsvView
        ref={csvDownloadRef}
        downloadUrl={csvDownloadUrl}
        onClickDownload={onClickDownloadCsv}
      />
    ) : undefined;

  return (
    <Page>
      <>
        <PageTitle
          title="Dashboard"
          subtitle="We build on-chain investment themes"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 ">
          <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-xl shadow-md shadow-theme-black divide-y divide-theme-navy">
            <div className="w-full items-center justify-between p-6 space-x-6">
              <AllocationChart positions={pieChartPositions} />
            </div>
          </div>
          <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-xl shadow-md shadow-theme-black divide-y divide-theme-navy">
            <div className="w-full flex items-center justify-between p-6 space-x-6 ">
              {SUPPORTED_CHAINS.map((x) => x.chainId).includes(chainId) ? (
                <Flex direction="column" grow={1} flexBasis="0">
                  <QuickTrade>
                    <div className=" px-2 pb-4 border-b border-theme-navy sm:px-4">
                      <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
                        Trade Investment Themes
                      </h3>
                      <p className="mt-1 text-md text-theme-navy">
                        Powered by 0x Protocol and Exchange Issuance, get the
                        most efficient order routing for your trade.
                      </p>
                    </div>
                  </QuickTrade>
                </Flex>
              ) : (
                <>
                  <div className=" px-2 pb-4 sm:px-4">
                    <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
                      Change Network
                    </h3>
                    <p className="mt-1 text-md text-theme-navy">
                      Currently our structured products are available on{" "}
                      <span className="font-semibold">
                        {SUPPORTED_CHAINS.map((x) => x.name)
                          .filter((x) => x !== ARBITRUM.name)
                          .join(", ")}
                      </span>
                    </p>
                    <>
                      <button
                        onClick={() =>
                          changeNetwork(MAINNET.chainId.toString())
                        }
                        className="m-auto justify-center text-center block mt-4 bg-theme-sky shadow-sm shadow-theme-black text-white  py-1.5 px-4 border-2 border-theme-sky rounded-xl text-base font-medium  hover:bg-opacity-75"
                      >
                        Switch to Ethereum
                      </button>

                      <Box
                        className="justify-center text-center mx-auto border-2 border-theme-navy rounded-md shadow-md"
                        mt="40px"
                        mb="8px"
                      >
                        <Image
                          height={["150", "225"]}
                          borderRadius={"25"}
                          opacity={"90%"}
                          src={"/wave.png"}
                          alt="pie chart placeholder"
                        />{" "}
                      </Box>
                    </>
                  </div>
                </>
              )}
            </div>



          </div>

        </div>

        <div className="grid grid-cols-1 mt-6">
          <div className=" bg-theme-oldlace border-2 border-theme-navy rounded-xl shadow-md shadow-theme-black divide-y divide-theme-navy">
            <div className="w-full flex items-center justify-between p-6 space-x-6 ">
              <Flex direction="column" grow={1} flexBasis="0">
                <div className=" px-2 mb-6 pb-4 border-b border-theme-navy sm:px-4">
                  <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
                    Galleon Bridge Utility
                  </h3>
                  <p className="mt-1 text-md text-theme-navy">
                    Our products are available on multiple chains, we partnered with LI.FI to give you the easiest bridging experience in moving your assets.
                  </p>
                </div>
                <LiFiWidget config={widgetConfig} />


              </Flex>
            </div></div>
        </div>
        {account &&
          (chainId === MAINNET.chainId || chainId === POLYGON.chainId) ? (
          <>
            <div className="mb-10">
              <dl className="mt-6 space-y-6 divide-y border-2 rounded-xl m-auto justify-center bg-theme-oldlace border-theme-navy">
                <Disclosure
                  as="div"
                  className="pt-6 shadow-md shadow-theme-black "
                >
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-theme-navy">
                          <span className="ml-5 font-semibold">
                            <div className="relative mb-4">
                              <div className="relative flex justify-start">
                                <span className="pr-3 bg-transparent font-morion text-lg font-semibold text-theme-navy">
                                  Transaction History
                                </span>
                              </div>
                            </div>
                          </span>

                          <span className="mr-6 h-7 text-theme-navy flex items-center">
                            <span className="mr-5">
                              <span className="inline-flex items-center px-3 py-1 rounded-xl text-sm font-semibold text-theme-navy border-2 border-theme-navy">
                                {renderCsvDownloadButton}
                              </span>
                            </span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform "
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <TransactionHistoryTable
                          items={historyItems.slice(0, 20)}
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </dl>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </Page>
  );
};

export default Dashboard;
