import { useCallback, useEffect, useState } from "react";

import { BigNumber, Contract, providers } from "ethers";

import { useEtherBalance, useTokenBalance } from "@usedapp/core";

import {
  uniswapEthDpiLpTokenAddress,
  uniswapEthMviLpTokenAddress,
} from "constants/ethContractAddresses";
import {
  BasisYieldEthIndex,
  DAI,
  DoubloonToken,
  ETH,
  EthMaxYieldIndex,
  MATIC,
  STETH,
  Token,
  USDC,
  WETH,
} from "constants/tokens";
import { useAccount } from "hooks/useAccount";
import { useNetwork } from "hooks/useNetwork";
import { ERC20_ABI } from "utils/abi/ERC20";
import { useStakingUnclaimedRewards } from "utils/stakingRewards";
import { getAddressForToken } from "utils/tokens";
import { useWaitForTransaction } from "./useWaitForTransaction";

type Balance = BigNumber;

export interface Balances {
  ethBalance?: BigNumber;
  daiBalance?: BigNumber;
  maticBalance?: BigNumber;
  usdcBalance?: BigNumber;
  wethBalance?: BigNumber;
  stethBalance?: BigNumber;
  ethmaxyBalance?: BigNumber;
  doubloonBalance?: BigNumber;
  byeBalance?: BigNumber;
}

/* Returns balance of ERC20 token */
async function balanceOf(
  token: Token,
  chainId: number,
  account: string,
  library: providers.JsonRpcProvider | undefined
): Promise<BigNumber> {
  try {
    const tokenAddress = getAddressForToken(token, chainId);
    if (!tokenAddress) return BigNumber.from(0);
    const erc20 = new Contract(tokenAddress, ERC20_ABI, library);
    const balance = await erc20.balanceOf(account);
    return balance;
  } catch (error) {
    console.log("balance fetch issue: ", error);
  }
}

export const useBalance = () => {
  const { account, provider } = useAccount();
  const { pendingTxState } = useWaitForTransaction();
  const { chainId } = useNetwork();
  const ethBalance = useEtherBalance(account);

  const [ethmaxyBalance, setEthmaxyBalance] = useState<Balance>(
    BigNumber.from(0)
  );
  const [doubloonBalance, setDoubloonBalance] = useState<Balance>(
    BigNumber.from(0)
  );
  const [byeBalance, setByeBalance] = useState<Balance>(BigNumber.from(0));
  const [maticBalance, setMaticBalance] = useState<Balance>(BigNumber.from(0));

  const [daiBalance, setDaiBalance] = useState<Balance>(BigNumber.from(0));

  const [usdcBalance, setUsdcBalance] = useState<Balance>(BigNumber.from(0));
  const [wethBalance, setWethBalance] = useState<Balance>(BigNumber.from(0));

  const [stETHBalance, setstETHBalance] = useState<Balance>(BigNumber.from(0));

  // LP Tokens

  useEffect(() => {
    if (!account || !chainId) return;
    const web3Provider = provider as providers.JsonRpcProvider;
    const fetchAllBalances = async () => {
      const ethmaxyBalance = await balanceOf(
        EthMaxYieldIndex,
        chainId,
        account,
        web3Provider
      );
      const doubloonBalance = await balanceOf(
        DoubloonToken,
        chainId,
        account,
        web3Provider
      );
      const byeBalance = await balanceOf(
        BasisYieldEthIndex,
        chainId,
        account,
        web3Provider
      );

      const daiBalance = await balanceOf(DAI, chainId, account, web3Provider);

      const maticBalance = await balanceOf(
        MATIC,
        chainId,
        account,
        web3Provider
      );

      const usdcBalance = await balanceOf(USDC, chainId, account, web3Provider);
      const wethBalance = await balanceOf(WETH, chainId, account, web3Provider);

      const stETHBalance = await balanceOf(
        STETH,
        chainId,
        account,
        web3Provider
      );

      setDaiBalance(daiBalance);
      setEthmaxyBalance(ethmaxyBalance);
      setDoubloonBalance(doubloonBalance);
      setByeBalance(byeBalance);

      setMaticBalance(maticBalance);

      setUsdcBalance(usdcBalance);
      setWethBalance(wethBalance);

      setstETHBalance(stETHBalance);
    };

    fetchAllBalances();
  }, [account, chainId, pendingTxState]);

  const getBalance = useCallback(
    (tokenSymbol: string): BigNumber | undefined => {
      switch (tokenSymbol) {
        case EthMaxYieldIndex.symbol:
          return ethmaxyBalance;
        case DoubloonToken.symbol:
          return doubloonBalance;
        case BasisYieldEthIndex.symbol:
          return byeBalance;
        case DAI.symbol:
          return daiBalance;

        case ETH.symbol:
          return ethBalance;

        case MATIC.symbol:
          return maticBalance;

        case USDC.symbol:
          return usdcBalance;
        case WETH.symbol:
          return wethBalance;

        case STETH.symbol:
          return stETHBalance;
        default:
          return undefined;
      }
    },
    [
      daiBalance,
      ethmaxyBalance,
      doubloonBalance,
      byeBalance,
      ethBalance,

      maticBalance,

      usdcBalance,
      wethBalance,

      stETHBalance,
    ]
  );

  const balances = {
    daiBalance,

    ethBalance,

    maticBalance,

    usdcBalance,
    wethBalance,

    stETHBalance,
    ethmaxyBalance,
    doubloonBalance,
    byeBalance,
  };

  return { balances, getBalance };
};
