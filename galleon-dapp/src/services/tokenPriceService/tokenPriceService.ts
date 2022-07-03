import { v4 as guid } from "uuid";

import { Token } from "constants/tokens";
import {
  coingeckoAPI,
  HistoricalTokenMarketData,
} from "./sources/coingeckoAPI";
import { tokensetsAPI } from "./sources/tokensetsAPI";
import { loggingInstance } from "hooks/useLogging";
const { captureDurationAsync, logTimer, logMessage, LOG_SEVERITY } =
  loggingInstance();

const DEFAULT_CURRENCY = "usd";

export const getTokenMarketDataAsync = async (token: Token) => {
  const correlationId = guid();
  const timedResponse = await captureDurationAsync<HistoricalTokenMarketData>(
    async (): Promise<HistoricalTokenMarketData> => {
      coingeckoAPI
        .getHistoricalTokenMarketDataAsync(
          token.coingeckoId,
          DEFAULT_CURRENCY,
          correlationId
        )
        .then((result) => {
          if (!result.marketcaps) {
            tokensetsAPI
              .getTokenPricesAsync(token.tokensetsId, correlationId)
              .then((data) => {
                result.marketcaps[0] = data.marketCap;
              });
          }
          return result;
        })
        .catch((err) => {
          logMessage(
            LOG_SEVERITY.ERROR,
            err.stack,
            `Error Fetching Token Market Data, inner error: ${err.message}`,
            correlationId,
            getTokenMarketDataAsync.name
          );
        });
      logTimer("GET_TOKEN_MARKET_DATA", timedResponse.duration);
      return timedResponse.result;
    }
  );
};
