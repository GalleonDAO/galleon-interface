import { useEffect, useState } from "react";

import { BigNumber } from "set.js";
import { colors } from "styles/colors";

import { Box, Flex, Image, Input, Select, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

import { Token } from "constants/tokens";
import { useBalance } from "hooks/useBalance";
import { isValidTokenInput } from "utils";

import { formattedBalance } from "./QuickTradeFormatter";

interface InputSelectorConfig {
  isInputDisabled?: boolean;
  isSelectorDisabled?: boolean;
  isReadOnly?: boolean;
}

const QuickTradeSelector = (props: {
  title: string;
  config: InputSelectorConfig;
  selectedToken: Token;
  selectedTokenAmount?: string;
  tokenList: Token[];
  onChangeInput: (token: Token, input: string) => void;
  onSelectedToken: (symbol: string) => void;
  isNarrowVersion: boolean;
}) => {
  const { chainId } = useEthers();

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
    onChangeInput("");
  }, [chainId]);

  useEffect(() => {
    const tokenBal = getBalance(props.selectedToken);
    setTokenBalance(formattedBalance(props.selectedToken, tokenBal));
  }, [props.selectedToken, getBalance, chainId]);

  const { config, selectedToken } = props;
  const borderColor = colors.themeNavy;
  const borderRadius = 16;

  const wideWidths = ["150px", "150px"];
  const narrowWidths = ["150px"];
  const widths = props.isNarrowVersion ? narrowWidths : wideWidths;

  const onChangeInput = (amount: string) => {
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
  };

  return (
    <Flex direction="column">
      <div>
        <label
          htmlFor={props.title}
          className="block text-lg font-semibold text-theme-navy"
        >
          {props.title}
        </label>
        <div className="mt-1 relative flex items-center">
          <input
            placeholder="0.0"
            type="number"
            disabled={config.isInputDisabled ?? false}
            value={inputString}
            onChange={(event) => onChangeInput(event.target.value)}
            name={props.title}
            id={props.title}
            className="shadow-sm focus:ring-theme-sky focus:border-theme-sky block w-full pr-12 sm:text-md border-theme-navy rounded-2xl border-2"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 ">
            <kbd className="inline-flex items-center px-2">
              <Flex align="center" h="54px" w={widths}>
                {!props.isNarrowVersion && (
                  <Box pl="10px" pr="0px">
                    <Image
                      src={selectedToken.image}
                      alt={`${selectedToken.symbol} logo`}
                      w="24px"
                    />
                  </Box>
                )}
                <select
                  name="token"
                  disabled={config.isSelectorDisabled ?? false}
                  className=" inline-flex w-full pl-3 py-2 rounded-2xl text-base border-none text-theme-navy focus:outline-none focus:ring-none focus:border-none sm:text-md2xl border-2"
                  defaultValue="Canada"
                  onChange={(event) =>
                    props.onSelectedToken(event.target.value)
                  }
                  value={props.selectedToken.symbol}
                >
                  {props.tokenList.map((token) => {
                    return (
                      <option
                        className="text-theme-navy"
                        key={token.symbol}
                        value={token.symbol}
                      >
                        {token.symbol}
                      </option>
                    );
                  })}
                </select>
              </Flex>
            </kbd>
          </div>
        </div>
      </div>
      <Text
        align="left"
        fontWeight="400"
        mt="5px"
        onClick={() => {
          if (tokenBalance) onChangeInput(tokenBalance);
        }}
        cursor="pointer"
      >
        <span className="text-sm">Balance: {tokenBalance}</span>
      </Text>
    </Flex>
  );
};

export default QuickTradeSelector;
