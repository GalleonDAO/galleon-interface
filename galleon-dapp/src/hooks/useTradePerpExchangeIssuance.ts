import { useCallback, useState } from "react";

import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";

import { POLYGON } from "constants/chains";
import { ETH, MATIC, Token, USDC } from "constants/tokens";
import { fromWei } from "utils";
import { SwapData } from "utils/exchangeIssuanceQuotes";

import { useBalance } from "./useBalance";

import {
  usePerpExchangeIssuance,
  getPerpIssuanceZeroExContract,
} from "./useExchangeIssuancePerp";

export const useTradePerpExchangeIssuance = (
  isIssuance: boolean,
  inputToken: Token,
  outputToken: Token,
  tokenAmount: BigNumber,
  componentQuotes: any[],
  minInputOutputAmount: BigNumber
) => {
  const { account, chainId, library } = useEthers();
  const {
    getUsdcAmountInForFixedSetOffChain,
    getUsdcAmountOutForFixedSetOffChain,
    issueExactSetFromUsdc,
    redeemExactSetForUsdc,
    approveSetToken,
    approveToken,
    approveTokens,
    tokenAllowance,
  } = usePerpExchangeIssuance();
  const { getBalance } = useBalance();
  const spendingTokenBalance = getBalance(inputToken.symbol) || BigNumber.from(0);

  const [isTransactingPerpEI, setIsTransacting] = useState(false);

  const executePerpEITrade = useCallback(async () => {
    if (!account || tokenAmount.isZero()) return;

    const outputTokenAddress = outputToken.optimismAddress;

    const inputTokenAddress = inputToken.optimismAddress;

    if (!outputTokenAddress || !inputTokenAddress) return;

    let requiredBalance = fromWei(
      minInputOutputAmount,
      isIssuance ? inputToken.decimals : outputToken.decimals
    );

    if (spendingTokenBalance.lt(requiredBalance)) return;

    const contract = await getPerpIssuanceZeroExContract(library?.getSigner());

    try {
      setIsTransacting(true);
      if (isIssuance) {
        const amountOfSetToken = tokenAmount;
        const isNativeUsdcToken = inputToken.symbol === USDC.symbol;

        if (isNativeUsdcToken) {
          await issueExactSetFromUsdc(
            contract,
            outputTokenAddress,
            amountOfSetToken,
            componentQuotes,
            minInputOutputAmount
          );
        }
      } else {
        await redeemExactSetForUsdc(
          contract,
          inputTokenAddress,
          tokenAmount,

          componentQuotes,
          minInputOutputAmount
        );
      }
      setIsTransacting(false);
    } catch (error) {
      setIsTransacting(false);
      console.log("Error sending transaction", error);
    }
  }, [account, minInputOutputAmount]);

  return { executePerpEITrade, isTransactingPerpEI };
};
