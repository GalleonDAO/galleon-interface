import { useEffect, useState } from "react";

import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import duneLogo from "assets/dune.png";
import QuickTrade from "components/dashboard/QuickTrade";
import Page from "components/Page";
import { getPriceChartData } from "components/product/PriceChartData";
import { DoubloonToken, Token } from "constants/tokens";
import {
  TokenMarketDataValues,
  useMarketData,
} from "providers/MarketData/MarketDataProvider";
import { SetComponent } from "providers/SetComponents/SetComponentsProvider";
import { displayFromWei } from "utils";
import {
  getFormattedChartPriceChanges,
  getPricesChanges,
} from "utils/priceChange";
import { getTokenSupply } from "utils/setjsApi";

import MarketChart, { PriceChartRangeOption } from "./MarketChart";
import ProductComponentsTable from "./ProductComponentsTable";
import ProductHeader from "./ProductHeader";
import ProductPageSectionHeader from "./ProductPageSectionHeader";
import ProductStats, { ProductStat } from "./ProductStats";

function getStatsForToken(
  tokenData: Token,
  marketData: TokenMarketDataValues,
  currentSupply: number
): ProductStat[] {
  const dailyPriceRange = PriceChartRangeOption.DAILY_PRICE_RANGE;
  const hourlyDataInterval = 24;

  let formatter = Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    notation: "compact",
  });

  let supplyFormatter = Intl.NumberFormat("en", { maximumFractionDigits: 2 });

  const marketCap =
    marketData.marketcaps
      ?.slice(-dailyPriceRange * hourlyDataInterval)
      ?.slice(-1)[0]
      ?.slice(-1)[0] ?? 0;
  const marketCapFormatted = formatter.format(marketCap);

  const supplyFormatted = supplyFormatter.format(currentSupply);

  const volume =
    marketData.volumes
      ?.slice(-dailyPriceRange * hourlyDataInterval)
      ?.slice(-1)[0]
      ?.slice(-1)[0] ?? 0;
  const volumeFormatted = formatter.format(volume);

  return [
    { title: "Market Cap", value: marketCapFormatted },
    { title: "Volume", value: volumeFormatted },
    { title: "Current Supply", value: supplyFormatted },
    { title: "Streaming Fee", value: tokenData.fees?.streamingFee ?? "n/a" },
    { title: "Mint Fee", value: tokenData.fees?.mintFee ?? "n/a" },
    { title: "Redeem Fee", value: tokenData.fees?.redeemFee ?? "n/a" },
  ];
}

const ProductPage = (props: {
  tokenData: Token;
  marketData: TokenMarketDataValues;
  components: SetComponent[];
  isLeveragedToken?: boolean;
  apy?: string;
  hasDashboard?: boolean;
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { marketData, tokenData } = props;

  const { chainId, library } = useEthers();
  const { selectLatestMarketData } = useMarketData();

  const [currentTokenSupply, setCurrentTokenSupply] = useState(0);

  useEffect(() => {
    const tokenAddress = tokenData.address;

    if (
      tokenAddress === undefined ||
      library === undefined ||
      chainId === undefined
    ) {
      return;
    }

    const fetchSupply = async () => {
      try {
        const setDetails = await getTokenSupply(
          library,
          [tokenAddress],
          chainId
        );
        if (setDetails.length < 1) return;
        const supply = parseFloat(
          displayFromWei(setDetails[0].totalSupply) ?? "0"
        );
        setCurrentTokenSupply(supply);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSupply();
  }, [chainId, library, tokenData]);

  const priceChartData = getPriceChartData([marketData]);

  const price = `$${selectLatestMarketData(marketData.hourlyPrices).toFixed(
    2
  )}`;
  const priceChanges = getPricesChanges(marketData.hourlyPrices ?? []);
  const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges);

  const stats = getStatsForToken(tokenData, marketData, currentTokenSupply);
  const chartWidth = window.outerWidth < 400 ? window.outerWidth : 580;
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  return (
    <Page>
      <Flex direction="column" w={["100%"]} m="0 auto">
        <Flex direction="column">
          <Box mb={["16px", "48px"]}>
            <ProductHeader
              isMobile={isMobile ?? false}
              tokenData={props.tokenData}
            />
          </Box>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-2xl shadow-md shadow-theme-black  divide-y divide-theme-navy">
              <div className="w-full items-center justify-between p-6 space-x-6">
                <MarketChart
                  marketData={priceChartData}
                  prices={[price]}
                  priceChanges={priceChangesFormatted}
                  options={{
                    width: chartWidth,
                    height: chartHeight,
                    hideYAxis: false,
                  }}
                  apy={props.apy}
                  isDoubloon={false}
                />
              </div>
            </div>
            <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-2xl shadow-md shadow-theme-black  divide-y divide-theme-navy">
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <Flex direction="column" grow={1} flexBasis="0">
                  <QuickTrade isNarrowVersion={false} singleToken={tokenData}>
                    <div className=" px-2 pb-4 border-b border-theme-navy sm:px-4">
                      <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
                        Trade the ETH Max Yield Index
                      </h3>
                      <p className="mt-1 text-md text-theme-navy">
                        Gain exposure to one of the highest, decentralised and
                        fully composable leveraged ETH Yield in DeFi with
                        ETHMAXY.
                      </p>
                    </div>
                  </QuickTrade>
                </Flex>
                )
              </div>
            </div>
          </div>
          {props.hasDashboard && (
            <div className="mt-10">
              <div className="max-w-7xl mx-auto ">
                <div className="p-2 border-2 border-theme-navy rounded-2xl bg-theme-oldlace shadow-md shadow-theme-black sm:p-3">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="flex p-2 rounded-2xl bg-theme-champagne">
                        <Image
                          src={duneLogo}
                          alt={"dune logo"}
                          w="32px"
                          h="32px"
                        />
                      </span>
                      <p className="ml-3 font-medium text-lg text-theme-navy truncate">
                        <span className="md:hidden">
                          {props.tokenData.name} Analytics.
                        </span>
                        <span className="hidden md:inline">
                          {props.tokenData.name} Analytics. Check our Dune
                          Dashboard for on-chain product insights.
                        </span>
                      </p>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <a
                        target={"_blank"}
                        href={props.tokenData.dashboard}
                        className="flex items-center justify-center px-4 py-2  rounded-2xl shadow-sm font-medium text-lg text-theme-navy bg-theme-champagne border-2 border-theme-navy hover:opacity-70" rel="noreferrer"
                      >
                        Dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 mt-10 gap-6 sm:grid-cols-1 lg:grid-cols-1">
            <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-2xl shadow-md shadow-theme-black  divide-y divide-theme-navy">
              <div className="w-full items-center justify-between p-6 space-x-1">
                <ProductPageSectionHeader title="Stats" topMargin="20px" />
                <ProductStats stats={stats} />
                {props.tokenData.symbol !== DoubloonToken.symbol && (
                  <>
                    <ProductPageSectionHeader title="Allocations" />
                    <ProductComponentsTable
                      components={props.components}
                      tokenData={props.tokenData}
                      isLeveragedToken={props.isLeveragedToken}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Flex>
      </Flex>
    </Page>
  );
};

export default ProductPage;
