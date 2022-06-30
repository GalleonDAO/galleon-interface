import { BigNumber, Contract, Signer } from "ethers";

import { Provider, TransactionResponse } from "@ethersproject/providers";

import { PERP_EI_ABI } from "utils/abi/PerpEI";
import { getPerpExchanceIssuanceContract } from "utils/contracts";
import { displayFromGwei, displayFromWei, toWei } from "utils";

interface RequiredComponentsResponse {
  components: string[];
  positions: BigNumber[];
}

interface RequiredPerpComponentsResponse {
  estimate: BigNumber;
}

/**
 * returns instance of ExchangeIssuancePerp Contract
 * @param providerSigner  web3 provider or signer
 * @param chainId         chain ID for current connected network
 * @returns instance of Perp exchange issuance contract
 */
export const getExchangeIssuancePerpContract = async (
  providerSigner: Signer | Provider | undefined,
  chainId: number
): Promise<Contract> => {
  const contractAddress = getPerpExchanceIssuanceContract(chainId);
  return new Contract(contractAddress, PERP_EI_ABI, providerSigner);
};

/**
 * Returns transaction to get component & position quotes for token issuance
 *
 * @param setToken               Address of the SetToken to be issued
 * @param amountSetToken         Amount of SetTokens to issue
 *
 * @return componenets           Array of component addresses
 * @return positions             Array of component positions
 */
export const getRequiredIssuanceComponentsPerp = async (
  contract: Contract,
  setToken: string,
  amountSetToken: BigNumber
): Promise<RequiredPerpComponentsResponse> => {
  console.log("set amount to issue: ", amountSetToken.toString());

  // 100 BYE
  console.log(
    "set amount display value: ",
    displayFromWei(amountSetToken, 2, 18)
  );

  try {
    const issueQuoteTx =
      await contract.callStatic.getUsdcAmountInForFixedSetOffChain(
        // 0x927Eb0dBC5c3FD172Fdfa72D563f71612eCB6122
        setToken,
        // BigNumber.from(100)
        amountSetToken
      );

    // 10093733022
    console.log(
      "getUsdcAmountInForFixedSetOffChain estimate: ",
      issueQuoteTx.toString()
    );

    // 0.000000010090946869
    console.log(
      "getUsdcAmountInForFixedSetOffChain estimate display value: ",
      displayFromWei(issueQuoteTx, 2, 6)
    );

    return {
      estimate: issueQuoteTx,
    };
  } catch (err) {
    console.log("Error getting required issuance components/positions", err);
    return { estimate: BigNumber.from(0) };
  }
};

/**
 * Returns transaction to get component & position quotes for token redemption
 *
 * @param setToken               Address of the SetToken to be redeemed
 * @param amountSetToken         Amount of SetTokens to redeem
 *
 * @return componenets           Array of component addresses
 * @return positions             Array of component positions
 */
export const getRequiredRedemptionComponentsPerp = async (
  contract: Contract,
  setToken: string,
  amountSetToken: BigNumber
): Promise<RequiredPerpComponentsResponse> => {
  console.log("getRequiredRedemptionComponents");
  try {
    const redeemQuoteTx =
      await contract.callStatic.getUsdcAmountOutForFixedSetOffChain(
        setToken,
        amountSetToken
      );
    return {
      estimate: redeemQuoteTx,
    };
  } catch (err) {
    console.log("error", err);
    return { estimate: BigNumber.from(0) };
  }
};

/**
 * Get the 0x Trade Data for
 */
export const useExchangeIssuancePerp = () => {
  /**
   * Returns transaction for the following:
   * Issues an exact amount of SetTokens for given amount of input ERC20 tokens.
   * The excess amount of tokens is returned in an equivalent amount of ether.
   *
   * @param setToken               Address of the SetToken to be issued
   * @param inputToken             Address of the input token
   * @param amountSetToken         Amount of SetTokens to issue
   * @param maxAmountInputToken    Maximum amount of input tokens to be used to issue SetTokens.
   * @param componentQuotes        The encoded 0x transactions to execute
   *
   * @return totalInputTokenSold   Amount of input token spent for issuance
   */
  const issueFixedSetFromUsdc = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
    maxAmountInputToken: BigNumber,
    gasLimit: BigNumber
  ): Promise<TransactionResponse | null> => {
    console.log("issueFixedSetFromUsdc");
    try {
      const issueSetTx = await contract.issueFixedSetFromUsdc(
        setToken,
        amountSetToken,
        maxAmountInputToken,
        {
          gasLimit,
        }
      );
      return issueSetTx;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  /**
   * Returns transaction for the following:
   * Issues an exact amount of SetTokens for given amount of input ERC20 tokens.
   * The excess amount of tokens is returned in an equivalent amount of ether.
   *
   * @param setToken               Address of the SetToken to be redeemed
   * @param outputToken            Address of the output token
   * @param amountSetToken         Amount of output token to redeem
   * @param minOutputReceive       Minimum amount of output token to receive
   * @param componentQuotes        The encoded 0x transactions to execute
   *
   * @return outputAmount          Amount of output tokens sent to the caller
   */
  const redeemFixedSetForUsdc = async (
    contract: Contract,
    setToken: string,
    amountSetToken: BigNumber,
    minOutputReceive: BigNumber,
    gasLimit: BigNumber
  ): Promise<TransactionResponse | null> => {
    console.log("redeemFixedSetForUsdc");
    try {
      const redeemSetTx = await contract.redeemFixedSetForUsdc(
        setToken,
        amountSetToken,
        minOutputReceive,
        {
          gasLimit,
        }
      );
      return redeemSetTx;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  /**
   * Runs all the necessary approval functions required before issuing or redeeming a SetToken.
   * This function need to be called only once before the first time this smart contract is used on any particular SetToken.
   *
   * @param setToken               Address of the SetToken being initialized
   * @param issuanceModule         Address of the issuance module which will be approved to spend component tokens.
   *
   */
  const approveSetToken = async (
    contract: Contract,
    setToken: string,
    issuanceModule: string
  ): Promise<any> => {
    console.log("approveSetToken");
    try {
      const approveSetTokenTx = await contract.approveSetToken(
        setToken,
        issuanceModule
      );
      return approveSetTokenTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

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
    spender: string
  ): Promise<any> => {
    console.log("approveToken");
    try {
      const approveTokenTx = await contract.approveToken(token, spender);
      return approveTokenTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  /**
   * Runs all the necessary approval functions required for a list of ERC20 tokens.
   *
   * @param tokens                 Addresses of the tokens which needs approval
   * @param spender                Address of the spender which will be approved to spend token. (Must be a whitlisted issuance module)
   *
   */
  const approveTokens = async (
    contract: Contract,
    tokens: string[],
    spender: string
  ): Promise<any> => {
    console.log("approveTokens");
    try {
      const approveTokensTx = await contract.approveTokens(tokens, spender);
      return approveTokensTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  return {
    getRequiredIssuanceComponentsPerp,
    getRequiredRedemptionComponentsPerp,
    issueFixedSetFromUsdc,
    redeemFixedSetForUsdc,
    approveSetToken,
    approveToken,
    approveTokens,
  };
};
