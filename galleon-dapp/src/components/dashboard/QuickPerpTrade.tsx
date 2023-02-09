import { useEffect, useState } from "react";
import { colors } from "styles/colors";

import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BigNumber } from "@ethersproject/bignumber";

import ConnectModal from "components/header/ConnectModal";
import { indexNamesArbitrum, Token, USDC } from "constants/tokens";
import { useApproval } from "hooks/useApproval";
import { useBalance } from "hooks/useBalance";
import { useBestTradeOption } from "hooks/useBestTradeOption";

import {
  displayFromWei,
  isSupportedNetwork,
  isValidTokenInput,
  toWei,
} from "utils";

import {
  ARBITRUM,
  ChainData,
  MAINNET,
  OPTIMISM,
  POLYGON,
} from "constants/chains";
import {
  indexNamesMainnet,
  indexNamesOptimism,
  indexNamesPolygon,
} from "constants/tokens";

import { getHasInsufficientFunds } from "./QuickTradeFormatter";
import QuickTradeSelector from "./QuickTradeSelector";
import { SetComponent } from "providers/SetComponents/SetComponentsProvider";
import { useAccount } from "hooks/useAccount";
import { useNetwork } from "hooks/useNetwork";
import { getPerpExchanceIssuanceContract } from "utils/contracts";
import { debounce } from "lodash";
import { useTradePerpExchangeIssuance } from "hooks/useTradePerpExchangeIssuance";

// Slippage hard coded to .5%
export const slippagePercentage = 1;

enum QuickTradeBestOption {
  perpExchangeIssuance,
}

const QuickPerpTrade = (props: {
  isNarrowVersion?: boolean;
  singleToken?: Token;
  components?: SetComponent[];
  eiOnly?: boolean;
  children: any;
}) => {
  const { account } = useAccount();
  const { chainId } = useNetwork();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isIssuance, setIsIssuance] = useState(false);

  const supportedNetwork = isSupportedNetwork(chainId ?? -1);

  const { getBalance } = useBalance();

  const [setTokenAmount, setSetTokenAmount] = useState("0");

  const { isFetchingTradeData, fetchPerpOption, perpIssuanceResult } =
    useBestTradeOption();

  const hasFetchingError =
    !isFetchingTradeData && perpIssuanceResult && !perpIssuanceResult?.success;

  const spenderAddressPerpEI = getPerpExchanceIssuanceContract(chainId);

  const sellTokenAmountInWei = toWei(
    setTokenAmount,
    props.singleToken.decimals
  );

  const {
    isApproved: isApprovedForEIPerp,
    isApproving: isApprovingForEIPerp,
    onApprove: onApproveForEIPerp,
  } = useApproval(
    isIssuance ? USDC : props.singleToken,
    spenderAddressPerpEI,
    isIssuance
      ? perpIssuanceResult?.data.estimate.mul(BigNumber.from(2))
      : sellTokenAmountInWei.mul(BigNumber.from(2))
  );

  const { executePerpEITrade, isTransactingPerpEI } =
    useTradePerpExchangeIssuance(
      isIssuance,
      props.singleToken,
      USDC,
      perpIssuanceResult?.data
    );

  const setTokenBalance = getBalance(props.singleToken.symbol);

  const usdcTokenBalance = getBalance(USDC.symbol);

  const hasInsufficientFunds = getHasInsufficientFunds(
    false,
    isIssuance
      ? perpIssuanceResult?.data?.estimate ?? BigNumber.from(0)
      : sellTokenAmountInWei,
    isIssuance ? usdcTokenBalance : setTokenBalance
  );
  //
  useEffect(() => {
    fetchOptions();
  }, [props.singleToken, setTokenAmount, isIssuance, isApprovedForEIPerp]);

  const fetchOptions = () => {
    const setTokenInWei = toWei(setTokenAmount, props.singleToken.decimals);
    if (setTokenInWei.isZero() || setTokenInWei.isNegative()) return;

    fetchPerpOption(
      props.singleToken,
      setTokenAmount,
      isIssuance,
      slippagePercentage
    );
  };

  const isNotTradable = (token: Token | undefined) => {
    if (token && chainId === MAINNET.chainId)
      return (
        indexNamesMainnet.filter((t) => t.symbol === token.symbol).length === 0
      );
    if (token && chainId === POLYGON.chainId)
      return (
        indexNamesPolygon.filter((t) => t.symbol === token.symbol).length === 0
      );
    if (token && chainId === OPTIMISM.chainId)
      return (
        indexNamesOptimism.filter((t) => t.symbol === token.symbol).length === 0
      );
    if (token && chainId === ARBITRUM.chainId)
      return (
        indexNamesArbitrum.filter((t) => t.symbol === token.symbol).length === 0
      );
    return false;
  };

  const getSupportedNetworks = (token: Token | undefined): ChainData[] => {
    const supportedNetworks = [];
    if (token) {
      if (
        indexNamesMainnet.filter((t) => t.symbol === token.symbol).length !== 0
      )
        supportedNetworks.push(MAINNET);
      if (
        indexNamesPolygon.filter((t) => t.symbol === token.symbol).length !== 0
      )
        supportedNetworks.push(POLYGON);
      if (
        indexNamesOptimism.filter((t) => t.symbol === token.symbol).length !== 0
      )
        supportedNetworks.push(OPTIMISM);
      if (
        indexNamesArbitrum.filter((t) => t.symbol === token.symbol).length !== 0
      )
        supportedNetworks.push(ARBITRUM);
    }
    return supportedNetworks;
  };

  /**
   * Get the correct trade button label according to different states
   * @returns string label for trade button
   */
  const getTradeButtonLabel = () => {
    if (!supportedNetwork) return "Wrong Network";

    if (!account) {
      return "Connect Wallet";
    }

    if (isNotTradable(props.singleToken)) {
      const supportedNetworks = getSupportedNetworks(props.singleToken);
      switch (supportedNetworks.length) {
        case 0:
          return "Currently Unavailable";
        case 1:
          return `Only available on ${
            supportedNetworks[0].alias
              ? supportedNetworks[0].alias
              : supportedNetworks[0].name
          }`;

        //More than one supported network
        default:
          return `Available on: ${supportedNetworks.map((net) => {
            return `${net.alias ? net.alias : net.name}`;
          })}`;
      }
    }

    if (setTokenAmount === "0") {
      return "Enter an amount";
    }

    if (hasInsufficientFunds) {
      return "Insufficient funds";
    }

    if (hasFetchingError) {
      return "Try again";
    }

    const isNativeToken =
      props.singleToken.symbol === "ETH" ||
      props.singleToken.symbol === "MATIC";

    if (!isNativeToken && isApprovingForEIPerp) {
      return "Approving...";
    }

    if (!isNativeToken && !isApprovedForEIPerp) {
      return "Approve Tokens";
    }

    if (isTransactingPerpEI) return "Trading...";

    return "Trade";
  };

  const onChangeSellTokenAmount = debounce(
    (token: Token, input: string) => {
      if (!isValidTokenInput(input, token.decimals)) return;
      setSetTokenAmount(input || "0");
    },
    1000,
    { trailing: true }
  );

  const onClickTradeButton = async () => {
    if (!account) {
      // Open connect wallet modal
      onOpen();
      return;
    }

    if (hasInsufficientFunds) return;

    if (hasFetchingError) {
      fetchOptions();
      return;
    }

    const isNativeToken =
      props.singleToken.symbol === "ETH" ||
      props.singleToken.symbol === "MATIC";
    if (!isApprovedForEIPerp && !isNativeToken) {
      await onApproveForEIPerp();
      return;
    }

    await executePerpEITrade();
  };

  const getButtonDisabledState = () => {
    if (!supportedNetwork) return true;
    if (!account) return false;
    if (hasFetchingError) return false;
    return (
      setTokenAmount === "0" ||
      hasInsufficientFunds ||
      isTransactingPerpEI ||
      isNotTradable(props.singleToken)
    );
  };

  const buttonLabel = getTradeButtonLabel();
  const isButtonDisabled = getButtonDisabledState();
  const isLoading = isApprovingForEIPerp || isFetchingTradeData;

  const isNarrow = props.isNarrowVersion ?? false;
  const paddingX = isNarrow ? "16px" : "40px";

  return (
    <Flex direction="column" py="20px" px={["16px", paddingX]} height={"100%"}>
      <>{props.children}</>
      <Flex
        direction="column"
        className="border-l rounded-t-xl border-theme-navy "
        mt="20px"
        pb="20px"
      >
        <span className="relative z-0 mb-2 inline-flex shadow-sm rounded-md">
          {/* <button
            onClick={() => {
              setIsIssuance(true);
            }}
            type="button"
            className={
              (isIssuance
                ? "bg-theme-champagne font-semibold "
                : "bg-theme-pan-champagne ") +
              " relative inline-flex items-center px-4 py-2 rounded-tl-xl border-r border-t border-b  border-theme-navy  text-sm  text-theme-navy hover:bg-white focus:z-10 "
            }
          >
            Flash Issue
          </button> */}

          <button
            onClick={() => {
              setIsIssuance(false);
            }}
            type="button"
            className={
              (isIssuance
                ? "bg-theme-champagne font-semibold "
                : "bg-theme-pan-champagne ") +
              " relative inline-flex items-center px-4 py-2 rounded-tl-xl rounded-r-xl border-r border-t border-b  border-theme-navy  text-sm  text-theme-navy hover:bg-white focus:z-10 "
            }
          >
            Flash Redeem
          </button>
        </span>
        <div className="ml-4">
          <Box pr="0px" mb={"8px"}>
            <span className="inline-flex text-sm">
              USDC Balance: {displayFromWei(usdcTokenBalance, 6, 6)}
            </span>
          </Box>
          <QuickTradeSelector
            title={isIssuance ? "Issue" : "Redeem"}
            config={{
              isInputDisabled: isNotTradable(props.singleToken),
              isNarrowVersion: isNarrow,
              isSelectorDisabled: false,
              isReadOnly: false,
            }}
            selectedToken={props.singleToken}
            onChangeInput={onChangeSellTokenAmount}
          />
        </div>
      </Flex>
      <Flex direction="column">
        <Box className="border-l border-theme-navy" pr="0px" mb={"16px"}>
          <span className="block ml-4 text-md pb-2">
            {isIssuance
              ? "Estimated USDC required for issuance (inc. slippage)"
              : "Estimated USDC output for redemption (inc. slippage)"}
          </span>
          <Image
            className="inline-flex mr-2 ml-4"
            src={USDC.image}
            alt={`${USDC.symbol} logo`}
            w="40px"
          />

          <span className="inline-flex ml-2.5 text-md font-semibold">
            {displayFromWei(
              perpIssuanceResult?.data
                ? perpIssuanceResult.data.estimate
                : BigNumber.from(0),
              6,
              6
            )}
          </span>
        </Box>

        {hasFetchingError && (
          <Text align="center" color={colors.themeNavy} p="16px">
            {/* @ts-ignore */}
            {"Error fetching trade data"}
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
    </Flex>
  );
};

interface TradeButtonProps {
  label: string;
  background: string;
  isDisabled: boolean;
  isLoading: boolean;
  onClick: () => void;
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
);

export default QuickPerpTrade;
