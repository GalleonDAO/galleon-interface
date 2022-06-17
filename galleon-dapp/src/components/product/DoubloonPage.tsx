import { useState } from "react";

import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

import Page from "components/Page";
import { getPriceChartData } from "components/product/PriceChartData";
import { DoubloonToken, Token } from "constants/tokens";
import {
  TokenMarketDataValues,
  useMarketData,
} from "providers/MarketData/MarketDataProvider";
import {
  getFormattedChartPriceChanges,
  getPricesChanges,
} from "utils/priceChange";
import xtokenLogo from "assets/xtoken.png";
import MarketChart, { PriceChartRangeOption } from "./MarketChart";
import ProductComponentsTable from "./ProductComponentsTable";
import ProductHeader from "./ProductHeader";
import ProductPageSectionHeader from "./ProductPageSectionHeader";
import ProductStats, { ProductStat } from "./ProductStats";
import { SwapWidget, Theme } from "@uniswap/widgets/dist/index.js";
import "@uniswap/widgets/dist/fonts.css";
import { getTokenList } from "utils/tokenlists";
import { colors } from "styles/colors";
import { useNetwork } from "providers/Network/NetworkProvider";

import { ARBITRUM } from "constants/chains";

const jsonRpcEndpoint =
  "https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY ?? "";

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
    // { title: "Current Supply", value: supplyFormatted },
    // { title: "Streaming Fee", value: tokenData.fees?.streamingFee ?? "n/a" },
    // { title: "Mint Fee", value: tokenData.fees?.mintFee ?? "n/a" },
    // { title: "Redeem Fee", value: tokenData.fees?.redeemFee ?? "n/a" },
  ];
}

const DoubloonPage = (props: {
  tokenData: Token;
  marketData: TokenMarketDataValues;
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { marketData, tokenData } = props;
  const {
    state: { network },
    actions: { changeNetwork },
  } = useNetwork();
  const chainId = network.chainId;
  const { library } = useEthers();
  const { selectLatestMarketData } = useMarketData();
  const [currentTokenSupply, setCurrentTokenSupply] = useState(0);

  const priceChartData = getPriceChartData([marketData]);

  const price = `$${selectLatestMarketData(marketData.hourlyPrices).toFixed(
    2
  )}`;
  const priceChanges = getPricesChanges(marketData.hourlyPrices ?? []);
  const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges);

  const stats = getStatsForToken(tokenData, marketData, currentTokenSupply);

  const chartWidth = window.outerWidth < 400 ? window.outerWidth : 580;
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  const theme: Theme = {
    primary: colors.themeBlack,
    secondary: colors.themeBlack,
    interactive: colors.themeWhite,
    container: colors.themeOldlace,
    module: colors.themeChampagne,
    accent: colors.themeNavy,
    outline: colors.themeBlack,
    dialog: colors.themeWhite,
    fontFamily: "Inter",
    borderRadius: 0.8,
  };

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
          <div className=" pb-2 sm:pb-5">
            <div className="max-w-7xl mx-auto ">
              <div className="p-2 border-2 border-theme-navy rounded-2xl bg-theme-oldlace shadow-md shadow-theme-black sm:p-3">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="w-0 flex-1 flex items-center">
                    <span
                      className="flex p-2 rounded-2xl"
                      style={{ background: "#6E27E4" }}
                    >
                      <Image src={xtokenLogo} alt={"xtoken logo"} />
                    </span>
                    <p className="ml-3 font-medium text-lg text-theme-navy truncate">
                      <span className="md:hidden">
                        Liquidity Rewards! Become a $DBL LP on xTokenTerminal.
                      </span>
                      <span className="hidden md:inline">
                        Liquidity Rewards! Become a $DBL LP on xTokenTerminal
                        and earn your share of weekly rewards.
                      </span>
                    </p>
                  </div>
                  <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                    <a
                      target={"_blank"}
                      href="https://app.xtokenterminal.io/mining/pools/arbitrum/0x7CC778c9b8fB55Bb874D0EaEf0751ff465f80498"
                      className="flex items-center justify-center px-4 py-2  rounded-2xl shadow-sm  font-medium text-lg text-theme-navy bg-theme-champagne border-2 border-theme-navy hover:opacity-70"
                      rel="noreferrer"
                    >
                      Go to xTokenTerminal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  apy={null}
                  isDoubloon={true}
                />
              </div>
            </div>
            <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-2xl shadow-md shadow-theme-black  divide-y divide-theme-navy">
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <Flex direction="column" grow={1} flexBasis="0">
                  <div className=" px-2 pb-4  border-b border-theme-navy  mb-4 sm:px-4">
                    <h3 className="text-2xl font-morion leading-6 font-semibold text-theme-navy">
                      Invest in Galleon & Govern
                    </h3>
                    <p className="mt-1 text-md text-theme-navy">
                      Through our direct Uniswap integration you can gain
                      exposure to DBL and help shape the future of Galleon and
                      the DAOs products.
                    </p>
                  </div>
                  {chainId !== ARBITRUM.chainId ? (
                    <>
                      <button
                        onClick={() => changeNetwork(ARBITRUM.chainId)}
                        className="m-auto justify-center text-center block mt-4 bg-theme-sky shadow-sm shadow-theme-black text-white  py-1.5 px-4 border-2 border-theme-sky rounded-2xl text-base font-medium  hover:bg-opacity-75"
                      >
                        Switch to Arbitrum
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
                  ) : (
                    <SwapWidget
                      provider={library}
                      jsonRpcEndpoint={jsonRpcEndpoint}
                      theme={theme}
                      tokenList={getTokenList(chainId)}
                      defaultInputTokenAddress={"NATIVE"}
                      defaultOutputTokenAddress={
                        "0xd3f1da62cafb7e7bc6531ff1cef6f414291f03d3"
                      }
                      width={540}
                    />
                  )}
                </Flex>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-10 gap-6 sm:grid-cols-1 lg:grid-cols-1">
            <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy rounded-2xl shadow-md shadow-theme-black  divide-y divide-theme-navy">
              <div className="w-full items-center justify-between p-6 space-x-6">
                <ProductPageSectionHeader title="Stats" topMargin="20px" />
                <ProductStats stats={stats} />
                {props.tokenData.symbol !== DoubloonToken.symbol && (
                  <>
                    <ProductPageSectionHeader title="Allocations" />
                    <ProductComponentsTable tokenData={props.tokenData} />
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

export default DoubloonPage;
