import { OPTIMISM, POLYGON } from "constants/chains";
import {
  ExchangeIssuanceLeveragedMainnetAddress,
  ExchangeIssuanceLeveragedPolygonAddress,
  ExchangeIssuanceZeroExMainnetAddress,
  ExchangeIssuanceZeroExPolygonAddress,
  ExchangeIssuanceZeroExOptimismAddress,
  zeroExRouterOptimism,
  zeroExRouterAddress,
  zeroExRouterPolygon,
  perpExchangeIssuanceOptimismAddress,
} from "constants/ethContractAddresses";

export function get0xExchangeIssuanceContract(chainId: number = 1): string {
  if (chainId === POLYGON.chainId) return ExchangeIssuanceZeroExPolygonAddress;
  if (chainId === OPTIMISM.chainId)
    return ExchangeIssuanceZeroExOptimismAddress;
  return ExchangeIssuanceZeroExMainnetAddress;
}

export function get0xRouterContract(chainId: number = 1): string {
  if (chainId === OPTIMISM.chainId) return zeroExRouterOptimism;
  if (chainId === POLYGON.chainId) return zeroExRouterPolygon;
  return zeroExRouterAddress;
}

export function getLeveragedExchangeIssuanceContract(
  chainId: number = 1
): string {
  if (chainId === POLYGON.chainId)
    return ExchangeIssuanceLeveragedPolygonAddress;
  return ExchangeIssuanceLeveragedMainnetAddress;
}

export function getPerpExchanceIssuanceContract(chainId: number = 10): string {
  if (chainId === OPTIMISM.chainId) return perpExchangeIssuanceOptimismAddress;
  return perpExchangeIssuanceOptimismAddress;
}
