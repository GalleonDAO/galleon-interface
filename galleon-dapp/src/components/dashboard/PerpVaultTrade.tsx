import { useEffect, useState } from 'react'
import useDebouncedEffect from 'use-debounced-effect'
import { colors } from 'styles/colors'

import { UpDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, useEthers } from '@usedapp/core'

import ConnectModal from 'components/header/ConnectModal'
import {
  ExchangeIssuanceLeveragedMainnetAddress,
  ExchangeIssuanceLeveragedPolygonAddress,
  ExchangeIssuanceZeroExAddress,
  perpExchangeIssuanceOptimismAddress,
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
import { useTradePerpExchangeIssuance } from 'hooks/useTradePerpExchangeIssuance'

enum QuickTradeBestOption {
  zeroEx,
  exchangeIssuance,
  leveragedExchangeIssuance,
  perpExchangeIssuance,
}

const QuickTrade = (props: {
  isNarrowVersion?: boolean
  singleToken?: Token
  children: any
}) => {
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
  const { account, chainId } = useEthers()

  const supportedNetwork = isSupportedNetwork(chainId ?? -1)

  const {
    isBuying,
    buyToken,
    buyTokenList,
    buyTokenPrice,
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

  const spenderAddressPerpEI = perpExchangeIssuanceOptimismAddress

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
    isApproved: isApprovedForPerpEI,
    isApproving: isApprovingForPerpEI,
    onApprove: onApproveForPerpEI,
  } = useApproval(sellToken, spenderAddressPerpEI, sellTokenAmountInWei)

  const {
    executePerpEITrade,
    isTransactingPerpEI,
  } = useTradePerpExchangeIssuance(
    isBuying,
    sellToken,
    buyToken,
    sellTokenAmountInWei,
    null,
    null,
  )

  const hasInsufficientFunds = getHasInsufficientFunds(
    bestOption === null,
    sellTokenAmountInWei,
    getBalance(sellToken),
  )

  /**
   * Determine the best trade option.
   */
  useEffect(() => {
    if (bestOptionResult === null || !bestOptionResult.success) {
      setTradeInfoData([])
      return
    }

    // TODO: calculate required flash issuance 

    const tradeInfoData = null
    //  getTradeInfoDataFromEI(
    //     tradeDataSetAmountEI,
    //     tradeDataGasPriceEI,
    //     buyToken,
    //     sellToken,
    //     tradeDataEI,
    //     chainId,
    //     isBuying
    //   );

    const buyTokenAmountFormatted = null
    // getFormattedOuputTokenAmount(
    //   isBuying ? setTokenAmount : tradeDataEI?.inputTokenAmount
    // );

    setTradeInfoData(tradeInfoData)
    setBestOption(bestOption)
    setBuyTokenAmountFormatted(buyTokenAmountFormatted)
  }, [bestOptionResult])

  useEffect(() => {
    setTradeInfoData([])
  }, [chainId])

  useDebouncedEffect(
    // TODO: branch into separate perp issuance logic here
    () => {
      fetchOptions()
    },
    {
      timeout: 500,
      ignoreInitialCall: true,
    },
    [buyToken, sellToken, sellTokenAmount],
  )

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
    return isApprovedForPerpEI
  }

  const getIsApproving = () => {
    return isApprovingForPerpEI
  }

  const getOnApprove = () => {
    return onApproveForPerpEI()
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

    if (isTransactingPerpEI) return 'Trading...'

    return 'Trade'
  }

  const onChangeSellTokenAmount = (token: Token, input: string) => {
    if (!isValidTokenInput(input, token.decimals)) return
    setSellTokenAmount(input || '0')
  }

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

    await executePerpEITrade()
  }

  const getButtonDisabledState = () => {
    if (!supportedNetwork) return true
    if (!account) return false
    if (hasFetchingError) return false
    return (
      sellTokenAmount === '0' ||
      hasInsufficientFunds ||
      isTransactingPerpEI ||
      isNotTradable(props.singleToken)
    )
  }

  const buttonLabel = getTradeButtonLabel()
  const isButtonDisabled = getButtonDisabledState()
  const isLoading = getIsApproving() || isFetchingTradeData

  const isNarrow = props.isNarrowVersion ?? false
  const paddingX = isNarrow ? '16px' : '40px'

  const inputTokenBalances = sellTokenList.map(
    (sellToken) => getBalance(sellToken) ?? BigNumber.from(0),
  )
  const outputTokenBalances = buyTokenList.map(
    (buyToken) => getBalance(buyToken) ?? BigNumber.from(0),
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

export default QuickTrade
