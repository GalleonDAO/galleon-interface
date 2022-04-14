import { BigNumber } from "@ethersproject/bignumber";

import { PriceChartRangeOption } from "components/product/MarketChart";
import { useBalance } from "hooks/useBalance";
import {
  TokenMarketDataValues,
  useMarketData,
} from "providers/MarketData/MarketDataProvider";
import { displayFromWei } from "utils";
import { getPricesChanges } from "utils/priceChange";

interface UserTokenBalance {
  symbol: string;
  balance: BigNumber;
  marketData: TokenMarketDataValues;
}

function getTokenMarketDataValuesOrNull(
  symbol: string,
  marketDataValues: TokenMarketDataValues | undefined,
  balance: BigNumber | undefined
): UserTokenBalance | undefined {
  if (
    marketDataValues === undefined ||
    marketDataValues.hourlyPrices === undefined
  ) {
    return undefined;
  }

  if (balance === undefined || balance.isZero() || balance.isNegative()) {
    balance = BigNumber.from(0);
  }

  const convertedBalance = displayFromWei(balance);
  const balanceNum = parseFloat(convertedBalance ?? "0");
  const hourlyData = marketDataValues.hourlyPrices.map(([date, price]) => [
    date,
    price * balanceNum,
  ]);

  return { symbol, balance, marketData: { hourlyPrices: hourlyData } };
}

function getTotalHourlyPrices(marketData: UserTokenBalance[]) {
  const hourlyPricesOnly = marketData.map(
    (data) => data.marketData.hourlyPrices ?? []
  );
  let totalHourlyPrices: number[][] = [];
  if (hourlyPricesOnly.length > 0) {
    totalHourlyPrices = hourlyPricesOnly[0];
    const length = hourlyPricesOnly[0].length;
    for (let i = 1; i < hourlyPricesOnly.length; i += 1) {
      for (let k = 0; k < length; k += 1) {
        if (k >= hourlyPricesOnly[i].length) {
          continue;
        }
        totalHourlyPrices[k][1] += hourlyPricesOnly[i][k][1];
      }
    }
  }
  return totalHourlyPrices;
}

export const useUserMarketData = () => {
  const {
    balances: { ethBalance, ethmaxyBalance, doubloonBalance },
  } = useBalance();
  const { eth, ethmaxy, doubloon } = useMarketData();

  const balances = [
    { title: "ETH", value: ethBalance },
    { title: "ETHMAXY", value: ethmaxyBalance },
    { title: "DBL", value: doubloonBalance },
  ];

  const userBalances: UserTokenBalance[] = balances
    .map((pos) => {
      switch (pos.title) {
        case "ETH":
          return getTokenMarketDataValuesOrNull(pos.title, eth, pos.value);
        case "ETHMAXY":
          return getTokenMarketDataValuesOrNull(pos.title, ethmaxy, pos.value);
        case "DBL":
          return getTokenMarketDataValuesOrNull(pos.title, doubloon, pos.value);
        default:
          return undefined;
      }
    })
    // Remove undefined
    .filter((tokenData): tokenData is UserTokenBalance => !!tokenData);

  const totalHourlyPrices = getTotalHourlyPrices(userBalances);

  const hourlyDataInterval = 24;
  var totalBalanceInUSD =
    totalHourlyPrices
      .slice(-PriceChartRangeOption.DAILY_PRICE_RANGE * hourlyDataInterval)
      ?.slice(-1)[0]
      ?.slice(-1)[0] ?? 0;

  const priceChanges = getPricesChanges(totalHourlyPrices);

  return { userBalances, totalBalanceInUSD, totalHourlyPrices, priceChanges };
};
