import { useCallback, useState } from "react";

import { BigNumber } from "@ethersproject/bignumber";
import { useTransactions } from "@usedapp/core";

import { MAINNET, OPTIMISM } from "constants/chains";
import { ETH, MATIC, Token } from "constants/tokens";
import { useAccount } from "hooks/useAccount";
import { useNetwork } from "hooks/useNetwork";
import { fromWei } from "utils";
import {
  ExchangeIssuanceQuote,
  PerpExchangeIssuanceQuote,
} from "utils/exchangeIssuanceQuotes";
import { getIssuanceModule } from "utils/issuanceModule";
import { getStoredTransaction } from "utils/storedTransaction";
import { getAddressForToken } from "utils/tokens";

import { useBalance } from "./useBalance";
import {
  getExchangeIssuancePerpContract,
  useExchangeIssuancePerp,
} from "./useExchangeIssuancePerp";

export const useTradePerpExchangeIssuance = (
  isIssuance: boolean,
  setToken: Token,
  usdcToken: Token,
  quoteData?: PerpExchangeIssuanceQuote
) => {
  const { account, provider } = useAccount();
  const { chainId } = useNetwork();
  const { issueFixedSetFromUsdc, redeemFixedSetForUsdc } =
    useExchangeIssuancePerp();
  const { getBalance } = useBalance();
  const { addTransaction } = useTransactions();

  const setTokenAmount = quoteData?.setTokenAmount;
  const spendingTokenBalance =
    getBalance(isIssuance ? usdcToken.symbol : setToken.symbol) ||
    BigNumber.from(0);

  const [isTransactingPerpEI, setIsTransacting] = useState(false);

  const executePerpEITrade = useCallback(async () => {
    if (!account || !quoteData || !setTokenAmount) return;

    const usdcTokenAddress = getAddressForToken(usdcToken, chainId);
    const setTokenAddress = getAddressForToken(setToken, chainId);
    if (!usdcTokenAddress || !setTokenAddress) return;

    try {
      setIsTransacting(true);

      const contract = await getExchangeIssuancePerpContract(
        provider?.getSigner(),
        chainId ?? OPTIMISM.chainId
      );

      if (isIssuance) {
        let requiredBalance = fromWei(quoteData.estimate, usdcToken.decimals);

        if (spendingTokenBalance.lt(requiredBalance)) return;

        const maxAmountInputToken = quoteData.estimate;
        const issueTx = await issueFixedSetFromUsdc(
          contract,
          setTokenAddress,
          setTokenAmount,
          maxAmountInputToken,
          quoteData.gas
        );
        if (issueTx) {
          const storedTx = getStoredTransaction(issueTx, chainId);
          addTransaction(storedTx);
        }
      } else {
        let requiredBalance = fromWei(setTokenAmount, setToken.decimals);

        if (spendingTokenBalance.lt(requiredBalance)) return;

        const minOutputReceive = quoteData.estimate;

        const redeemTx = await redeemFixedSetForUsdc(
          contract,
          setTokenAddress,
          setTokenAmount,
          minOutputReceive,
          quoteData.gas
        );
        if (redeemTx) {
          const storedTx = getStoredTransaction(redeemTx, chainId);
          addTransaction(storedTx);
        }
      }

      setIsTransacting(false);
    } catch (error) {
      setIsTransacting(false);
      console.log("Error sending transaction", error);
    }
  }, [account, quoteData]);

  return { executePerpEITrade, isTransactingPerpEI };
};
