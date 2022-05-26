// import solunavaxLogo from 'assets/solunavax.png'
import ethmaxyLogo from 'assets/ethmaxy.png'
import doubloonLogo from 'assets/brand/logo-profile.png'
import solunavaxLogo from 'assets/solunavax.png'
import { TokenContextKeys } from 'providers/MarketData/MarketDataProvider'

export interface Token {
  name: string
  symbol: string
  address: string | undefined
  polygonAddress: string | undefined
  optimismAddress: string | undefined
  arbitrumAddress: string | undefined
  decimals: number
  url: string
  image: string
  coingeckoId: string
  tokensetsId: string
  tokenContextKey?: TokenContextKeys
  fees:
    | { streamingFee: string; mintFee?: string; redeemFee?: string }
    | undefined
  theme: string | undefined
  dashboard: string | undefined
}

export const STETH: Token = {
  name: 'stETH',
  symbol: 'stETH',
  image:
    'https://assets.coingecko.com/coins/images/13442/small/steth_logo.png?1608607546',
  address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: '',
  coingeckoId: 'staked-ether',
  tokensetsId: 'staked-ether',
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
}

export const DAI: Token = {
  name: 'Dai',
  symbol: 'DAI',
  image:
    'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  polygonAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  optimismAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  arbitrumAddress: undefined,
  decimals: 18,
  url: '',
  coingeckoId: 'dai',
  tokensetsId: 'dai',
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
}

export const USDC: Token = {
  name: 'USD Coin',
  symbol: 'USDC',
  image:
    'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  polygonAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  optimismAddress: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
  arbitrumAddress: undefined,
  decimals: 6,
  url: '',
  coingeckoId: 'usd-coin',
  tokensetsId: 'usdc',
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
}

export const ETH: Token = {
  name: 'Ethereum',
  symbol: 'ETH',
  image:
    'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  polygonAddress: '',
  optimismAddress: '',
  arbitrumAddress: undefined,
  decimals: 18,
  url: '',
  coingeckoId: 'ethereum',
  tokensetsId: 'eth',
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
}

export const WETH: Token = {
  name: 'Wrapped Ether',
  symbol: 'WETH',
  image:
    'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  polygonAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  optimismAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  arbitrumAddress: undefined,
  decimals: 18,
  url: '',
  coingeckoId: 'weth',
  tokensetsId: 'weth',
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
}

export const MATIC: Token = {
  name: 'Matic',
  symbol: 'MATIC',
  image:
    'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
  address: undefined,
  polygonAddress: '0x0000000000000000000000000000000000001010',
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: '',
  coingeckoId: 'matic-network',
  tokensetsId: 'matic',
  fees: undefined,
  theme: undefined,
  dashboard: undefined,
}

export const DoubloonToken: Token = {
  name: 'Doubloon',
  symbol: 'DBL',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: '0xd3f1Da62CAFB7E7BC6531FF1ceF6F414291F03D3',
  decimals: 18,
  url: 'doubloon',
  image: doubloonLogo,
  coingeckoId: 'doubloon',
  tokensetsId: 'doubloon',
  fees: undefined,
  theme: 'Governance',
  dashboard: undefined,
}

export const EthMaxYieldIndex: Token = {
  name: 'ETH Max Yield Index',
  symbol: 'ETHMAXY',
  address: '0x0fe20e0fa9c78278702b05c333cc000034bb69e2',
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: 'ethmaxy',
  image: ethmaxyLogo,
  coingeckoId: 'eth-max-yield-index',
  tokensetsId: 'ethmaxy',
  tokenContextKey: 'ethmaxy',
  fees: {
    streamingFee: '1.95%',
  },
  theme: 'Yield',
  dashboard: 'https://dune.xyz/galleondao/ETHMAXY-KPIs',
}

export const CryptoKaiBlueChip: Token = {
  name: 'Crypto Kai Blue Chip Index',
  symbol: 'CKB',
  address: '0xD13bF4acF5d4b2407d785d2528D746fA75CF9778',
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: 'ckb',
  image:
    'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/ckb-set.png',
  coingeckoId: 'ckb',
  tokensetsId: 'ckb',
  tokenContextKey: undefined,
  fees: {
    streamingFee: '3%',
  },
  theme: 'Thematic',
  dashboard: undefined,
}

// export const SolunavaxIndex: Token = {
//   name: "SOLUNAVAX Index",
//   symbol: "SOLUNAVAX",
//   address: undefined,
//   polygonAddress: undefined,
//   optimismAddress: "0xbA6a2Fa321BB06D668c5192Be77428106c5C01E5",
//   arbitrumAddress: undefined,
//   decimals: 18,
//   url: "solunavax",
//   image: solunavaxLogo,
//   coingeckoId: "solunavax-index",
//   tokensetsId: "solunavax",
//   tokenContextKey: "solunavax",
//   fees: {
//     streamingFee: "0.5%",
//   },
//   theme: "Layer 1",
//   dashboard: undefined,
// };

export const productTokensBySymbol = {
  DBL: DoubloonToken,
  ETHMAXY: EthMaxYieldIndex,
  CKB: CryptoKaiBlueChip
}

export const mainnetCurrencyTokens = [ETH, DAI, USDC, STETH]

export const polygonCurrencyTokens = [MATIC, DAI, USDC, WETH]

export const optimismCurrencyTokens = [ETH, DAI, USDC]

export const arbitrumCurrencyTokens = [ETH, DAI, USDC]

export const eligibleLeveragedExchangeIssuanceTokens = [EthMaxYieldIndex]

const indexNames = [EthMaxYieldIndex, CryptoKaiBlueChip]

export const indexNamesMainnet = indexNames.filter(
  (index) => index.address !== undefined,
)
export const indexNamesPolygon = indexNames.filter(
  (index) => index.polygonAddress !== undefined,
)

export const indexNamesOptimism = indexNames.filter(
  (index) => index.optimismAddress !== undefined,
)

export const indexNamesArbitrum = indexNames.filter(
  (index) => index.arbitrumAddress !== undefined,
)

export default indexNames
