import { useEffect, useState } from 'react'
import useDebouncedEffect from 'use-debounced-effect'
import { colors } from 'styles/colors'

import { InfoOutlineIcon, UpDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, useEthers } from '@usedapp/core'

import ConnectModal from 'components/header/ConnectModal'
import {
  ExchangeIssuanceLeveragedMainnetAddress,
  ExchangeIssuanceLeveragedPolygonAddress,
  ExchangeIssuanceZeroExAddress,
  zeroExRouterAddress,
} from 'constants/ethContractAddresses'
import { ETH, EthMaxYieldIndex, Token } from 'constants/tokens'
import { useApproval } from 'hooks/useApproval'
import { useBalance } from 'hooks/useBalance'
import { useBestTradeOption } from 'hooks/useBestTradeOption'
import { useTrade } from 'hooks/useTrade'
import { useTradeExchangeIssuance } from 'hooks/useTradeExchangeIssuance'
import { useTradeLeveragedExchangeIssuance } from 'hooks/useTradeLeveragedExchangeIssuance'
import { useTradeTokenLists } from 'hooks/useTradeTokenLists'
import { isSupportedNetwork, isValidTokenInput, toWei } from 'utils'

import { MAINNET, OPTIMISM, POLYGON } from 'constants/chains'
import {
  ExchangeIssuanceZeroExMainnetAddress,
  ExchangeIssuanceZeroExPolygonAddress,
} from 'constants/ethContractAddresses'
import {
  indexNamesMainnet,
  indexNamesOptimism,
  indexNamesPolygon,
} from 'constants/tokens'

import { maxPriceImpact } from 'hooks/useBestTradeOption'

import {
  getHasInsufficientFunds,
  getTradeInfoData0x,
  getTradeInfoDataFromEI,
  formattedFiat,
  getFormattedOuputTokenAmount,
  getFormattedPriceImpact,
} from './QuickTradeFormatter'
import QuickTradeSelector from './QuickTradeSelector'
import TradeInfo, { TradeInfoItem } from './TradeInfo'
import { getSelectTokenListItems, SelectTokenModal } from './SelectTokenModal'
import { SetComponent } from 'providers/SetComponents/SetComponentsProvider'
import { useAccount } from 'hooks/useAccount'
import { useNetwork } from 'hooks/useNetwork'
import {
  get0xExchangeIssuanceContract,
  getLeveragedExchangeIssuanceContract,
} from 'utils/contracts'
import {
  getFullCostsInUsd,
  getLeveragedExchangeIssuanceQuotes,
} from 'utils/exchangeIssuanceQuotes'
import { debounce } from 'lodash'

enum QuickTradeBestOption {
  zeroEx,
  exchangeIssuance,
  leveragedExchangeIssuance,
}

const QuickTrade = (props: {
  isNarrowVersion?: boolean
  singleToken?: Token
  components?: SetComponent[]
  eiOnly?: boolean
  children: any
}) => {
  const { account } = useAccount()
  const { chainId } = useNetwork()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isSelectInputTokenOpen,
    onOpen: onOpenSelectInputToken,
    onClose: onCloseSelectInputToken,
  } = useDisclosure()
  const {
    isOpen: isSelectOutputTokenOpen,
    onOpen: onOpenSelectOutputToken,
    onClose: onCloseSelectOutputToken,
  } = useDisclosure()


  const supportedNetwork = isSupportedNetwork(chainId ?? -1)

  const {
    isBuying,
    buyToken,
    buyTokenList,
    buyTokenPrice,
    nativeTokenPrice,
    sellToken,
    sellTokenList,
    sellTokenPrice,
    changeBuyToken,
    changeSellToken,
    swapTokenLists,
  } = useTradeTokenLists(chainId, props.singleToken)
  const { getBalance } = useBalance()

  const [bestOption, setBestOption] = useState<QuickTradeBestOption | null>(
    null,
  )
  const [buyTokenAmountFormatted, setBuyTokenAmountFormatted] = useState('0.0')
  const [sellTokenAmount, setSellTokenAmount] = useState('0')
  const [tradeInfoData, setTradeInfoData] = useState<TradeInfoItem[]>([])

  const {
    bestOptionResult,
    isFetchingTradeData,
    fetchAndCompareOptions,
  } = useBestTradeOption()

  const hasFetchingError =
    bestOptionResult && !bestOptionResult.success && !isFetchingTradeData

  const spenderAddress0x = get0xExchangeIssuanceContract(chainId)
  const spenderAddressLevEIL = getLeveragedExchangeIssuanceContract(chainId)

  const sellTokenAmountInWei = toWei(sellTokenAmount, sellToken.decimals)

  const sellTokenFiat = formattedFiat(
    parseFloat(sellTokenAmount),
    sellTokenPrice,
  )
  const buyTokenFiat = formattedFiat(
    parseFloat(buyTokenAmountFormatted),
    buyTokenPrice,
  )

  const priceImpact = isFetchingTradeData
    ? null
    : getFormattedPriceImpact(
        parseFloat(sellTokenAmount),
        sellTokenPrice,
        parseFloat(buyTokenAmountFormatted),
        buyTokenPrice,
        false,
      )

  const {
    isApproved: isApprovedForSwap,
    isApproving: isApprovingForSwap,
    onApprove: onApproveForSwap,
  } = useApproval(sellToken, zeroExRouterAddress, sellTokenAmountInWei)
  const {
    isApproved: isApprovedForEIL,
    isApproving: isApprovingForEIL,
    onApprove: onApproveForEIL,
  } = useApproval(sellToken, spenderAddressLevEIL, sellTokenAmountInWei)
  const {
    isApproved: isApprovedForEIZX,
    isApproving: isApprovingForEIZX,
    onApprove: onApproveForEIZX,
  } = useApproval(sellToken, spenderAddress0x, sellTokenAmountInWei)

  const { executeTrade, isTransacting } = useTrade(
    sellToken,
    bestOptionResult?.success ? bestOptionResult.dexData : null,
  )
  const { executeEITrade, isTransactingEI } = useTradeExchangeIssuance(
    isBuying,
    sellToken,
    buyToken,
    bestOptionResult?.success ? bestOptionResult.exchangeIssuanceData : null,
  )

  const {
    executeLevEITrade,
    isTransactingLevEI,
  } = useTradeLeveragedExchangeIssuance(
    isBuying,
    sellToken,
    buyToken,
    // TODO: simplify by just passing leveragedExchangeIssuanceData || null
    // TODO: test inside to only exectue trade when data !== null
    bestOptionResult?.success
      ? bestOptionResult.leveragedExchangeIssuanceData?.setTokenAmount ??
          BigNumber.from(0)
      : BigNumber.from(0),
    bestOptionResult?.success
      ? bestOptionResult.leveragedExchangeIssuanceData?.inputTokenAmount ??
          BigNumber.from(0)
      : BigNumber.from(0),
    bestOptionResult?.success
      ? bestOptionResult?.leveragedExchangeIssuanceData?.swapDataDebtCollateral
      : undefined,
    bestOptionResult?.success
      ? bestOptionResult?.leveragedExchangeIssuanceData?.swapDataPaymentToken
      : undefined,
  )

  const hasInsufficientFunds = getHasInsufficientFunds(
    bestOption === null,
    sellTokenAmountInWei,
    getBalance(sellToken.symbol),
  )

  /**
   * Determine the best trade option.
   */
  useEffect(() => {
    if (bestOptionResult === null || !bestOptionResult.success) {
      setTradeInfoData([])
      return
    }

    const gasLimit0x = BigNumber.from(bestOptionResult.dexData?.gas ?? '0')
    const gasPrice0x = BigNumber.from(bestOptionResult.dexData?.gasPrice ?? '0')
    const gasPriceEI = BigNumber.from(
      bestOptionResult.exchangeIssuanceData?.gasPrice ?? '0',
    )
    const gasPriceLevEI =
      bestOptionResult.leveragedExchangeIssuanceData?.gasPrice ??
      BigNumber.from(0)
    const gasLimit = 1800000 // TODO: Make gasLimit dynamic

    const gas0x = gasPrice0x.mul(gasLimit0x)
    const gasEI = gasPriceEI.mul(gasLimit)
    const gasLevEI = gasPriceLevEI.mul(gasLimit)

    const fullCosts0x = getFullCostsInUsd(
      toWei(sellTokenAmount, sellToken.decimals),
      gas0x,
      sellToken.decimals,
      sellTokenPrice,
      nativeTokenPrice,
    )
    const fullCostsEI = getFullCostsInUsd(
      bestOptionResult.exchangeIssuanceData?.inputTokenAmount,
      gasEI,
      sellToken.decimals,
      sellTokenPrice,
      nativeTokenPrice,
    )
    const fullCostsLevEI = getFullCostsInUsd(
      bestOptionResult.leveragedExchangeIssuanceData?.inputTokenAmount,
      gasLevEI,
      sellToken.decimals,
      sellTokenPrice,
      nativeTokenPrice,
    )

    console.log(fullCosts0x, fullCostsEI, fullCostsLevEI, 'FC')

    const priceImpactDex = parseFloat(
      bestOptionResult?.dexData?.estimatedPriceImpact ?? '5',
    )
    const bestOption = getBestTradeOption(
      fullCosts0x,
      fullCostsEI,
      fullCostsLevEI,
      priceImpactDex,
    )
    const bestOptionIs0x = bestOption === QuickTradeBestOption.zeroEx
    const bestOptionIsLevEI =
      bestOption === QuickTradeBestOption.leveragedExchangeIssuance

    const tradeDataEI = bestOptionIsLevEI
      ? bestOptionResult.leveragedExchangeIssuanceData
      : bestOptionResult.exchangeIssuanceData
    const tradeDataGasPriceEI = bestOptionIsLevEI ? gasPriceLevEI : gasPriceEI
    const tradeDataSetAmountEI = bestOptionIsLevEI
      ? bestOptionResult.leveragedExchangeIssuanceData?.setTokenAmount ??
        BigNumber.from(0)
      : bestOptionResult.exchangeIssuanceData?.setTokenAmount ??
        BigNumber.from(0)

    const tradeInfoData = bestOptionIs0x
      ? getTradeInfoData0x(bestOptionResult.dexData, buyToken, chainId)
      : getTradeInfoDataFromEI(
          tradeDataSetAmountEI,
          tradeDataGasPriceEI,
          buyToken,
          sellToken,
          tradeDataEI,
          chainId,
          isBuying,
        )

    const buyTokenAmountFormatted = getFormattedOuputTokenAmount(
      bestOption !== QuickTradeBestOption.zeroEx,
      buyToken.decimals,
      bestOptionResult?.success
        ? bestOptionResult.dexData?.minOutput
        : undefined,
      isBuying ? tradeDataEI?.setTokenAmount : tradeDataEI?.inputTokenAmount,
    )

    console.log('BESTOPTION', bestOption)
    setTradeInfoData(tradeInfoData)
    setBestOption(bestOption)
    setBuyTokenAmountFormatted(buyTokenAmountFormatted)
  }, [bestOptionResult])

  useEffect(() => {
    setTradeInfoData([])
  }, [chainId])

  // useDebouncedEffect(
  //   () => {
  //     fetchOptions()
  //   },
  //   {
  //     timeout: 500,
  //     ignoreInitialCall: true,
  //   },
  //   [buyToken, sellToken, sellTokenAmount],
  // )

  useEffect(() => {
    fetchOptions()
  }, [buyToken, sellToken, sellTokenAmount])

  // Does user need protecting from productive assets?
  const [requiresProtection, setRequiresProtection] = useState(false)

  const fetchOptions = () => {
    // Right now we only allow setting the sell amount, so no need to check
    // buy token amount here
    const sellTokenInWei = toWei(sellTokenAmount, sellToken.decimals)
    if (sellTokenInWei.isZero() || sellTokenInWei.isNegative()) return
    fetchAndCompareOptions(
      sellToken,
      sellTokenAmount,
      sellTokenPrice,
      buyToken,
      // buyTokenAmount,
      buyTokenPrice,
      isBuying,
    )
  }

  const getIsApproved = () => {
    switch (bestOption) {
      case QuickTradeBestOption.exchangeIssuance:
        return isApprovedForEIZX
      case QuickTradeBestOption.leveragedExchangeIssuance:
        return isApprovedForEIL
      default:
        return isApprovedForSwap
    }
  }

  const getIsApproving = () => {
    switch (bestOption) {
      case QuickTradeBestOption.exchangeIssuance:
        return isApprovingForEIZX
      case QuickTradeBestOption.leveragedExchangeIssuance:
        return isApprovingForEIL
      default:
        return isApprovingForSwap
    }
  }

  const getOnApprove = () => {
    switch (bestOption) {
      case QuickTradeBestOption.exchangeIssuance:
        return onApproveForEIZX()
      case QuickTradeBestOption.leveragedExchangeIssuance:
        return onApproveForEIL()
      default:
        return onApproveForSwap()
    }
  }

  const isNotTradable = (token: Token | undefined) => {
    if (token && chainId === MAINNET.chainId)
      return (
        indexNamesMainnet.filter((t) => t.symbol === token.symbol).length === 0
      )
    if (token && chainId === POLYGON.chainId)
      return (
        indexNamesPolygon.filter((t) => t.symbol === token.symbol).length === 0
      )
    if (token && chainId === OPTIMISM.chainId)
      return (
        indexNamesOptimism.filter((t) => t.symbol === token.symbol).length === 0
      )
    return false
  }

  /**
   * Get the correct trade button label according to different states
   * @returns string label for trade button
   */
  const getTradeButtonLabel = () => {
    if (!supportedNetwork) return 'Wrong Network'

    if (!account) {
      return 'Connect Wallet'
    }

    if (isNotTradable(props.singleToken)) {
      let chainName = 'This Network'
      switch (chainId) {
        case MAINNET.chainId:
          chainName = 'Mainnet'
          break
        case POLYGON.chainId:
          chainName = 'Polygon'
          break
        case OPTIMISM.chainId:
          chainName = 'Optimism'
          break
      }

      return `Not Available on ${chainName}`
    }

    if (sellTokenAmount === '0') {
      return 'Enter an amount'
    }

    if (hasInsufficientFunds) {
      return 'Insufficient funds'
    }

    if (hasFetchingError) {
      return 'Try again'
    }

    const isNativeToken =
      sellToken.symbol === 'ETH' || sellToken.symbol === 'MATIC'

    if (!isNativeToken && getIsApproving()) {
      return 'Approving...'
    }

    if (!isNativeToken && !getIsApproved()) {
      return 'Approve Tokens'
    }

    if (isTransacting || isTransactingEI || isTransactingLevEI)
      return 'Trading...'

    return 'Trade'
  }

  const onChangeSellTokenAmount = debounce((token: Token, input: string) => {
    if (!isValidTokenInput(input, token.decimals)) return
    setSellTokenAmount(input || '0')
  }, 1000)

  const onClickTradeButton = async () => {
    if (!account) {
      // Open connect wallet modal
      onOpen()
      return
    }

    if (hasInsufficientFunds) return

    if (hasFetchingError) {
      fetchOptions()
      return
    }

    const isNativeToken =
      sellToken.symbol === 'ETH' || sellToken.symbol === 'MATIC'
    if (!getIsApproved() && !isNativeToken) {
      await getOnApprove()
      return
    }

    switch (bestOption) {
      case QuickTradeBestOption.zeroEx:
        await executeTrade()
        break
      case QuickTradeBestOption.exchangeIssuance:
        await executeEITrade()
        break
      case QuickTradeBestOption.leveragedExchangeIssuance:
        await executeLevEITrade()
        break
      default:
      // Nothing
    }
  }

  const getButtonDisabledState = () => {
    if (!supportedNetwork) return true
    if (!account) return false
    if (hasFetchingError) return false
    return (
      sellTokenAmount === '0' ||
      hasInsufficientFunds ||
      isTransacting ||
      isTransactingEI ||
      isTransactingLevEI ||
      isNotTradable(props.singleToken)
    )
  }

  const buttonLabel = getTradeButtonLabel()
  const isButtonDisabled = getButtonDisabledState()
  const isLoading = getIsApproving() || isFetchingTradeData

  const isNarrow = props.isNarrowVersion ?? false
  const paddingX = isNarrow ? '16px' : '40px'

  const inputTokenBalances = sellTokenList.map(
    (sellToken) => getBalance(sellToken.symbol) ?? BigNumber.from(0),
  )
  const outputTokenBalances = buyTokenList.map(
    (buyToken) => getBalance(buyToken.symbol) ?? BigNumber.from(0),
  )
  const inputTokenItems = getSelectTokenListItems(
    sellTokenList,
    inputTokenBalances,
  )
  const outputTokenItems = getSelectTokenListItems(
    buyTokenList,
    outputTokenBalances,
  )

  return (
    <Flex direction="column" py="20px" px={['16px', paddingX]} height={'100%'}>
      <>{props.children}</>
      <Flex direction="column" my="20px">
        <QuickTradeSelector
          title="From"
          config={{
            isInputDisabled: isNotTradable(props.singleToken),
            isNarrowVersion: isNarrow,
            isSelectorDisabled: false,
            isReadOnly: false,
          }}
          selectedToken={sellToken}
          formattedFiat={sellTokenFiat}
          tokenList={sellTokenList}
          onChangeInput={onChangeSellTokenAmount}
          onSelectedToken={(_) => {
            if (inputTokenItems.length > 1) onOpenSelectInputToken()
          }}
        />
        <Box h="12px" alignSelf={'flex-end'} m={'-12px 0 12px 0'}>
          <IconButton
            background="transparent"
            margin={'6px 12px'}
            aria-label="Search database"
            borderColor={colors.themeNavy}
            borderRadius={'50px'}
            color={colors.themeNavy}
            icon={<UpDownIcon />}
            onClick={() => swapTokenLists()}
          />
        </Box>
        <QuickTradeSelector
          title="To"
          config={{
            isInputDisabled: true,
            isNarrowVersion: isNarrow,
            isSelectorDisabled: false,
            isReadOnly: true,
          }}
          selectedToken={buyToken}
          selectedTokenAmount={buyTokenAmountFormatted}
          formattedFiat={buyTokenFiat}
          priceImpact={priceImpact ?? undefined}
          tokenList={buyTokenList}
          onChangeInput={(token: Token, input: string) => {}}
          onSelectedToken={(_) => {
            if (outputTokenItems.length > 1) onOpenSelectOutputToken()
          }}
        />
      </Flex>
      <Flex direction="column">

        {tradeInfoData.length > 0 && <TradeInfo data={tradeInfoData} />}
        {hasFetchingError && (
          <Text align="center" color={colors.themeNavy} p="16px">
            {/* @ts-ignore */}
            {bestOptionResult.error.message}
          </Text>
        )}

        <TradeButton
          label={buttonLabel}
          background={colors.themeChampagne}
          isDisabled={isButtonDisabled}
          isLoading={isLoading}
          onClick={onClickTradeButton}
        />
      </Flex>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
      <SelectTokenModal
        isOpen={isSelectInputTokenOpen}
        onClose={onCloseSelectInputToken}
        onSelectedToken={(tokenSymbol) => {
          changeSellToken(tokenSymbol)
          onCloseSelectInputToken()
        }}
        items={inputTokenItems}
      />
      <SelectTokenModal
        isOpen={isSelectOutputTokenOpen}
        onClose={onCloseSelectOutputToken}
        onSelectedToken={(tokenSymbol) => {
          changeBuyToken(tokenSymbol)
          onCloseSelectOutputToken()
        }}
        items={outputTokenItems}
      />
    </Flex>
  )
}

interface TradeButtonProps {
  label: string
  background: string
  isDisabled: boolean
  isLoading: boolean
  onClick: () => void
}

const TradeButton = (props: TradeButtonProps) => (
  <Button
    background={colors.themeNavy}
    border="2px"
    borderRadius="1rem"
    borderColor={colors.themeNavy}
    color={colors.themeWhite}
    disabled={props.isDisabled}
    fontSize="24px"
    fontWeight="400"
    isLoading={props.isLoading}
    height="54px"
    w="100%"
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)


export function getBestTradeOption(
  fullCosts0x: number | null,
  fullCostsEI: number | null,
  fullCostsLevEI: number | null,
  priceImpactDex: number,
): QuickTradeBestOption {
  if (fullCostsEI === null && fullCostsLevEI === null) {
    return QuickTradeBestOption.zeroEx
  }

  const quotes: number[][] = []
  if (fullCosts0x) {
    quotes.push([QuickTradeBestOption.zeroEx, fullCosts0x])
  }
  if (fullCostsEI) {
    quotes.push([QuickTradeBestOption.exchangeIssuance, fullCostsEI])
  }
  if (fullCostsLevEI) {
    quotes.push([
      QuickTradeBestOption.leveragedExchangeIssuance,
      fullCostsLevEI,
    ])
  }
  const cheapestQuotes = quotes.sort((q1, q2) => q1[1] - q2[1])

  if (cheapestQuotes.length <= 0) {
    return QuickTradeBestOption.zeroEx
  }

  const cheapestQuote = cheapestQuotes[0]
  const bestOption = cheapestQuote[0]

  // If only one quote, return best option immediately
  if (cheapestQuotes.length === 1) {
    return bestOption
  }

  // If multiple quotes, check price impact of 0x option
  if (
    bestOption === QuickTradeBestOption.zeroEx &&
    priceImpactDex >= maxPriceImpact
  ) {
    // In case price impact is too high, return cheapest exchange issuance
    return cheapestQuotes[1][0]
  }

  return bestOption
}

export default QuickTrade
