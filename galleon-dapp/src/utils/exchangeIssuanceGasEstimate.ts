import { BigNumber } from "@ethersproject/bignumber";

import { ETH, MATIC, Token } from "constants/tokens";
import { getExchangeIssuanceZeroExContract } from "hooks/useExchangeIssuanceZeroEx";
import { getIssuanceModule } from "utils/issuanceModule";
import { getAddressForToken } from "utils/tokens";

export async function getExchangeIssuanceGasEstimate(
  library: any,
  chainId: number,
  isIssuance: boolean,
  inputToken: Token,
  outputToken: Token,
  setTokenAmount: BigNumber,
  inputTokenAmount: BigNumber,
  quoteData: string[]
): Promise<BigNumber> {
  // TODO: check scaling based on component counts (quoteData)
  // Hard-coded as issuance module isn't friendly for `.estimateGas`
  let gasEstimate = BigNumber.from(1800000);

  const setTokenSymbol = isIssuance ? outputToken.symbol : inputToken.symbol;
  const issuanceModule = getIssuanceModule(setTokenSymbol, chainId);

  const outputTokenAddress = getAddressForToken(outputToken, chainId);
  const inputTokenAddress = getAddressForToken(inputToken, chainId);
  if (!outputTokenAddress || !inputTokenAddress) return gasEstimate;

  try {
    const contract = await getExchangeIssuanceZeroExContract(
      library,
      chainId ?? 1
    );

    if (isIssuance) {
      const isSellingNativeChainToken =
        inputToken.symbol === ETH.symbol || inputToken.symbol === MATIC.symbol;

      if (isSellingNativeChainToken) {
        gasEstimate = await contract.estimateGas.issueExactSetFromETH(
          outputTokenAddress,
          setTokenAmount,
          quoteData,
          issuanceModule.address,
          issuanceModule.isDebtIssuance,
          { value: inputTokenAmount }
        );
      } else {
        const maxAmountInputToken = inputTokenAmount;
        gasEstimate = await contract.estimateGas.issueExactSetFromToken(
          outputTokenAddress,
          inputTokenAddress,
          setTokenAmount,
          maxAmountInputToken,
          quoteData,
          issuanceModule.address,
          issuanceModule.isDebtIssuance
        );
      }
    } else {
      const isRedeemingNativeChainToken =
        inputToken.symbol === ETH.symbol || inputToken.symbol === MATIC.symbol;
      const minOutputReceive = inputTokenAmount;

      if (isRedeemingNativeChainToken) {
        gasEstimate = await contract.estimateGas.redeemExactSetForETH(
          inputTokenAddress,
          setTokenAmount,
          minOutputReceive,
          quoteData,
          issuanceModule.address,
          issuanceModule.isDebtIssuance,
          { gasLimit: gasEstimate }
        );
      } else {
        gasEstimate = await contract.estimateGas.redeemExactSetForToken(
          inputTokenAddress,
          outputTokenAddress,
          setTokenAmount,
          minOutputReceive,
          quoteData,
          issuanceModule.address,
          issuanceModule.isDebtIssuance,
          {
            gasLimit: gasEstimate,
            maxFeePerGas: 100000000000,
            maxPriorityFeePerGas: 2000000000,
          }
        );
      }
    }
  } catch (error) {
    console.log("Error estimating gas for 0x exchange issuance", error);
  }

  return gasEstimate;
}
