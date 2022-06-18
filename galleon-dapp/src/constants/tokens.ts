import ethmaxyLogo from "assets/ethmaxy.png";
import doubloonLogo from "assets/brand/dbl.png";
import byeLogo from "assets/bye.png";
import { TokenContextKeys } from "providers/MarketData/MarketDataProvider";
import { ChainName } from "./chains";

const coingeckoUrl = "https://api.coingecko.com/api/v3";
const coinsPath = "/coins";

const platformKeyMappings = {
  ethereum: ChainName.MAINNET,
  "polygon-pos": ChainName.POLYGON,
  "optimistic-ethereum": ChainName.OPTIMISM,
  "arbitrum-one": ChainName.ARBITRUM,
};

const mapTokenPlatforms = (platforms: {
  [x: string]: any;
}): NetworkAddress[] => {
  console.log(`TOKEN_TRACE: mapping this platform ${platforms}`);
  return Object.keys(platforms)
    .filter((platKey) => platformKeyMappings[platKey])
    .map((platKey) => {
      console.log(
        `TOKEN_TRACE: found platform mapping ${JSON.stringify(
          platforms[platKey]
        )}`
      );
      return {
        chain: platformKeyMappings[platKey],
        address: platforms[platKey],
      };
    });
};

const fetchNetworkAddresses = async (
  tokenId: string
): Promise<NetworkAddress[]> => {
  const reqUrl = `${coingeckoUrl}${coinsPath}/${tokenId}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;

  //TODO: potentially reformat this to a callbackchain
  const response = await fetch(reqUrl);
  if (response.ok) {
    console.log(`TOKEN_TRACE: _${tokenId} response OK`);
    const body = await response.json();
    console.log(`TOKEN_TRACE: _${tokenId} response json: ${body}`);
    const result = mapTokenPlatforms(body.platforms);
    return result;
  } else return undefined;

  // let thing = await fetch(reqUrl)
  //   .then((response) => {
  //     if (response.ok) {
  //       console.log(`TOKEN_TRACE: _${tokenId} response OK`);
  //       response.json().then((body) => {
  //         console.log(`TOKEN_TRACE: _${tokenId} response json: ${body}`);
  //         result = mapTokenPlatforms(body.platforms);
  //       });
  //     }
  //   })
  //   .catch() //TODO: Add some error handling
  //   .finally(() => {
  //     return result;
  //   });
};

interface NetworkAddress {
  chain: ChainName;
  address: string | undefined;
}

//Used to reduce impact of refactor
export interface TokenProps {
  name: string;
  symbol: string;
  addresses: NetworkAddress[];
  address: string | undefined;
  polygonAddress: string | undefined;
  optimismAddress: string | undefined;
  arbitrumAddress: string | undefined;
  decimals: number;
  url: string;
  image: string;
  coingeckoId: string;
  tokensetsId: string;
  tokenContextKey?: TokenContextKeys;
  fees:
    | {
        streamingFee: string;
        mintFee?: string;
        redeemFee?: string;
        performanceFee?: string;
      }
    | undefined;
  theme: string | undefined;
  dashboard: string | undefined;
  isDangerous: boolean;
}

/**
 * Exporting as class allows for fields which are regularly evaluated to be stored as calculated properties
 */
export class Token {
  name: string;
  symbol: string;
  calcAddresses: NetworkAddress[];
  addresses: NetworkAddress[];
  address: string | undefined;
  polygonAddress: string | undefined;
  optimismAddress: string | undefined;
  arbitrumAddress: string | undefined;
  decimals: number;
  url: string;
  image: string;
  coingeckoId: string;
  tokensetsId: string;
  tokenContextKey?: TokenContextKeys;
  fees:
    | {
        streamingFee: string;
        mintFee?: string;
        redeemFee?: string;
        performanceFee?: string;
      }
    | undefined;
  theme: string | undefined;
  dashboard: string | undefined;
  isDangerous: boolean;

  //Calculated Fields
  supportedNetworks: ChainName[];

  constructor(tokenProps: TokenProps) {
    console.log(`TOKEN_TRACE: initialising token: ${tokenProps.name}`);
    this.name = tokenProps.name;
    this.symbol = tokenProps.symbol;
    this.addresses = tokenProps.addresses;
    this.address = tokenProps.address;
    this.polygonAddress = tokenProps.polygonAddress;
    this.optimismAddress = tokenProps.optimismAddress;
    this.arbitrumAddress = tokenProps.arbitrumAddress;
    this.decimals = tokenProps.decimals;
    this.url = tokenProps.url;
    this.image = tokenProps.image;
    this.coingeckoId = tokenProps.coingeckoId;
    this.tokensetsId = tokenProps.tokensetsId;
    this.tokenContextKey = tokenProps.tokenContextKey;
    this.fees = tokenProps.fees;
    this.theme = tokenProps.theme;
    this.dashboard = tokenProps.dashboard;
    this.isDangerous = tokenProps.isDangerous;

    //TODO: Check perf impact of async calls in ctor
    //TODO: move to deferred exec as accessor if slow
    //Calculated Fields
    fetchNetworkAddresses(this.coingeckoId).then((result) => {
      console.log(`TOKEN_TRACE: network addresses fetched for ${
        this.coingeckoId
      }
          result: ${JSON.stringify(result)}`);
      this.calcAddresses = result;
      console.log(`TOKEN_TRACE: calc addresses assigned for ${this.coingeckoId}
            calcAddresses: ${JSON.stringify(this.calcAddresses)}`);
      if (this.calcAddresses) {
        this.supportedNetworks = this.calcAddresses.map((p) => {
          console.log(`TOKEN_TRACE: found supported network for ${
            this.coingeckoId
          }
          calcAddress: ${JSON.stringify(p)}`);
          return p.address ? p.chain : null;
        });
      } else this.supportedNetworks = undefined;
      console.log(`RESULT_TRACE: token ${this.name} initialised
          static addresses: ${JSON.stringify(
            this.addresses
              .filter((p) => p.address)
              .sort((a, b) => {
                if (a.address < b.address) {
                  return -1;
                }
                if (a.address > b.address) {
                  return 1;
                }
                return 0;
              })
          )}
          calculated addresses: ${JSON.stringify(
            this.calcAddresses.sort((a, b) => {
              if (a.address < b.address) {
                return -1;
              }
              if (a.address > b.address) {
                return 1;
              }
              return 0;
            })
          )}`); //Sort is disgusting but makes it more readable for now, debug code only

      console.log(`RESULT_TRACE VERIFY_TRACE: Verifying Matches for token ${
        this.name
      }:
          ${this.calcAddresses.map((network) => {
            const static_add = this.addresses.filter(
              (p) => p.chain === network.chain
            )[0];
            return `Checking match for Chain: ${network.chain}: {
              static address: ${
                static_add
                  ? static_add.address
                    ? static_add.address.toLowerCase()
                    : "undefined"
                  : "undefined"
              }
              fetched address: ${network.address.toLowerCase()}
              matching: ${
                static_add?.address?.toLowerCase() ===
                network.address.toLowerCase()
              }
            }`;
          })}`);
    });
  }
}

export const STETH: Token = new Token({
  name: "stETH",
  symbol: "stETH",
  image:
    "https://assets.coingecko.com/coins/images/13442/small/steth_logo.png?1608607546",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    },
    {
      chain: ChainName.POLYGON,
      address: undefined,
    },
    {
      chain: ChainName.OPTIMISM,
      address: undefined,
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: "",
  coingeckoId: "staked-ether",
  tokensetsId: "staked-ether",
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
  isDangerous: false,
});

export const DAI: Token = new Token({
  name: "Dai",
  symbol: "DAI",
  image:
    "https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
    {
      chain: ChainName.POLYGON,
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
    {
      chain: ChainName.OPTIMISM,
      address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  polygonAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  optimismAddress: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
  arbitrumAddress: undefined,
  decimals: 18,
  url: "",
  coingeckoId: "dai",
  tokensetsId: "dai",
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
  isDangerous: false,
});

export const USDC: Token = new Token({
  name: "USD Coin",
  symbol: "USDC",
  image:
    "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      chain: ChainName.POLYGON,
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
    {
      chain: ChainName.OPTIMISM,
      address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  polygonAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  optimismAddress: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
  arbitrumAddress: undefined,
  decimals: 6,
  url: "",
  coingeckoId: "usd-coin",
  tokensetsId: "usdc",
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
  isDangerous: false,
});

export const ETH: Token = new Token({
  name: "Ethereum",
  symbol: "ETH",
  image:
    "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
    {
      chain: ChainName.POLYGON,
      address: undefined,
    },
    {
      chain: ChainName.OPTIMISM,
      address: undefined,
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  polygonAddress: "",
  optimismAddress: "",
  arbitrumAddress: undefined,
  decimals: 18,
  url: "",
  coingeckoId: "ethereum",
  tokensetsId: "eth",
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
  isDangerous: false,
});

export const WETH: Token = new Token({
  name: "Wrapped Ether",
  symbol: "WETH",
  image:
    "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
      chain: ChainName.POLYGON,
      address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    },
    {
      chain: ChainName.OPTIMISM,
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  polygonAddress: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  optimismAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  arbitrumAddress: undefined,
  decimals: 18,
  url: "",
  coingeckoId: "weth",
  tokensetsId: "weth",
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
  isDangerous: false,
});

export const MATIC: Token = new Token({
  name: "Matic",
  symbol: "MATIC",
  image:
    "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: undefined,
    },
    {
      chain: ChainName.POLYGON,
      address: "0x0000000000000000000000000000000000001010",
    },
    {
      chain: ChainName.OPTIMISM,
      address: undefined,
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: undefined,
  polygonAddress: "0x0000000000000000000000000000000000001010",
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: "",
  coingeckoId: "matic-network",
  tokensetsId: "matic",
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
  isDangerous: false,
});

export const DoubloonToken: Token = new Token({
  name: "Doubloon",
  symbol: "DBL",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: undefined,
    },
    {
      chain: ChainName.POLYGON,
      address: undefined,
    },
    {
      chain: ChainName.OPTIMISM,
      address: undefined,
    },
    {
      chain: ChainName.ARBITRUM,
      address: "0xd3f1Da62CAFB7E7BC6531FF1ceF6F414291F03D3",
    },
  ],
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: "0xd3f1Da62CAFB7E7BC6531FF1ceF6F414291F03D3",
  decimals: 18,
  url: "doubloon",
  image: doubloonLogo,
  coingeckoId: "doubloon",
  tokensetsId: "doubloon",
  fees: undefined,
  theme: "Governance",
  dashboard: undefined,
  isDangerous: false,
});

export const EthMaxYieldIndex: Token = new Token({
  name: "ETH Max Yield Index",
  symbol: "ETHMAXY",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0x0fe20e0fa9c78278702b05c333cc000034bb69e2",
    },
    {
      chain: ChainName.POLYGON,
      address: undefined,
    },
    {
      chain: ChainName.OPTIMISM,
      address: undefined,
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0x0fe20e0fa9c78278702b05c333cc000034bb69e2",
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: "ethmaxy",
  image: ethmaxyLogo,
  coingeckoId: "eth-max-yield-index",
  tokensetsId: "ethmaxy",
  tokenContextKey: "ethmaxy",
  fees: {
    streamingFee: "1.95%",
  },
  theme: "Yield",
  dashboard: "https://dune.xyz/galleondao/ETHMAXY-KPIs",
  isDangerous: false,
});

export const BasisYieldEthIndex: Token = new Token({
  name: "Basis Yield ETH Index",
  symbol: "BYE",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: undefined,
    },
    {
      chain: ChainName.POLYGON,
      address: undefined,
    },
    {
      chain: ChainName.OPTIMISM,
      address: "0x927Eb0dBC5c3FD172Fdfa72D563f71612eCB6122",
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: "0x927Eb0dBC5c3FD172Fdfa72D563f71612eCB6122",
  arbitrumAddress: undefined,
  decimals: 18,
  url: "bye",
  image: byeLogo,
  coingeckoId: "basis-yield-eth-index",
  tokensetsId: "bye",
  tokenContextKey: "bye",
  fees: {
    streamingFee: "0%",
    performanceFee: "10%",
  },
  theme: "Yield",
  dashboard: undefined,
  isDangerous: false,
});

export const DummyExchangeIssuanceSet: Token = new Token({
  name: "Dummy Exchange Issuance Set",
  symbol: "DUMMY",
  addresses: [
    {
      chain: ChainName.MAINNET,
      address: "0xD13bF4acF5d4b2407d785d2528D746fA75CF9778",
    },
    {
      chain: ChainName.POLYGON,
      address: undefined,
    },
    {
      chain: ChainName.OPTIMISM,
      address: undefined,
    },
    {
      chain: ChainName.ARBITRUM,
      address: undefined,
    },
  ],
  address: "0xD13bF4acF5d4b2407d785d2528D746fA75CF9778",
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: "dummy",
  image:
    "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/ckb-set.png",
  coingeckoId: "dummy",
  tokensetsId: "dummy",
  tokenContextKey: undefined,
  fees: {
    streamingFee: "3%",
  },
  theme: "Thematic",
  dashboard: undefined,
  isDangerous: false,
});

export const productTokensBySymbol = {
  DBL: DoubloonToken,
  ETHMAXY: EthMaxYieldIndex,
  BYE: BasisYieldEthIndex,
};

export const mainnetCurrencyTokens = [ETH, DAI, USDC, STETH];

export const polygonCurrencyTokens = [MATIC, DAI, USDC, WETH];

export const optimismCurrencyTokens = [ETH, DAI, USDC];

export const arbitrumCurrencyTokens = [ETH, DAI, USDC];

export const eligibleLeveragedExchangeIssuanceTokens = [EthMaxYieldIndex];
export const eligiblePerpIssuanceTokens = [BasisYieldEthIndex];
const indexNames = [EthMaxYieldIndex, BasisYieldEthIndex];

export const portfolios = [];

export const indexNamesMainnet = indexNames.filter(
  (index) => index.address !== undefined
);
export const indexNamesPolygon = indexNames.filter(
  (index) => index.polygonAddress !== undefined
);

export const indexNamesOptimism = indexNames.filter(
  (index) => index.optimismAddress !== undefined
);

export const indexNamesArbitrum = indexNames.filter(
  (index) => index.arbitrumAddress !== undefined
);

export default indexNames;
