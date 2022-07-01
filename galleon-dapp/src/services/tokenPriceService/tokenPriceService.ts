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

export const getTokenMarketDataAsync = async (token: Token) => {
  const correlationId = guid();
  const timedResponse = await captureDurationAsync<HistoricalTokenMarketData>(
    async (): Promise<HistoricalTokenMarketData> => {
      coingeckoAPI
        .getHistoricalTokenMarketData(token.coingeckoId, "usd", correlationId)
        .then((result) => {
          if (!result.marketcaps) {
            tokensetsAPI
              .getTokenPrices(token.tokensetsId, correlationId)
              .then((data) => {
                result.marketcaps[0] = data.marketCap;
              });
          }
          return result;
        })
        .catch((err) => {
          //TODO: Log Error
        });
      logTimer("GET_TOKEN_MARKET_DATA", timedResponse.duration);
      return timedResponse.result;
    }
  );
};
