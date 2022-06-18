import { useCallback, useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { useTransactions } from '@usedapp/core'

import { MAINNET, OPTIMISM } from 'constants/chains'
import { ETH, MATIC, Token } from 'constants/tokens'
import { useAccount } from 'hooks/useAccount'
import { useNetwork } from 'hooks/useNetwork'
import { fromWei } from 'utils'
import { ExchangeIssuanceQuote } from 'utils/exchangeIssuanceQuotes'
import { getIssuanceModule } from 'utils/issuanceModule'
import { getStoredTransaction } from 'utils/storedTransaction'
import { getAddressForToken } from 'utils/tokens'

import { useBalance } from './useBalance'
import {
  getExchangeIssuancePerpContract,
  useExchangeIssuancePerp,
} from './useExchangeIssuancePerp'

export const useTradePerpExchangeIssuance = (
  isIssuance: boolean,
  inputToken: Token,
  outputToken: Token,
  quoteData?: ExchangeIssuanceQuote | null,
) => {
  const { account, provider } = useAccount()
  const { chainId } = useNetwork()
  const {
    issueFixedSetFromUsdc,
    redeemFixedSetForUsdc,
  } = useExchangeIssuancePerp()
  const { getBalance } = useBalance()
  const { addTransaction } = useTransactions()

  const setTokenAmount = quoteData?.setTokenAmount
  const setTokenSymbol = isIssuance ? outputToken.symbol : inputToken.symbol
  const spendingTokenBalance =
    getBalance(inputToken.symbol) || BigNumber.from(0)

  const [isTransactingEI, setIsTransacting] = useState(false)

  const executeEITrade = useCallback(async () => {
    if (!account || !quoteData || !setTokenAmount) return

    const outputTokenAddress = getAddressForToken(outputToken, chainId)
    const inputTokenAddress = getAddressForToken(inputToken, chainId)
    if (!outputTokenAddress || !inputTokenAddress) return

    let requiredBalance = fromWei(
      quoteData.inputTokenAmount,
      inputToken.decimals,
    )
    if (spendingTokenBalance.lt(requiredBalance)) return

    try {
      setIsTransacting(true)

      const contract = await getExchangeIssuancePerpContract(
        provider?.getSigner(),
        chainId ?? OPTIMISM.chainId,
      )

      if (isIssuance) {
        const maxAmountInputToken = quoteData.inputTokenAmount
        const issueTx = await issueFixedSetFromUsdc(
          contract,
          outputTokenAddress,
          inputTokenAddress,
          setTokenAmount,
          maxAmountInputToken,
          quoteData.tradeData,
          quoteData.gas,
        )
        if (issueTx) {
          const storedTx = getStoredTransaction(issueTx, chainId)
          addTransaction(storedTx)
        }
      } else {
        const minOutputReceive = quoteData.inputTokenAmount

        const redeemTx = await redeemFixedSetForUsdc(
          contract,
          inputTokenAddress,
          outputTokenAddress,
          setTokenAmount,
          minOutputReceive,
          quoteData.tradeData,
          quoteData.gas,
        )
        if (redeemTx) {
          const storedTx = getStoredTransaction(redeemTx, chainId)
          addTransaction(storedTx)
        }
      }

      setIsTransacting(false)
    } catch (error) {
      setIsTransacting(false)
      console.log('Error sending transaction', error)
    }
  }, [account, quoteData])

  return { executeEITrade, isTransactingEI }
}
