import { Token } from "constants/tokens";
import {
  coingeckoAPI,
  HistoricalTokenMarketData,
} from "./sources/coingeckoAPI";
import { tokensetsAPI } from "./sources/tokensetsAPI";
import { loggingInstance } from "hooks/useLogging";
const { logMessage, LOG_SEVERITY } = loggingInstance();

const DEFAULT_CURRENCY = "usd";

export const getTokenMarketDataAsync = async (
  token: Token,
  correlationId?: string
): Promise<HistoricalTokenMarketData> => {
  return coingeckoAPI
    .getHistoricalTokenMarketDataAsync(
      token.coingeckoId,
      DEFAULT_CURRENCY,
      correlationId
    )
    .catch<HistoricalTokenMarketData>((err) => {
      logMessage(
        LOG_SEVERITY.ERROR,
        err.stack,
        `Error Fetching Token Market Data, inner error: ${err.message}`,
        correlationId,
        getTokenMarketDataAsync.name
      );
      return {
        hourlyPrices: [],
        marketcaps: [],
        volumes: [],
      };
    });
};

const getTokenMarketCapAsync = async (
  token: Token,
  correlationId?: string
): Promise<number> => {
  return tokensetsAPI
    .getTokenPricesAsync(token.tokensetsId, correlationId)
    .then((data) => {
      return data.marketCap;
    })
    .catch<number>((err) => {
      logMessage(
        LOG_SEVERITY.ERROR,
        err.stack,
        `Error Fetching Token Market Cap, inner error: ${err.message}`,
        correlationId,
        getTokenMarketCapAsync.name
      );
      return 0;
    });
};

export const getValidatedMarketCapAsync = async (
  token: Token,
  marketCaps: number[],
  correlationId?: string
): Promise<number[]> => {
  if (marketCaps && marketCaps?.[marketCaps.length - 1] !== 0) {
    return marketCaps;
  }

  const latestMC = await getTokenMarketCapAsync(token, correlationId);
  if (!marketCaps) {
    return [latestMC];
  }

  marketCaps?.[marketCaps.length - 1]
    ? (marketCaps[marketCaps.length - 1] = latestMC)
    : (marketCaps[0] = latestMC);
  return marketCaps;
};
