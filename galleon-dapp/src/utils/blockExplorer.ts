import { ARBITRUM, MAINNET, OPTIMISM, POLYGON } from 'constants/chains'

export function getBlockExplorerUrl(txHash: string, chainId?: number): string {
  switch (chainId) {
    case OPTIMISM.chainId:
      return OPTIMISM.blockExplorerUrl + 'tx/' + txHash
    case POLYGON.chainId:
      return POLYGON.blockExplorerUrl + 'tx/' + txHash
    case ARBITRUM.chainId:
      return ARBITRUM.blockExplorerUrl + 'tx/' + txHash
    default:
      return MAINNET.blockExplorerUrl + 'tx/' + txHash
  }
}
