import { POLYGON } from "constants/chains";
import { ETH } from "constants/tokens";

const baseURL = "https://api.coingecko.com/api/v3";
const requestHeaders: HeadersInit = new Headers();

export const fetchHistoricalTokenMarketData = async (
  id: string,
  baseCurrency = "usd"
) => {
  requestHeaders.set(
    "X-Cg-Pro-Api-Key",
    process.env.REACT_APP_COINGECKO_PRO_API_KEY ?? ""
  );
  const coingeckoMaxTokenDataUrl =
    baseURL +
    `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=max&interval=daily`;
  const coingeckoHourlyTokenDataUrl =
    baseURL + `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=90`;

  // TODO: Re-enable > 3M price history when we get paid CG API Key
  return Promise.all([
    // fetch(coingeckoMaxTokenDataUrl),
    fetch(coingeckoHourlyTokenDataUrl, { headers: requestHeaders }),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      const hourlyPrices = data[0].prices,
        marketcaps = data[0].market_caps,
        volumes = data[0].total_volumes;

      return { hourlyPrices, marketcaps, volumes };
    })
    .catch((error) => {
      console.log(error);
      return { hourly: [], marketcaps: [], volumes: [] };
    });
};

const getAssetPlatform = (chainId: number) => {
  if (chainId === POLYGON.chainId) return "polygon-pos";
  return "ethereum";
};

export const fetchCoingeckoTokenPrice = async (
  address: string,
  chainId: number,
  baseCurrency = "usd"
): Promise<number> => {
  requestHeaders.set(
    "X-Cg-Pro-Api-Key",
    process.env.REACT_APP_COINGECKO_PRO_API_KEY ?? ""
  );
  if (address === ETH.address) {
    const getPriceUrl =
      baseURL + `/simple/price/?ids=ethereum&vs_currencies=${baseCurrency}`;

    const resp = await fetch(getPriceUrl, { headers: requestHeaders });

    const data = await resp.json().catch((err) => {
      return 0;
    });

    if (data === 0 || !data["ethereum"]) return 0;

    return data["ethereum"][baseCurrency];
  }

  const getPriceUrl =
    baseURL +
    `/simple/token_price/${getAssetPlatform(
      chainId
    )}/?contract_addresses=${address}&vs_currencies=${baseCurrency}`;

  const resp = await fetch(getPriceUrl, { headers: requestHeaders });

  const data = await resp.json().catch((err) => {
    return 0;
  });

  if (data === 0 || !data[address.toLowerCase()]) return 0;

  return data[address.toLowerCase()][baseCurrency];
};
