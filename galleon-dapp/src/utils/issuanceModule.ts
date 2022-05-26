import { ChainId } from "@usedapp/core";

import {
  basicIssuanceModuleAddress,
  basicIssuanceModulePolygonAddress,
  debtIssuanceModuleAddress,
  debtIssuanceModuleV2Address,
  debtIssuanceModuleV2PolygonAddress,
} from "constants/ethContractAddresses";
import { CryptoKaiBlueChip } from "constants/tokens";

interface IssuanceModule {
  address: string;
  isDebtIssuance: boolean;
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
      return { address: basicIssuanceModuleAddress, isDebtIssuance: false };
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
      };
  }
}

export function getIssuanceModule(
  tokenSymbol: string,
  chainId: ChainId = ChainId.Mainnet
): IssuanceModule {
  return chainId === ChainId.Polygon
    ? getPolygonIssuanceModuleAddress(tokenSymbol)
    : getEthIssuanceModuleAddress(tokenSymbol);
}
