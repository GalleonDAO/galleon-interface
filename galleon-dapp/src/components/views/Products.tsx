import { Box } from "@chakra-ui/react";

import Page from "components/Page";
import PageTitle from "components/PageTitle";
import ProductsTable from "components/products/ProductsTable";
import Indices, { DoubloonToken, Token } from "constants/tokens";
import {
  TokenContextKeys,
  useMarketData,
} from "providers/MarketData/MarketDataProvider";

/*  Disabling for 1Y time period because it saves
  us a lot of Coingecko API calls.
  To enable, add Max History call in coingeckoApi.ts
*/
export interface ProductsTableProduct extends Token {
  performance: {
    "1D"?: number;
    "1W"?: number;
    "1M"?: number;
    "3M"?: number;
    // '1Y'?: number
  };
}

export const PriceChangeIntervals: [
  keyof ProductsTableProduct["performance"],
  number
][] = [
  ["1D", 1],
  ["1W", 7],
  ["1M", 30],
  ["3M", 90],
  // ['1Y', 365],
];

type PriceChangesProps = {
  daysOfComparison: number;
  hourlyPrices?: number[][];
  prices?: number[][];
};

export const calculatePriceChange = ({
  daysOfComparison,
  hourlyPrices,
  prices,
}: PriceChangesProps) => {
  if (daysOfComparison <= 90) {
    const startPrice = hourlyPrices
      ? hourlyPrices.slice(-24 * daysOfComparison)[0][1]
      : 1;
    const hourlyPricesLength = hourlyPrices ? hourlyPrices.length - 1 : 0;
    const latestPrice = hourlyPrices ? hourlyPrices[hourlyPricesLength][1] : 1;
    return ((latestPrice - startPrice) / startPrice) * 100;
  } else if (prices && prices?.length > daysOfComparison) {
    const startPrice = prices[prices.length - daysOfComparison][1];
    const latestPrice = prices[prices.length - 1][1];
    return ((latestPrice - startPrice) / startPrice) * 100;
  }
  return 0;
};

const appendProductPerformance = ({
  product,
  hourlyPrices,
  prices,
}: {
  product: Token;
  hourlyPrices?: number[][];
  prices?: number[][];
}): ProductsTableProduct => {
  return PriceChangeIntervals.reduce(
    (product, interval) => {
      const [dateString, daysOfComparison] = interval;
      const priceChange = calculatePriceChange({
        daysOfComparison,
        hourlyPrices,
        prices,
      });

      product.performance = {
        ...product.performance,
        [dateString]: priceChange,
      };

      return product;
    },
    { ...product, performance: {} }
  );
};

const Products = () => {
  const marketData = useMarketData();

  const getTokenMarketData = (tokenContextKey?: TokenContextKeys) => {
    if (tokenContextKey && tokenContextKey !== "selectLatestMarketData") {
      return {
        hourlyPrices: marketData[tokenContextKey]?.hourlyPrices,
        prices: marketData[tokenContextKey]?.prices,
      };
    }
  };

  const productsWithMarketData = Indices.filter(
    (product) => product.symbol !== DoubloonToken.symbol
  ).map((product) => {
    return appendProductPerformance({
      product,
      ...getTokenMarketData(product.tokenContextKey),
    });
  });

  return (
    <Page>
      <Box w="100%">
        <PageTitle
          title="Explore Flagship Products"
          subtitle="An innovative way to get on-chain exposure to thematic, yield & leverage investment products"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
          <div className="col-span-1 bg-theme-pan-champagne bg-[url('./assets/Frame.png')]  bg-no-repeat bg-cover bg-center border-2 border-theme-navy shadow-md shadow-theme-black  rounded-xl divide-y divide-theme-black">
            <div className="w-full items-center justify-between p-6 space-x-6">
              <ProductsTable products={productsWithMarketData} />
            </div>
          </div>
        </div>
      </Box>
    </Page>
  );
};

export default Products;
