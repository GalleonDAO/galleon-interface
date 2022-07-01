import { GetFundsData } from "./data/getFunds";
import { fetchData } from "../../fetchService/fetchService";
import { GetFundHistoricalsData } from "./data/getFundHistoricals";

const HOST = "https://api.tokensets.com/v2";
const FUNDS_CONTROLLER = `${HOST}/funds`;
const FUND_HISTORICALS_CONTROLLER = `${HOST}/fund_historicals`;
const INTERVAL = "day";

//Not exported in favour of returning formatted objects
const fetchFunds = async (
  tokenId: string,
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

//Currently unused but added for future
const fetchFundHistoricals = async (
  tokenId: string,
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

//TODO: if no corrID generate one here
const getTokenPrices = async (
  tokenId: string,
  correlationId?: string
): Promise<{
  price: number;
  symbol: string;
  marketCap: number;
}> => {
  return fetchFunds(tokenId, correlationId).then((fundsData) => {
    if (!fundsData) {
      //TODO Add Error handling
      return {
        price: 0,
        symbol: "unavailable",
        marketCap: 0,
      };
    }
    return {
      //TODO: Log info on missing data?
      price: currencyToNumber(fundsData.fund.price_usd),
      symbol: fundsData.fund.symbol ?? "unavailable",
      marketCap: currencyToNumber(fundsData.fund.market_cap),
    };
  });
};

const currencyToNumber = (currency?: string): number => {
  return currency ? (Number(currency.replace(/[^0-9.-]+/g, "")) as number) : 0;
};

export const tokensetsAPI = {
  getTokenPrices,
  fetchFundHistoricals,
};
