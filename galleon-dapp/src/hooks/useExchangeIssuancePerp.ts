import { BigNumber, Contract, Signer } from 'ethers'

import { Provider } from '@ethersproject/abstract-provider'
import { ChainId } from '@usedapp/core'

import {
  ExchangeIssuanceZeroExMainnetAddress,
  ExchangeIssuanceZeroExPolygonAddress,
  perpExchangeIssuanceOptimismAddress,
} from 'constants/ethContractAddresses'
import { getERC20Contract } from 'utils'
import { PERP_EI_ABI } from 'utils/abi/PerpEI'

export const getPerpIssuanceZeroExContract = async (
  providerSigner: Signer | Provider | undefined,
): Promise<Contract> => {
  const contractAddress = perpExchangeIssuanceOptimismAddress
  // TODO: Change ABI
  return new Contract(contractAddress, PERP_EI_ABI, providerSigner)
}

export const usePerpExchangeIssuance = () => {
  const getUsdcAmountInForFixedSetOffChain = async (
    contract: Contract,
    setToken: string,
    amountOut: BigNumber,
  ): Promise<any> => {
    const estimate = await contract.methods
      .getUsdcAmountInForFixedSetOffChain(setToken, amountOut)
      .call()

    const slippage = 1.005
    return {
      componentEstimateWithSlippage: estimate.usdcAmountInForComponentSets.map(
        (x: any) => BigNumber.from(x * slippage).toString(),
      ),
      componentEstimateUsdWithSlippage: BigNumber.from(
        estimate.totalUsdcAmountIn * slippage,
      ),
    }
  }

  const getUsdcAmountOutForFixedSetOffChain = async (
    contract: Contract,
    setToken: string,
    amountIn: BigNumber,
  ): Promise<any> => {
    const estimate = await contract.methods
      .getUsdcAmountOutForFixedSetOffChain(setToken, amountIn)
      .call()

    const slippage = 1.005
    return {
      componentEstimateWithSlippage: estimate.usdcAmountInForComponentSets.map(
        (x: any) => BigNumber.from(x * slippage).toString(),
      ),
      componentEstimateUsdWithSlippage: BigNumber.from(
        estimate.totalUsdcAmountIn * slippage,
      ),
    }
  }

  const issueExactSetFromUsdc = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
    componentQuotes: BigNumber[],
    maxUsdcAmountIn: BigNumber,
  ): Promise<any> => {
    console.log('issueExactSetFromETH')
    try {
      const issueSetTx = await contract.issueFixedSetFromUsdc(
        setToken,
        amountSetToken,
        componentQuotes,
        maxUsdcAmountIn,
        { gasLimit: 15000000 },
      )
      return issueSetTx
    } catch (err) {
      console.log('error', err)
      return err
    }
  }

  const redeemExactSetForUsdc = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
    componentQuotes: any[],
    minUsdcAmountOut: BigNumber,
  ): Promise<any> => {
    console.log('redeemExactSetForETH')
    try {
      const redeemSetTx = await contract.redeemFixedSetFromUsdc(
        setToken,
        amountSetToken,
        minUsdcAmountOut,
        componentQuotes,
        { gasLimit: 15000000 },
      )
      return redeemSetTx
    } catch (err) {
      console.log('error', err)
      return err
    }
  }

  /**
   * Runs all the necessary approval functions required before issuing or redeeming a SetToken.
   * This function need to be called only once before the first time this smart contract is used on any particular SetToken.
   *
   * @param library                library from logged in user
   * @param setToken               Address of the SetToken being initialized
   * @param issuanceModule         Address of the issuance module which will be approved to spend component tokens.
   *
   */
  const approveSetToken = async (
    contract: Contract,
    setToken: string,
    issuanceModule: string,
  ): Promise<any> => {
    console.log('approveSetToken')
    try {
      const approveSetTokenTx = await contract.approveSetToken(
        setToken,
        issuanceModule,
      )
      return approveSetTokenTx
    } catch (err) {
      console.log('error', err)
      return err
    }
  }

  /**
   * Runs all the necessary approval functions required for a given ERC20 token.
   * This function can be called when a new token is added to a SetToken during a rebalance.
   *
   * @param library                library from logged in user
   * @param token                  Address of the token which needs approval
   * @param spender                Address of the spender which will be approved to spend token. (Must be a whitlisted issuance module)
   *
   */
  const approveToken = async (
    contract: Contract,
    token: string,
    spender: string,
  ): Promise<any> => {
    console.log('approveToken')
    try {
      const approveTokenTx = await contract.approveToken(token, spender)
      return approveTokenTx
    } catch (err) {
      console.log('error', err)
      return err
    }
  }

  /**
   * Runs all the necessary approval functions required for a list of ERC20 tokens.
   *
   * @param library                library from logged in user
   * @param tokens                 Addresses of the tokens which needs approval
   * @param spender                Address of the spender which will be approved to spend token. (Must be a whitlisted issuance module)
   *
   */
  const approveTokens = async (
    contract: Contract,
    tokens: string[],
    spender: string,
  ): Promise<any> => {
    console.log('approveTokens')
    try {
      const approveTokensTx = await contract.approveTokens(tokens, spender)
      return approveTokensTx
    } catch (err) {
      console.log('error', err)
      return err
    }
  }

  /**
   * Returns the tokenAllowance of a given token for a ExchangeIssuanceZeroEx contract.
   * @param account                Address of the account
   * @param library                library from logged in user
   * @param tokenAddress           Address of the token
   *
   * @return tokenAllowance        Token allowance of the account
   */
  const tokenAllowance = async (
    account: any,
    library: any,
    chainId: ChainId,
    tokenAddress: string,
  ): Promise<BigNumber> => {
    try {
      const contractAddress = perpExchangeIssuanceOptimismAddress
      const tokenContract = await getERC20Contract(
        library.getSigner(),
        tokenAddress,
      )
      const allowance = await tokenContract.allowance(account, contractAddress)
      return BigNumber.from(allowance)
    } catch (err) {
      console.log('error', err)
      return BigNumber.from(0)
    }
  }

  return {
    getUsdcAmountInForFixedSetOffChain,
    getUsdcAmountOutForFixedSetOffChain,
    issueExactSetFromUsdc,
    redeemExactSetForUsdc,
    approveSetToken,
    approveToken,
    approveTokens,
    tokenAllowance,
  }
}
