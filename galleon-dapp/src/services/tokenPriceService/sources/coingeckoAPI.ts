import { ARBITRUM, OPTIMISM, POLYGON } from "constants/chains";
import { ETH } from "constants/tokens";
import { fetchDataAsync } from "../../fetchService/fetchService";

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://pro-api.coingecko.com/api/v3"
    : "https://api.coingecko.com/api/v3";
const COINS_CONTROLLER = `${HOST}/coins`;
const SIMPLE_PRICE_CONTROLLER = `${HOST}/simple/price`;
const SIMPLE_TOKENPRICE_CONTROLLER = `${HOST}/simple/token_price`;

const KEY =
  process.env.NODE_ENV === "production"
    ? `&x_cg_pro_api_KEY=${process.env.REACT_APP_COINGECKO_PRO_API_KEY ?? ""}`
    : "";

const getAssetPlatform = (chainId: number) => {
  switch (chainId) {
    case POLYGON.chainId:
      return "polygon-pos";
    case OPTIMISM.chainId:
      return "optimistic-ethereum";
    case ARBITRUM.chainId:
      return "arbitrum-one";
    default:
      return "ethereum";
  }
};

const fetchLatestTokenDataAsync = async (
  id: string,
  correlationId?: string
) => {
  const coingeckoLatestTokenDataUrl =
    COINS_CONTROLLER +
    `/${id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  return fetchDataAsync(
    "FETCH_COINGECKO_LATEST_TOKEN_DATA",
    coingeckoLatestTokenDataUrl,
    null,
    correlationId
  ).then((result) => {
    return result.success ? result.response.data : null;
  });
};

const fetchMaxTokenDataAsync = async (
  id: string,
  baseCurrency = "usd",
  correlationId?: string
) => {
  const coingeckoMaxTokenDataUrl = `${COINS_CONTROLLER}/${id}/market_chart?vs_currency=${baseCurrency}&days=max&interval=daily${KEY}`;
  return await fetchDataAsync<any>(
    "FETCH_COINGECKO_MAX_TOKEN_DATA",
    coingeckoMaxTokenDataUrl,
    null,
    correlationId
  ).then((result) => {
    return result.success ? result.response.data : null;
  });
};

const fetchHourlyTokenDataAsync = async (
  id: string,
  baseCurrency = "usd",
  correlationId?: string
) => {
  const coingeckoMaxTokenDataUrl = `${COINS_CONTROLLER}/${id}/market_chart?vs_currency=${baseCurrency}&days=90${KEY}`;
  return await fetchDataAsync<any>(
    "FETCH_COINGECKO_MAX_TOKEN_DATA",
    coingeckoMaxTokenDataUrl,
    null,
    correlationId
  ).then((result) => {
    return result.success ? result.response.data : null;
  });
};

const fetchSimplePriceAsync = async (
  address: string,
  chainId: number,
  baseCurrency = "usd",
  correlationId?: string
) => {
  const reqUrl =
    address === ETH.address
      ? SIMPLE_PRICE_CONTROLLER +
        `/?ids=ethereum&vs_currencies=${baseCurrency}${KEY}`
      : SIMPLE_TOKENPRICE_CONTROLLER +
        `/${getAssetPlatform(
          chainId
        )}/?contract_addresses=${address}&vs_currencies=${baseCurrency}${KEY}`;
  return await fetchDataAsync<any>(
    "FETCH_COINGECKO_SIMPLE_PRICE",
    reqUrl,
    null,
    correlationId
  ).then((result) => {
    return result.success ? result.response.data : null;
  });
};

export interface LatestTokenMarketData {
  price: number;
  marketCap: number;
  volume: number;
}
export interface HistoricalTokenMarketData {
  hourlyPrices: number[][];
  marketcaps: number[][];
  volumes: number[][];
}

const getLatestTokenMarketDataAsync = async (
  tokenId: string,
  currencyCode: string = "usd", //TODO make enum or const
  correlationId?: string
): Promise<LatestTokenMarketData> => {
  return fetchLatestTokenDataAsync(tokenId, correlationId).then((tokenData) => {
    return {
      price: tokenData?.market_data?.current_price?.[currencyCode] ?? 0,
      marketCap: tokenData?.market_data?.market_cap?.[currencyCode] ?? 0,
      volume: tokenData?.market_data?.total_volume?.[currencyCode] ?? 0,
    };
  });
};

const getHistoricalTokenMarketDataAsync = async (
  id: string,
  baseCurrency = "usd",
  correlationId?: string
): Promise<HistoricalTokenMarketData> => {
  //TODO: Enforce typing
  return Promise.all([
    fetchMaxTokenDataAsync(id, baseCurrency, correlationId),
    fetchHourlyTokenDataAsync(id, baseCurrency, correlationId),
  ]).then((data) => {
    if (!data[0] || ![data[1]]) {
      return { hourlyPrices: [], marketcaps: [], volumes: [] };
    }
    return {
      hourlyPrices: data[1].prices,
      marketcaps: data[0].market_caps,
      volumes: data[0].total_volumes,
    };
  });
};

const getCoingeckoTokenPriceAsync = async (
  address: string,
  chainId: number,
  baseCurrency = "usd",
  correlationId?: string
): Promise<number> => {
  return fetchSimplePriceAsync(
    address,
    chainId,
    baseCurrency,
    correlationId
  ).then((data) => {
    if (data) {
      if (address === ETH.address && !data["ethereum"]) {
        return data["ethereum"][baseCurrency];
      }
      if (data[address.toLowerCase()]) {
        return data[address.toLowerCase()][baseCurrency];
      }
    }
    return 0;
  });
};

export const coingeckoAPI = {
  getLatestTokenMarketDataAsync,
  getHistoricalTokenMarketDataAsync,
  getCoingeckoTokenPriceAsync,
};
