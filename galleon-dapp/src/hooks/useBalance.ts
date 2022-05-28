import { useCallback, useEffect, useState } from "react";

import { BigNumber, ethers } from "ethers";

import {
  ChainId,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";

import // dpi2020StakingRewardsAddress,
// dpi2021StakingRewardsAddress,
// gmiStakingRewardsAddress,
// mviStakingRewardsAddress,
// uniswapEthDpiLpTokenAddress,
// uniswapEthMviLpTokenAddress,
"constants/ethContractAddresses";
import {
  EthMaxYieldIndex,
  DoubloonToken,
  DAI,
  ETH,
  MATIC,
  Token,
  USDC,
  WETH,
} from "constants/tokens";
import { getChainAddress } from "utils";
import { ERC20_ABI } from "utils/abi/ERC20";
import { useStakingUnclaimedRewards } from "utils/stakingRewards";

type Balance = BigNumber;

export interface Balances {
  ethBalance?: BigNumber;
  daiBalance?: BigNumber;
  maticBalance?: BigNumber;
  usdcBalance?: BigNumber;
  wethBalance?: BigNumber;
  dataBalance?: BigNumber;
  gmiBalance?: BigNumber;
  dpiBalance?: BigNumber;
  mviBalance?: BigNumber;
  bedBalance?: BigNumber;
  btc2xFLIPBalance?: BigNumber;
  iBtcFLIPBalance?: BigNumber;
  ethmaxyBalance?: BigNumber;
  iEthFLIPbalance?: BigNumber;
  iMaticFLIPbalance?: BigNumber;
  ethFliBalance?: BigNumber;
  btcFliBalance?: BigNumber;
  ethFliPBalance?: BigNumber;
  doubloonBalance?: BigNumber;
  matic2xFLIPbalance?: BigNumber;
  stakedGmi2022Balance?: BigNumber;
  stakedUniswapEthDpi2020LpBalance?: BigNumber;
  stakedUniswapEthDpi2021LpBalance?: BigNumber;
  stakedUniswapEthMvi2021LpBalance?: BigNumber;
  uniswapEthDpiLpBalance?: BigNumber;
  uniswapEthMviLpBalance?: BigNumber;
  unclaimedGmi2022Balance?: BigNumber;
  unclaimedUniswapEthMvi2021LpBalance?: BigNumber;
  unclaimedUniswapEthDpi2020LpBalance?: BigNumber;
  unclaimedUniswapEthDpi2021LpBalance?: BigNumber;
}

/* Returns balance of ERC20 token */
async function balanceOf(
  token: Token,
  chainId: ChainId,
  account: string,
  library: ethers.providers.JsonRpcProvider | undefined
): Promise<BigNumber> {
  const tokenAddress = getChainAddress(token, chainId);
  if (!tokenAddress) return BigNumber.from(0);
  const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, library);
  const balance = await erc20.balanceOf(account);
  return balance;
}

export const useBalance = () => {
  const { account, chainId, library } = useEthers();
  const ethBalance = useEtherBalance(account);

  const [daiBalance, setDaiBalance] = useState<Balance>(BigNumber.from(0));
  const [maticBalance, setMaticBalance] = useState<Balance>(BigNumber.from(0));

  const [ethmaxyBalance, setEthmaxyBalance] = useState<Balance>(
    BigNumber.from(0)
  );

  const [doubloonBalance, setDoubloonBalance] = useState<Balance>(
    BigNumber.from(0)
  );

  const [usdcBalance, setUsdcBalance] = useState<Balance>(BigNumber.from(0));
  const [wethBalance, setWethBalance] = useState<Balance>(BigNumber.from(0));

  // // LP Tokens
  // const uniswapEthDpiLpBalance = useTokenBalance(
  //   uniswapEthDpiLpTokenAddress,
  //   account,
  // )
  // const uniswapEthMviLpBalance = useTokenBalance(
  //   uniswapEthMviLpTokenAddress,
  //   account,
  // )

  // // DPI LM Program (Oct. 7th, 2020 - Dec. 6th, 2020)
  // const stakedUniswapEthDpi2020LpBalance = useTokenBalance(
  //   dpi2020StakingRewardsAddress,
  //   account,
  // )
  // const unclaimedUniswapEthDpi2020LpBalance = useStakingUnclaimedRewards(
  //   dpi2020StakingRewardsAddress,
  //   account,
  // )
  // // DPI LM Program ( July 13th, 2021 - August 12th, 2021)
  // const stakedUniswapEthDpi2021LpBalance = useTokenBalance(
  //   dpi2021StakingRewardsAddress,
  //   account,
  // )
  // const unclaimedUniswapEthDpi2021LpBalance = useStakingUnclaimedRewards(
  //   dpi2021StakingRewardsAddress,
  //   account,
  // )
  // // MVI LM Program (August 20th, 2021 - September 19th, 2021)
  // const stakedUniswapEthMvi2021LpBalance = useTokenBalance(
  //   mviStakingRewardsAddress,
  //   account,
  // )
  // const unclaimedUniswapEthMvi2021LpBalance = useStakingUnclaimedRewards(
  //   mviStakingRewardsAddress,
  //   account,
  // )
  // // GMI LM Program (Jan. 10th, 2022 - Mar. 10th, 2022)
  // const stakedGmi2022Balance = useTokenBalance(
  //   gmiStakingRewardsAddress,
  //   account,
  // )
  // const unclaimedGmi2022Balance = useStakingUnclaimedRewards(
  //   gmiStakingRewardsAddress,
  //   account,
  // )

  useEffect(() => {
    if (!account || !chainId) return;

    const fetchAllBalances = async () => {
      const daiBalance = await balanceOf(DAI, chainId, account, library);
      const maticBalance = await balanceOf(MATIC, chainId, account, library);

      const ethmaxyBalance = await balanceOf(
        EthMaxYieldIndex,
        chainId,
        account,
        library
      );
      const doubloonBalance = await balanceOf(
        DoubloonToken,
        chainId,
        account,
        library
      );
      const usdcBalance = await balanceOf(USDC, chainId, account, library);
      const wethBalance = await balanceOf(WETH, chainId, account, library);

      setDaiBalance(daiBalance);
      setDaiBalance(maticBalance);
      setEthmaxyBalance(ethmaxyBalance);
      setDoubloonBalance(doubloonBalance);
      setUsdcBalance(usdcBalance);
      setWethBalance(wethBalance);
    };

    fetchAllBalances();
  }, [account, chainId]);

  const getBalance = useCallback(
    (token: Token): BigNumber | undefined => {
      console.log(token.symbol);

      switch (token.symbol) {
        case DAI.symbol:
          return daiBalance;
        case ETH.symbol:
          return ethBalance;
        case EthMaxYieldIndex.symbol:
          return ethmaxyBalance;
        case DoubloonToken.symbol:
          return doubloonBalance;
        case MATIC.symbol:
          return maticBalance;
        case USDC.symbol:
          return usdcBalance;
        case WETH.symbol:
          return wethBalance;
        default:
          return undefined;
      }
    },
    [
      daiBalance,

      ethBalance,

      ethmaxyBalance,

      doubloonBalance,

      maticBalance,

      usdcBalance,
      wethBalance,
    ]
  );

  const balances = {
    daiBalance,
    ethBalance,
    ethmaxyBalance,
    doubloonBalance,
    maticBalance,
    usdcBalance,
    wethBalance,
  };

  return { balances, getBalance };
};
