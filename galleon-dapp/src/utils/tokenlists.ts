import {
  ArbitrumTokens,
  MainnetTokens,
  MaticTokens,
  OptimismTokens,
} from "@galleondao/galleon-tokenlist";

export type { TokenData } from "@galleondao/galleon-tokenlist";

export function getTokenList(chainId: number = 1) {
  switch (chainId) {
    case 137:
      return ArbitrumTokens;
    case 10:
      return MainnetTokens;
    case 42161:
      return ArbitrumTokens;
    default:
      return MainnetTokens;
  }
}
