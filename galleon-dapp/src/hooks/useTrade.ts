import { useCallback, useEffect, useState } from "react";

import { TransactionRequest } from "@ethersproject/abstract-provider";
import { BigNumber } from "@ethersproject/bignumber";
import { useEthers, useSendTransaction } from "@usedapp/core";

import { Token } from "constants/tokens";
import { fromWei, toWei } from "utils";
import { ZeroExData } from "utils/zeroExUtils";

import { useBalance } from "./useBalance";
import { logger } from "index";
import {
  KNOWN_LABELS,
  KNOWN_SERVICES,
  LOG_SEVERITY,
} from "@galleondao/logging-lib";

export const useTrade = (sellToken: Token, tradeData?: ZeroExData | null) => {
  const { account, library } = useEthers();
  const { sendTransaction, state } = useSendTransaction({
    transactionName: "trade",
  });
  const { getBalance } = useBalance();
  const spendingTokenBalance = getBalance(sellToken) || BigNumber.from(0);

  const [isTransacting, setIsTransacting] = useState(false);

  const executeTrade = useCallback(async () => {
    if (!account || !tradeData || !tradeData?.sellAmount) return;

    let requiredBalance = fromWei(
      BigNumber.from(tradeData.sellAmount),
      sellToken.decimals
    );

    if (spendingTokenBalance.lt(requiredBalance)) return;

    const txRequest: TransactionRequest = {
      chainId: Number(tradeData.chainId) ?? undefined,
      from: account,
      to: tradeData.to,
      data: tradeData.data,
      value: BigNumber.from(tradeData.value),
      // gas: undefined, use metamask estimated gas limit
    };

    try {
      setIsTransacting(true);
      // const tx = await library?.getSigner().sendTransaction(txRequest)
      const TRANSACTION_LABEL = "TRADE TRANSACTION SENT";
      logger.logCounter({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: TRANSACTION_LABEL,
        metadata: {
          from: account,
          to: tradeData.to,
          value: tradeData.value,
        },
      });

      await sendTransaction(txRequest);
    } catch (error) {
      setIsTransacting(false);
      console.log("Error sending transaction", error);
      logger.logMessage({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        severity: LOG_SEVERITY.ERROR,
        functionName: "fetchAndCompareOptions",
        // @ts-ignore
        exception: JSON.stringify(result.error),
        message: `Trade transaction failed: ${sellToken}, from: ${account}, to: ${tradeData.to}, value: ${tradeData.value}`,
        correlationId: undefined,
      });
    }
  }, [account, tradeData]);

  useEffect(() => {
    if (state.status !== "Mining") setIsTransacting(false);
  }, [state]);

  return { executeTrade, isTransacting };
};
