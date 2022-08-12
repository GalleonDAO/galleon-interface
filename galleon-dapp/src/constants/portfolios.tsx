import ethmaxyLogo from 'assets/ethmaxy.png'
import doubloonLogo from 'assets/brand/dbl.png'
import byeLogo from 'assets/bye.png'
import { TokenContextKeys } from 'providers/MarketData/MarketDataProvider'
import { ReactNode } from 'react'

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
    | {
        streamingFee: string
        mintFee?: string
        redeemFee?: string
        performanceFee?: string
      }
    | undefined
  theme: string | undefined
  dashboard: string | undefined
  summary: ReactNode | undefined
}

export const MergeIndex: Token = {
  name: 'Merge Index',
  symbol: 'MERGE',
  address: '0xCf99D5465D39695162CA65bC59190fD92fa8e218',
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: 'merge',
  image:
    'https://raw.githubusercontent.com/GalleonDAO/galleon-tokenlist/main/logos/MERGE.png',
  coingeckoId: 'merge-index',
  tokensetsId: 'merge-index',
  tokenContextKey: 'merge',
  fees: {
    streamingFee: '0.95%',
  },
  theme: 'Thematic',
  dashboard: undefined,
  summary: (
    <>
      The <strong>Merge Index</strong> is part of Galleon's narrative-based
      Portfolios suite allowing holders of the <strong>$MERGE</strong> token to
      capture the upside in the highly anticipated event of Ethereum
      transitioning from Proof of Work to a{' '}
      <strong>Proof of Stake (PoS)</strong> network.
    </>
  ),
}

export const SpartanIndex: Token = {
  name: 'Spartan Index',
  symbol: 'SPI',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: '0xb83E89129Bc8090eEfe3b3805ab2a9cb12D3fa7E',
  arbitrumAddress: undefined,
  decimals: 18,
  url: 'spi',
  image:
    'https://raw.githubusercontent.com/GalleonDAO/galleon-tokenlist/main/logos/spi-logo.png',
  coingeckoId: 'spartan-index',
  tokensetsId: 'spartan-index',
  tokenContextKey: 'spi',
  fees: {
    streamingFee: '0.95%',
  },
  theme: 'Thematic',
  dashboard: undefined,
  summary: '',
}

export const CryptoFeesIndex: Token = {
  name: 'Crypto Fees Index',
  symbol: 'FEES',
  address: '0xb9dfc3abb15916299eE4f51724063DcB0A1741d4',
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: 'fees',
  image:
    'https://raw.githubusercontent.com/GalleonDAO/galleon-tokenlist/main/logos/FEES.png',
  coingeckoId: 'crypto-fees-index',
  tokensetsId: 'crypto-fees-index',
  tokenContextKey: 'fees',
  fees: {
    streamingFee: '0.95%',
  },
  theme: 'Thematic',
  dashboard: undefined,
  summary: '',
}

export const veTokenIndex: Token = {
  name: 'veToken Index',
  symbol: 'VOTE',
  address: '0x4f3e7f98aa70a3b879101b23b46db1c422f85f52',
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: undefined,
  decimals: 18,
  url: 'vote',
  image:
    'https://raw.githubusercontent.com/GalleonDAO/galleon-tokenlist/main/logos/veTOKEN.png',
  coingeckoId: 'vetoken-index',
  tokensetsId: 'vetoken-index',
  tokenContextKey: 'vote',
  fees: {
    streamingFee: '0.95%',
  },
  theme: 'Thematic',
  dashboard: undefined,
  summary: '',
}

export const productTokensBySymbol = {
  // SPI: SpartanIndex,
  // FEES: CryptoFeesIndex,
  // VOTE: veTokenIndex,
  MERGE: MergeIndex,
}

const portfolioNames = [
  // SpartanIndex
  // , CryptoFeesIndex, veTokenIndex,
  MergeIndex,
]

export const portfolios = [
  // SpartanIndex,
  // CryptoFeesIndex,
  // veTokenIndex,
  MergeIndex,
]

export const portfolioNamesMainnet = portfolioNames.filter(
  (index) => index.address !== undefined,
)
export const portfolioNamesPolygon = portfolioNames.filter(
  (index) => index.polygonAddress !== undefined,
)

export const portfolioNamesOptimism = portfolioNames.filter(
  (index) => index.optimismAddress !== undefined,
)

export const portfolioNamesArbitrum = portfolioNames.filter(
  (index) => index.arbitrumAddress !== undefined,
)

export default portfolioNames
