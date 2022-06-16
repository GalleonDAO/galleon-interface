import { ChainId } from "@usedapp/core";

import { ETH, MATIC, Token } from "constants/tokens";

export function getAddressForToken(
  token: Token,
  chainId: ChainId | undefined
): string | undefined {
  switch (chainId) {
    case ChainId.Mainnet:
      return token.address;
    case ChainId.Optimism:
      return token.optimismAddress;
    case ChainId.Polygon:
      return token.polygonAddress;
    case ChainId.Arbitrum:
      return token.arbitrumAddress;
    default:
      return undefined;
  }
}

export function getNativeToken(chainId: number | undefined): Token | null {
  switch (chainId) {
    case ChainId.Mainnet:
      return ETH;
    case ChainId.Optimism:
      return ETH;
    case ChainId.Polygon:
      return MATIC;
    case ChainId.Arbitrum:
      return ETH;
    default:
      return null;
  }
}
