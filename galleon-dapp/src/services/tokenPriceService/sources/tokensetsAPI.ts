import { GetFundsData } from "./data/getFunds";
import { fetchData } from "../../fetchService/fetchService";
import { GetFundHistoricalsData } from "./data/getFundHistoricals";
import { result } from "lodash";

const HOST = "https://api.tokensets.com/v2";
const FUNDS_CONTROLLER = `${HOST}/funds`;
const FUND_HISTORICALS_CONTROLLER = `${HOST}/fund_historicals`;
const INTERVAL = "day";

export enum TokenSetsTokenId {
  BYE = "bye",
  ETHMAXY = "ethmaxy",
}

//Not exported in favour of returning formatted objects
const fetchFunds = async (
  tokenId: TokenSetsTokenId,
  correlationId?: string
): Promise<GetFundsData> => {
  return fetchData<GetFundsData>(
    "FETCH_TOKENSETS_FUNDS",
    `${FUNDS_CONTROLLER}/${tokenId}`,
    null,
    correlationId
  ).then((result) => {
    return result.success ? result.response.data : null;
  });
};

//TODO: if no corrID generate one here
export const getTokenPrices = async (
  tokenId: TokenSetsTokenId,
  correlationId?: string
): Promise<void | {
  price: string;
  symbol: string;
  marketCap: string;
}> => {
  return fetchFunds(tokenId, correlationId).then((fundsData) => {
    if (!fundsData) {
      //TODO Add Error handling
      return {
        price: "unavailable",
        symbol: "unavailable",
        marketCap: "unavailable",
      };
    }
    return {
      //TODO: Log info on missing data?
      price: fundsData.fund.price_usd ?? "unavailable",
      symbol: fundsData.fund.symbol ?? "unavailable",
      marketCap: fundsData.fund.market_cap ?? "unavailable",
    };
  });
};

//Currently unused but added for future
export const fetchFundHistoricals = async (
  tokenId: TokenSetsTokenId,
  correlationId: string
): Promise<GetFundHistoricalsData> => {
  return fetchData<GetFundHistoricalsData>(
    "FETCH_TOKENSETS_FUND_HISTORICALS",
    `${FUND_HISTORICALS_CONTROLLER}/${tokenId}?interval=${INTERVAL}&currency=usd`,
    null,
    correlationId
  ).then((result) => {
    return result.success ? result.response.data : null;
  });
};
