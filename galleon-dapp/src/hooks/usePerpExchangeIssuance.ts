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

interface RequiredComponentsResponse {
  components: string[]
  positions: BigNumber[]
}

/**
 * returns instance of ExchangeIssuanceZeroEx Contract
 * @param providerSigner  web3 provider or signer
 * @param chainId         chain ID for current connected network
 * @returns instance of 0x exchange issuance contract
 */
export const getPerpIssuanceZeroExContract = async (
  providerSigner: Signer | Provider | undefined,
  chainId: ChainId,
): Promise<Contract> => {
  const contractAddress = perpExchangeIssuanceOptimismAddress
  // TODO: Change ABI
  return new Contract(contractAddress, PERP_EI_ABI, providerSigner)
}

/**
 * Get the 0x Trade Data for
 */
export const usePerpExchangeIssuance = () => {
  const calculateUsdEstimate = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
  ): Promise<any> => {
    const estimate = await contract.methods
      .getUsdcAmountInForFixedSetOffChain(setToken, amountSetToken)
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

  /**
   * Returns transaction for the following:
   * Issues an exact amount of SetTokens for given amount of ETH.
   * The excess amount of tokens is returned in an equivalent amount of ether.
   *
   * @param library                library from logged in user
   * @param setToken               Address of the SetToken to be issued
   * @param amountSetToken         Amount of SetTokens to issue
   * @param componentQuotes        The encoded 0x transactions to execute
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   *
   * @return amountEthReturn       Amount of ether returned to the caller
   */
  const issueExactSetFromUsdc = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
    componentQuotes: any[],
    issuanceModule: string,
    isDebtIssuance: boolean,
    maxInput: BigNumber,
    gasLimit: BigNumber,
  ): Promise<any> => {
    console.log('issueExactSetFromETH')
    try {
      //TODO: Estimate better _maxInput.
      //For now hardcode addtional 0.50% so it doesn't revert
      //Previously 0.25% was tried and was not enough
      //Ex. https://etherscan.io/tx/0x23d28156d8564dd775013241b27745a43e0923fe2e00c784349fff404fc043ac
      const higherMax = BigNumber.from(maxInput).mul(10050).div(10000)
      const issueSetTx = await contract.issueFixedSetFromUsdc(
        setToken,
        amountSetToken,
        componentQuotes,
        issuanceModule,
        isDebtIssuance,
        { value: higherMax, gasLimit },
      )
      return issueSetTx
    } catch (err) {
      console.log('error', err)
      return err
    }
  }

  /**
   * Returns transaction for the following:
   * Redeems an exact amount of SetTokens for ETH.
   * The SetToken must be approved by the sender to this contract.
   *
   * @param library                library from logged in user
   * @param setToken               Address of the SetToken to be redeemed
   * @param amountSetToken         Amount of set token to redeem
   * @param minEthReceive          Minimum amount of Eth to receive
   * @param componentQuotes        The encoded 0x transactions to execute
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   *
   * @return outputAmount          Amount of output tokens sent to the caller
   */
  const redeemExactSetForUsdc = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
    minEthReceive: BigNumber,
    componentQuotes: any[],
    issuanceModule: string,
    isDebtIssuance: boolean,
    gasLimit: BigNumber,
  ): Promise<any> => {
    console.log('redeemExactSetForETH')
    try {
      const redeemSetTx = await contract.redeemFixedSetFromUsdc(
        setToken,
        amountSetToken,
        minEthReceive,
        componentQuotes,
        issuanceModule,
        isDebtIssuance,
        { gasLimit },
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
      const contractAddress =
        chainId === ChainId.Polygon
          ? ExchangeIssuanceZeroExPolygonAddress
          : ExchangeIssuanceZeroExMainnetAddress
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
    issueExactSetFromUsdc,
    redeemExactSetForUsdc,
    calculateUsdEstimate,
    approveSetToken,
    approveToken,
    approveTokens,
    tokenAllowance,
  }
}
