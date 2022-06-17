import { useCallback, useEffect, useState } from "react";

import { BigNumber } from "set.js";
import { colors } from "styles/colors";

import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { formatUnits } from "@ethersproject/units";
import { useNetwork } from "providers/Network/NetworkProvider";

import { Token } from "constants/tokens";
import { useBalance } from "hooks/useBalance";
import { isValidTokenInput } from "utils";

import { formattedBalance } from "./QuickTradeFormatter";

interface InputSelectorConfig {
  isNarrowVersion: boolean;
  isInputDisabled?: boolean;
  isSelectorDisabled?: boolean;
  isReadOnly?: boolean;
}

const QuickTradeSelector = (props: {
  title: string;
  config: InputSelectorConfig;
  selectedToken: Token;
  selectedTokenAmount?: string;
  priceImpact?: { priceImpact: string; colorCoding: string };
  formattedFiat: string;
  tokenList: Token[];
  onChangeInput: (token: Token, input: string) => void;
  onSelectedToken: (symbol: string) => void;
}) => {
  const {
    state: { network },
  } = useNetwork();
  const chainId = network.chainId;
  const { getBalance } = useBalance();

  const [inputString, setInputString] = useState<string>(
    props.selectedTokenAmount === "0" ? "" : props.selectedTokenAmount || ""
  );
  const [tokenBalance, setTokenBalance] = useState<string>(
    BigNumber.from(0).toString()
  );

  useEffect(() => {
    setInputString(
      props.selectedTokenAmount === "0" ? "" : props.selectedTokenAmount || ""
    );
  }, [props.selectedTokenAmount]);

  useEffect(() => {
    const tokenBal = getBalance(props.selectedToken.symbol);
    setTokenBalance(formattedBalance(props.selectedToken, tokenBal));
  }, [props.selectedToken, getBalance, chainId]);

  const { config, selectedToken } = props;
  const borderColor = colors.themeNavy;

  const height = "64px";
  const wideWidths = ["250px", "180px"];
  const narrowWidths = ["250px"];
  const widths = config.isNarrowVersion ? narrowWidths : wideWidths;

  const onChangeInput = useCallback(
    (amount: string) => {
      if (!amount) {
        setInputString("");
        props.onChangeInput(props.selectedToken, "");
      }

      if (
        props.onChangeInput === undefined ||
        config.isInputDisabled ||
        config.isSelectorDisabled ||
        config.isReadOnly ||
        !isValidTokenInput(amount, selectedToken.decimals)
      )
        return;

      setInputString(amount);
      props.onChangeInput(props.selectedToken, amount);
    },
    [
      config.isInputDisabled,
      config.isReadOnly,
      config.isSelectorDisabled,
      props,
      selectedToken.decimals,
    ]
  );

  useEffect(() => {
    onChangeInput("");
  }, [onChangeInput]);

  return (
    <Flex direction="column">
      <Text fontSize="20px" fontWeight="700">
        {props.title}
      </Text>
      <Flex mt="10px" h={height}>
        <Flex
          align="flex-start"
          direction="column"
          justify="center"
          className="border-l-2 border-t-2 border-b-2 border-r-2 rounded-l-2xl  border-theme-navy"
          borderColor={borderColor}
          // borderLeftRadius={borderRadius}
          px={["16px", "30px"]}
        >
          <Input
            fontSize="20px"
            placeholder="0.0"
            type="number"
            step="any"
            variant="unstyled"
            className="border-transparent focus:border-transparent focus:ring-0"
            disabled={config.isInputDisabled ?? false}
            isReadOnly={config.isReadOnly ?? false}
            value={inputString}
            onChange={(event) => onChangeInput(event.target.value)}
          />
          <Flex>
            {props.formattedFiat !== "$0.00" && (
              <>
                <Text fontSize="12px" textColor={colors.themeNavy}>
                  {props.formattedFiat}
                </Text>
                {props.priceImpact && (
                  <Text
                    fontSize="12px"
                    textColor={props.priceImpact.colorCoding}
                  >
                    &nbsp;{props.priceImpact.priceImpact}
                  </Text>
                )}
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          align="center"
          h={height}
          className=" border-t-2 border-b-2 border-r-2 rounded-r-2xl border-theme-navy"
          borderColor={borderColor}
          // borderRightRadius={borderRadius}
          cursor="pointer"
          w={widths}
          onClick={() => props.onSelectedToken(props.selectedToken.symbol)}
        >
          {!config.isNarrowVersion && (
            <Box pl="10px" pr="0px">
              <Image
                src={selectedToken.image}
                alt={`${selectedToken.symbol} logo`}
                w="24px"
              />
            </Box>
          )}
          <Text ml="8px">{props.selectedToken.symbol}</Text>
        </Flex>
      </Flex>
      <Text
        align="left"
        fontSize="12px"
        fontWeight="400"
        mt="5px"
        onClick={() => {
          if (tokenBalance) {
            const fullTokenBalance = formatUnits(
              getBalance(props.selectedToken.symbol) ?? "0",
              props.selectedToken.decimals
            );
            onChangeInput(fullTokenBalance);
          }
        }}
        cursor="pointer"
      >
        Balance: {tokenBalance}
      </Text>
    </Flex>
  );
};

export default QuickTradeSelector;
