import { OPTIMISM, POLYGON } from 'constants/chains'
import {
  ExchangeIssuanceLeveragedMainnetAddress,
  ExchangeIssuanceLeveragedPolygonAddress,
  ExchangeIssuanceZeroExMainnetAddress,
  ExchangeIssuanceZeroExPolygonAddress,
  ExchangeIssuanceZeroExOptimismAddress,
} from 'constants/ethContractAddresses'

export function get0xExchangeIssuanceContract(chainId: number = 1): string {
  if (chainId === POLYGON.chainId) return ExchangeIssuanceZeroExPolygonAddress
  if (chainId === OPTIMISM.chainId) return ExchangeIssuanceZeroExOptimismAddress
  return ExchangeIssuanceZeroExMainnetAddress
}

export function getLeveragedExchangeIssuanceContract(
  chainId: number = 1,
): string {
  if (chainId === POLYGON.chainId)
    return ExchangeIssuanceLeveragedPolygonAddress
  return ExchangeIssuanceLeveragedMainnetAddress
}
