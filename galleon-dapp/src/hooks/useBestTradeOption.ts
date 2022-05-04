import { useState } from "react";

import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";
import {
  KNOWN_SERVICES,
  KNOWN_LABELS,
  LOG_SEVERITY,
} from "@galleondao/logging-lib";
import {
  eligibleLeveragedExchangeIssuanceTokens,
  ETH,
  EthMaxYieldIndex,
  Token,
} from "constants/tokens";
import { toWei } from "utils";
import {
  ExchangeIssuanceQuote,
  getExchangeIssuanceQuotes,
  getLeveragedExchangeIssuanceQuotes,
  LeveragedExchangeIssuanceQuote,
} from "utils/exchangeIssuanceQuotes";
import { getZeroExTradeData, ZeroExData } from "utils/zeroExUtils";
import { logger } from "index";

type Result<_, E = Error> =
  | {
      success: true;
      dexData: ZeroExData | null;
      exchangeIssuanceData: ExchangeIssuanceQuote | null | undefined;
      leveragedExchangeIssuanceData:
        | LeveragedExchangeIssuanceQuote
        | null
        | undefined;
    }
  | { success: false; error: E };

/* Determines if the token is eligible for Leveraged Exchange Issuance */
const isEligibleLeveragedToken = (token: Token) =>
  eligibleLeveragedExchangeIssuanceTokens.includes(token);

/* Determines if the token pair is eligible for Leveraged Exchange Issuance */
const isEligibleTradePair = (
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
    // Only ETH is allowed as input for ethmaxy issuance at the moment
    return inputToken.symbol === ETH.symbol;
  }

  if (tokenEligible && isEthmaxy && !isIssuance) {
    // Only ETH is allowed as output for ethmaxy redeeming at the moment
    return outputToken.symbol === ETH.symbol;
  }

  return tokenEligible;
};

export const useBestTradeOption = () => {
  const { account, chainId, library } = useEthers();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [result, setResult] = useState<Result<ZeroExData, Error> | null>(null);
  const [time, setTime] = useState(0);

  const fetchAndCompareOptions = async (
    sellToken: Token,
    sellTokenAmount: string,
    buyToken: Token,
    // buyTokenAmount: string,
    isIssuance: boolean
  ) => {
    setIsFetching(true);
    setTime(Date.now());

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

    const tokenEligible = isEligibleTradePair(sellToken, buyToken, isIssuance);

    const tokenAmount =
      isIssuance && dexSwapOption
        ? BigNumber.from(dexSwapOption.buyAmount)
        : toWei(sellTokenAmount, sellToken.decimals);

    /* Check for Exchange Issuance option */
    let exchangeIssuanceOption: ExchangeIssuanceQuote | null | undefined =
      undefined;
    // if (account && !isBuyingTokenEligible) {
    //   try {
    //     exchangeIssuanceOption = await getExchangeIssuanceQuotes(
    //       buyToken,
    //       tokenAmount,
    //       sellToken,
    //       isIssuance,
    //       chainId,
    //       library
    //     )
    //   } catch (e) {
    //     console.warn('error when generating zeroexei option', e)
    //   }
    // }

    /* Check ExchangeIssuanceLeveraged option */
    let leveragedExchangeIssuanceOption: LeveragedExchangeIssuanceQuote | null =
      null;
    // TODO: Recalculate the exchange issue/redeem quotes if not enough DEX liquidity on ETHMAXY/ETH
    // if (account && !dexSwapError && tokenEligible) {
    if (account && !dexSwapError && tokenEligible) {
      const setToken = isIssuance ? buyToken : sellToken;
      const setAmount = tokenAmount;

      try {
        leveragedExchangeIssuanceOption =
          await getLeveragedExchangeIssuanceQuotes(
            setToken,
            setAmount,
            sellToken,
            isIssuance,
            chainId,
            library
          );
      } catch (e) {
        console.warn("error when generating leveraged ei option", e);
      }
    }

    const result: Result<ZeroExData, Error> = dexSwapError
      ? { success: false, error: dexSwapError }
      : {
          success: true,
          dexData: dexSwapOption,
          exchangeIssuanceData: exchangeIssuanceOption,
          leveragedExchangeIssuanceData: leveragedExchangeIssuanceOption,
        };
    setResult(result);
    setIsFetching(false);
    setTime(Date.now() - time);
    console.log(time);
    if (result.success) {
      logger.logTimer({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: KNOWN_LABELS.QUOTE_TIMER,
        duration: time,
      });

      logger.logCounter({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: KNOWN_LABELS.QUOTE_GENERATED,
        metadata: {
          sellToken: sellToken.symbol,
          sellTokenAmount: sellTokenAmount.toString(),
          buyToken: buyToken.symbol,
          isIssuance: isIssuance.toString(),
          address: account,
        },
      });

      if (!result.success) {
        logger.logMessage({
          serviceName: KNOWN_SERVICES.GALLEON_DAPP,
          environment: process.env.NODE_ENV,
          timestamp: new Date().toISOString(),
          severity: LOG_SEVERITY.ERROR,
          functionName: "fetchAndCompareOptions",
          // @ts-ignore
          exception: JSON.stringify(result.error),
          message: `quote generation failed for sellToken: ${sellToken}, sellTokenAmount: ${sellTokenAmount}, buyToken: ${buyToken}, isIssuance: ${isIssuance}`,
          correlationId: undefined,
        });
      }
    }
  };

  return {
    bestOptionResult: result,
    isFetchingTradeData: isFetching,
    fetchAndCompareOptions,
  };
};
