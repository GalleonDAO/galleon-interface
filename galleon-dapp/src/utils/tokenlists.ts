import {
  ArbitrumTokens,
  MainnetTokens,
  MaticTokens,
  OptimismTokens,
} from '@galleondao/galleon-tokenlist'

export type { TokenData } from '@galleondao/galleon-tokenlist'

export function getTokenList(chainId: number = 1) {
  switch (chainId) {
    case 137:
      return MaticTokens
    case 10:
      return OptimismTokens
    case 42161:
      return ArbitrumTokens
    default:
      return MainnetTokens
  }
}
