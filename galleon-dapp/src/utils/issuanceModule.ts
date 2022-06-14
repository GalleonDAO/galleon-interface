import { ChainId } from '@usedapp/core'

import {
  basicIssuanceModuleAddress,
  basicIssuanceModulePolygonAddress,
  basicIssuanceModuleOptimismAddress,
  debtIssuanceModuleAddress,
  debtIssuanceModuleV2Address,
  debtIssuanceModuleV2PolygonAddress,
} from 'constants/ethContractAddresses'

interface IssuanceModule {
  address: string
  isDebtIssuance: boolean
}

function getEthIssuanceModuleAddress(tokenSymbol: string): IssuanceModule {
  switch (tokenSymbol) {
    // case Bitcoin2xFlexibleLeverageIndex.symbol:
    // case Ethereum2xFlexibleLeverageIndex.symbol:
    // case GmiIndex.symbol:
    //   return { address: debtIssuanceModuleAddress, isDebtIssuance: true }
    // case JPGIndex.symbol:
    //   return { address: debtIssuanceModuleV2Address, isDebtIssuance: true }
    default:
      return { address: basicIssuanceModuleAddress, isDebtIssuance: false }
  }
}

function getPolygonIssuanceModuleAddress(tokenSymbol: string): IssuanceModule {
  switch (tokenSymbol) {
    // case Ethereum2xFLIP.symbol:
    // case IEthereumFLIP.symbol:
    // case IMaticFLIP.symbol:
    // case GmiIndex.symbol:
    // case Matic2xFLIP.symbol:
    //   return {
    //     address: debtIssuanceModuleV2PolygonAddress,
    //     isDebtIssuance: true,
    //   }
    default:
      return {
        address: basicIssuanceModulePolygonAddress,
        isDebtIssuance: false,
      }
  }
}

function getOptimismIssuanceModuleAddress(tokenSymbol: string): IssuanceModule {
  switch (tokenSymbol) {
    // case Ethereum2xFLIP.symbol:
    // case IEthereumFLIP.symbol:
    // case IMaticFLIP.symbol:
    // case GmiIndex.symbol:
    // case Matic2xFLIP.symbol:
    //   return {
    //     address: debtIssuanceModuleV2PolygonAddress,
    //     isDebtIssuance: true,
    //   }
    default:
      return {
        address: basicIssuanceModuleOptimismAddress,
        isDebtIssuance: false,
      }
  }
}

export function getIssuanceModule(
  tokenSymbol: string,
  chainId: ChainId = ChainId.Mainnet,
): IssuanceModule {
  return chainId === ChainId.Polygon
    ? getPolygonIssuanceModuleAddress(tokenSymbol)
    : chainId === ChainId.Optimism
    ? getOptimismIssuanceModuleAddress(tokenSymbol)
    : getEthIssuanceModuleAddress(tokenSymbol)
}
