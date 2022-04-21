import { useEffect, useRef, useState } from "react";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
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
import {
  TokenMarketDataValues,
  useMarketData,
} from "providers/MarketData/MarketDataProvider";
import { getTransactionHistory } from "utils/alchemyApi";
import { exportCsv } from "utils/exportToCsv";
import { getFormattedChartPriceChanges } from "utils/priceChange";

import { getPieChartPositions } from "./DashboardData";
import { MAINNET, POLYGON } from "constants/chains";
import { classNames } from "utils";

const Dashboard = () => {
  const { ethmaxy } = useMarketData();
  const { userBalances, totalBalanceInUSD, totalHourlyPrices, priceChanges } =
    useUserMarketData();
  const { account, chainId } = useEthers();
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

  const balancesPieChart = userBalances.map((userTokenBalance) => ({
    title: userTokenBalance.symbol,
    value: userTokenBalance.balance,
  }));
  const pieChartPositions = getPieChartPositions(balancesPieChart);

  // const top4Positions = pieChartPositions
  //   .filter((pos) => pos.title !== 'OTHERS')
  //   .flatMap((pos) => pos.title)
  //   .slice(0, 4)

  // const allocationsChartData: TokenMarketDataValues[] = top4Positions
  //   .map((positionTitle) => {
  //     switch (positionTitle) {
  //       case 'DPI':
  //         return dpi
  //       case 'MVI':
  //         return mvi
  //       case 'DATA':
  //         return data
  //       case 'BED':
  //         return bed
  //       case 'GMI':
  //         return gmi
  //       case 'ETH2x-FLI':
  //         return ethfli
  //       case 'ETH2x-FLI-P':
  //         return ethflip
  //       case 'BTC2x-FLI':
  //         return btcfli
  //       default:
  //         return undefined
  //     }
  //   })
  //   // Remove undefined
  //   .filter((tokenData): tokenData is TokenMarketDataValues => !!tokenData)

  // const onChangeChartType = (type: number) => {
  //   switch (type) {
  //     case 0: {
  //       const balanceData = getPriceChartData([
  //         { hourlyPrices: totalHourlyPrices },
  //       ])
  //       setPriceChartData(balanceData)
  //       break
  //     }
  //     case 1: {
  //       const allocationsData = getPriceChartData(allocationsChartData)
  //       setPriceChartData(allocationsData)
  //       break
  //     }
  //   }
  // }

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

  // const formattedPrice = `$${totalBalanceInUSD.toFixed(2).toString()}`
  // const prices = [formattedPrice]
  // const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges)

  return (
    <Page>
      <>
        <PageTitle title="Dashboard" subtitle="" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div className="col-span-1 bg-theme-champagne border-2 border-theme-navy rounded-md shadow divide-y divide-gray-200">
            <div className="w-full items-center justify-between p-6 space-x-6">
              <AllocationChart positions={pieChartPositions} />
            </div>
          </div>
          <div className="col-span-1 bg-theme-champagne border-2 border-theme-navy rounded-md shadow divide-y divide-gray-200">
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              {chainId === MAINNET.chainId ? (
                <Flex direction="column" grow={1} flexBasis="0">
                  <QuickTrade />
                </Flex>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {chainId === MAINNET.chainId || chainId === POLYGON.chainId ? (
          <>
            <div className="">
              <dl className="mt-6 space-y-6 divide-y border-2 rounded-md m-auto justify-center border-theme-black">
                <Disclosure as="div" className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="ml-5 font-semibold">
                            <SectionTitle title="Transaction History" />
                          </span>

                          <span className="mr-6 h-7 text-theme-black flex items-center">
                            <span className="mr-5">
                              <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-theme-navy bg-theme-navy border-2 border-theme-nav">
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

// <MarketChart
//   marketData={priceChartData}
//   prices={prices}
//   priceChanges={priceChangesFormatted}
//   options={{
//     width,
//     height: chartHeight,
//     hideYAxis: false,
//   }}
//   customSelector={<ChartTypeSelector onChange={onChangeChartType} />}
// />

export default Dashboard;
