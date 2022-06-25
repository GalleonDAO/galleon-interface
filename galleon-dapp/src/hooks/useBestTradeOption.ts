import { useState } from "react";

import { BigNumber } from "@ethersproject/bignumber";

import { MAINNET } from "constants/chains";
import {
  eligibleLeveragedExchangeIssuanceTokens,
  ETH,
  EthMaxYieldIndex,
  DoubloonToken,
  STETH,
  Token,
} from "constants/tokens";
import { useAccount } from "hooks/useAccount";
import { useBalance } from "hooks/useBalance";
import { useNetwork } from "hooks/useNetwork";
import { useLogging } from "hooks/useLogging";
import { toWei } from "utils";
import {
  ExchangeIssuanceQuote,
  getExchangeIssuanceQuotes,
  getLeveragedExchangeIssuanceQuotes,
  LeveragedExchangeIssuanceQuote,
} from "utils/exchangeIssuanceQuotes";
import { getZeroExTradeData, ZeroExData } from "utils/zeroExUtils";

type Result<_, E = Error> =
  | {
      success: true;
      dexData: ZeroExData | null;
      exchangeIssuanceData: ExchangeIssuanceQuote | null | undefined;
      leveragedExchangeIssuanceData: LeveragedExchangeIssuanceQuote | null;
    }
  | { success: false; error: E };

// To determine if price impact for DEX is smaller 5%
export const maxPriceImpact = 5;

/* Determines if the token is eligible for Leveraged Exchange Issuance */
const isEligibleLeveragedToken = (token: Token) =>
  eligibleLeveragedExchangeIssuanceTokens.includes(token);

export function isEligibleTradePairZeroEx(
  inputToken: Token,
  outputToken: Token
): boolean {
  if (
    inputToken.symbol === EthMaxYieldIndex.symbol ||
    outputToken.symbol === EthMaxYieldIndex.symbol
  )
    return false;

  if (
    inputToken.symbol === DoubloonToken.symbol ||
    outputToken.symbol === DoubloonToken.symbol
  )
    return false;

  return true;
}

/* Determines if the token pair is eligible for Leveraged Exchange Issuance */
export const isEligibleTradePair = (
  inputToken: Token,
  outputToken: Token,
  isIssuance: boolean
) => {
  const tokenEligible = isIssuance
    ? isEligibleLeveragedToken(outputToken)
    : isEligibleLeveragedToken(inputToken);

  const isEthmaxy =
    inputToken.symbol === EthMaxYieldIndex.symbol ||
    outputToken.symbol === EthMaxYieldIndex.symbol;

  if (tokenEligible && isEthmaxy && isIssuance) {
    // Only ETH or stETH is allowed as input for ethmaxy issuance at the moment
    return (
      inputToken.symbol === ETH.symbol || inputToken.symbol === STETH.symbol
    );
  }

  if (tokenEligible && isEthmaxy && !isIssuance) {
    // Only ETH is allowed as output for ethmaxy redeeming at the moment
    return outputToken.symbol === ETH.symbol;
  }

  return tokenEligible;
};

export const getSetTokenAmount = (
  isIssuance: boolean,
  sellTokenAmount: string,
  sellTokenDecimals: number,
  sellTokenPrice: number,
  buyTokenPrice: number,
  dexSwapOption: ZeroExData | null
): BigNumber => {
  if (!isIssuance) {
    return toWei(sellTokenAmount, sellTokenDecimals);
  }

  let setTokenAmount = BigNumber.from(dexSwapOption?.buyAmount ?? "0");

  const priceImpact =
    dexSwapOption && dexSwapOption.estimatedPriceImpact
      ? parseFloat(dexSwapOption.estimatedPriceImpact)
      : 0;

  if (!dexSwapOption || priceImpact >= maxPriceImpact) {
    // Recalculate the exchange issue/redeem quotes if not enough DEX liquidity
    const sellTokenTotal = parseFloat(sellTokenAmount) * sellTokenPrice;
    const approxOutputAmount =
      buyTokenPrice === 0 ? 0 : Math.floor(sellTokenTotal / buyTokenPrice);
    setTokenAmount = toWei(approxOutputAmount, sellTokenDecimals);
  }

  return setTokenAmount;
};

export const useBestTradeOption = () => {
  const { provider } = useAccount();
  const { chainId } = useNetwork();
  const { getBalance } = useBalance();
  const { KNOWN_LABELS, captureDurationAsync, logTimer } = useLogging();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [result, setResult] = useState<Result<ZeroExData, Error> | null>(null);

  const fetchAndCompareOptions = async (
    sellToken: Token,
    sellTokenAmount: string,
    sellTokenPrice: number,
    buyToken: Token,
    // buyTokenAmount: string,
    buyTokenPrice: number,
    isIssuance: boolean
  ) => {
    const { duration } = await captureDurationAsync(async () => {
      setIsFetching(true);

      /* Check 0x for DEX Swap option*/
      const zeroExResult = await getZeroExTradeData(
        // for now we only allow selling
        true,
        sellToken,
        buyToken,
        // for now we only allow specifing selling amount,
        // so sell token amount will always be correct
        sellTokenAmount,
        chainId || 1
      );
      const dexSwapOption = zeroExResult.success ? zeroExResult.value : null;
      // @ts-ignore
      const dexSwapError = zeroExResult.success ? null : zeroExResult.error;

      /* Determine set token amount based on different factors */
      let setTokenAmount = getSetTokenAmount(
        isIssuance,
        sellTokenAmount,
        sellToken.decimals,
        sellTokenPrice,
        buyTokenPrice,
        dexSwapOption
      );

      /* Check for Exchange Issuance option */
      let exchangeIssuanceOption: ExchangeIssuanceQuote | null = null;
      let leveragedExchangeIssuanceOption: LeveragedExchangeIssuanceQuote | null =
        null;

      const tokenEligibleForLeveragedEI = isEligibleTradePair(
        sellToken,
        buyToken,
        isIssuance
      );
      if (tokenEligibleForLeveragedEI) {
        const setToken = isIssuance ? buyToken : sellToken;

        try {
          leveragedExchangeIssuanceOption =
            await getLeveragedExchangeIssuanceQuotes(
              setToken,
              setTokenAmount,
              sellToken,
              buyToken,
              isIssuance,
              chainId,
              provider
            );
        } catch (e) {
          console.warn("error when generating leveraged ei option", e);
        }
      } else {
        // For now only allow trade on mainnet, some tokens are disabled
        const isEligibleTradePair = isEligibleTradePairZeroEx(
          sellToken,
          buyToken
        );
        if (chainId === MAINNET.chainId && isEligibleTradePair)
          try {
            const spendingTokenBalance: BigNumber =
              getBalance(sellToken.symbol) || BigNumber.from(0);
            exchangeIssuanceOption = await getExchangeIssuanceQuotes(
              buyToken,
              setTokenAmount,
              sellToken,
              isIssuance,
              spendingTokenBalance,
              chainId,
              provider
            );
          } catch (e) {
            console.warn("error when generating zeroexei option", e);
          }
      }

      console.log(
        "exchangeIssuanceOption",
        exchangeIssuanceOption,
        exchangeIssuanceOption?.inputTokenAmount.toString()
      );
      console.log(
        "levExchangeIssuanceOption",
        leveragedExchangeIssuanceOption,
        leveragedExchangeIssuanceOption?.inputTokenAmount.toString()
      );

      const result: Result<ZeroExData, Error> =
        dexSwapError &&
        !exchangeIssuanceOption &&
        !leveragedExchangeIssuanceOption
          ? { success: false, error: dexSwapError }
          : {
              success: true,
              dexData: dexSwapOption,
              exchangeIssuanceData: exchangeIssuanceOption,
              leveragedExchangeIssuanceData: leveragedExchangeIssuanceOption,
            };
      setResult(result);
      setIsFetching(false);
    });

    logTimer(KNOWN_LABELS.QUOTE_TIMER, duration);
  };

  return {
    bestOptionResult: result,
    isFetchingTradeData: isFetching,
    fetchAndCompareOptions,
  };
};
