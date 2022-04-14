import { useCallback, useState } from "react";

import { BigNumber } from "@ethersproject/bignumber";
import { ChainId, useEthers } from "@usedapp/core";

import {
  collateralDebtSwapData,
  debtCollateralSwapData,
  inputSwapData,
  outputSwapData,
} from "constants/exchangeIssuanceLeveragedData";
import { ETH, MATIC, Token } from "constants/tokens";
import { fromWei } from "utils";

import { useBalance } from "./useBalance";
import {
  getExchangeIssuanceLeveragedContract,
  useExchangeIssuanceLeveraged,
} from "./useExchangeIssuanceLeveraged";

export const useTradeLeveragedExchangeIssuance = (
  isIssuance: boolean,
  inputToken: Token,
  outputToken: Token,
  // buy / sell token amount
  tokenAmout: BigNumber,
  // max input / min output
  inputOutputLimit: BigNumber
) => {
  const { account, chainId, library } = useEthers();
  const {
    issueExactSetFromETH,
    issueExactSetFromERC20,
    redeemExactSetForETH,
    redeemExactSetForERC20,
  } = useExchangeIssuanceLeveraged();
  const { getBalance } = useBalance();

  const spendingTokenBalance = getBalance(inputToken) || BigNumber.from(0);

  const [isTransactingLevEI, setIsTransacting] = useState(false);

  const executeLevEITrade = useCallback(async () => {
    if (!account || inputOutputLimit.isZero() || tokenAmout.isZero()) return;

    const outputTokenAddress =
      chainId === ChainId.Polygon
        ? outputToken.polygonAddress
        : outputToken.address;
    const inputTokenAddress =
      chainId === ChainId.Polygon
        ? inputToken.polygonAddress
        : inputToken.address;
    if (!outputTokenAddress || !inputTokenAddress) return;

    let requiredBalance = fromWei(inputOutputLimit, inputToken.decimals);
    if (spendingTokenBalance.lt(requiredBalance)) return;

    try {
      setIsTransacting(true);
      if (isIssuance) {
        const amountOfSetToken = tokenAmout;
        const isSellingNativeChainToken =
          inputToken.symbol === ETH.symbol ||
          inputToken.symbol === MATIC.symbol;

        let addressKey;
        switch (outputToken.symbol) {
          case "ETHMAXY":
            addressKey = "0x0FE20E0Fa9C78278702B05c333Cc000034bb69E2";
            break;

          default:
            addressKey = "0x0FE20E0Fa9C78278702B05c333Cc000034bb69E2";
        }

        const debtCollateralSwap =
          debtCollateralSwapData[addressKey as keyof object];
        const inputSwap =
          inputSwapData[addressKey as keyof object][
            inputTokenAddress as keyof object
          ];

        if (isSellingNativeChainToken) {
          await issueExactSetFromETH(
            library,
            chainId,
            outputTokenAddress,
            amountOfSetToken,
            debtCollateralSwap,
            inputSwap,
            inputOutputLimit
          );
        } else {
          await issueExactSetFromERC20(
            library,
            chainId,
            outputTokenAddress,
            amountOfSetToken,
            inputTokenAddress,
            inputOutputLimit,
            debtCollateralSwap,
            inputSwap
          );
        }
      } else {
        const isRedeemingToNativeChainToken =
          outputToken.symbol === ETH.symbol ||
          outputToken.symbol === MATIC.symbol;

        const collateralDebtSwap = collateralDebtSwapData[inputToken.symbol];
        const outputSwap =
          outputSwapData[inputToken.symbol][outputToken.symbol as keyof object];

        const contract = await getExchangeIssuanceLeveragedContract(
          library?.getSigner(),
          chainId
        );

        if (isRedeemingToNativeChainToken) {
          await redeemExactSetForETH(
            contract,
            inputTokenAddress,
            tokenAmout,
            inputOutputLimit,
            collateralDebtSwap,
            outputSwap
          );
        } else {
          await redeemExactSetForERC20(
            contract,
            inputTokenAddress,
            tokenAmout,
            outputTokenAddress,
            inputOutputLimit,
            collateralDebtSwap,
            outputSwap
          );
        }
      }
      setIsTransacting(false);
    } catch (error) {
      setIsTransacting(false);
      console.log("Error sending transaction", error);
    }
  }, [account, inputOutputLimit]);

  return { executeLevEITrade, isTransactingLevEI };
};
