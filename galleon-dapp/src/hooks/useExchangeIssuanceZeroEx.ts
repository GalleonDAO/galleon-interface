import { BigNumber, Contract, Signer } from "ethers";

import { Provider } from "@ethersproject/abstract-provider";

import { ExchangeIssuanceZeroExAddress } from "constants/ethContractAddresses";
import { getERC20Contract } from "utils";
import { EI_ZEROEX_ABI } from "utils/abi/EIZeroEx";

interface RequiredComponentsResponse {
  components: string[];
  positions: BigNumber[];
}

/**
 * returns instance of ExchangeIssuanceZeroEx Contract
 * @param providerSigner
 * @returns EI contract
 */
const getExchangeIssuanceZeroExContract = async (
  providerSigner: Signer | Provider | undefined
): Promise<Contract> => {
  return new Contract(
    ExchangeIssuanceZeroExAddress,
    EI_ZEROEX_ABI,
    providerSigner
  );
};

/**
 * Returns transaction to get component & position quotes for token issuance
 *
 * @param library                library from logged in user
 * @param issuanceModule         Address of issuance Module to use
 * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
 * @param setToken               Address of the SetToken to be issued
 * @param amountSetToken         Amount of SetTokens to issue
 *
 * @return componenets           Array of component addresses
 * @return positions             Array of component positions
 */
export const getRequiredIssuanceComponents = async (
  library: any,
  issuanceModule: string,
  isDebtIssuance: boolean,
  setToken: string,
  amountSetToken: BigNumber
): Promise<RequiredComponentsResponse> => {
  try {
    const eiContract = await getExchangeIssuanceZeroExContract(
      library.getSigner()
    );
    const issueQuoteTx = await eiContract.getRequiredIssuanceComponents(
      issuanceModule,
      isDebtIssuance,
      setToken,
      amountSetToken
    );
    return issueQuoteTx;
  } catch (err) {
    console.log("Error getting required issuance components/positions", err);
    return { components: [], positions: [] };
  }
};

/**
 * Returns transaction to get component & position quotes for token redemption
 *
 * @param library                library from logged in user
 * @param issuanceModule         Address of issuance Module to use
 * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
 * @param setToken               Address of the SetToken to be redeemed
 * @param amountSetToken         Amount of SetTokens to redeem
 *
 * @return componenets           Array of component addresses
 * @return positions             Array of component positions
 */
export const getRequiredRedemptionComponents = async (
  library: any,
  issuanceModule: string,
  isDebtIssuance: boolean,
  setToken: string,
  amountSetToken: BigNumber
): Promise<RequiredComponentsResponse> => {
  console.log("getRequiredRedemptionComponents");
  try {
    const eiContract = await getExchangeIssuanceZeroExContract(
      library.getSigner()
    );
    const redeemQuoteTx = await eiContract.getRequiredRedemptionComponents(
      issuanceModule,
      isDebtIssuance,
      setToken,
      amountSetToken
    );
    return redeemQuoteTx;
  } catch (err) {
    console.log("error", err);
    return { components: [], positions: [] };
  }
};

/**
 * Get the 0x Trade Data for
 */
export const useExchangeIssuanceZeroEx = () => {
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
  const issueExactSetFromETH = async (
    library: any,
    setToken: string,
    amountSetToken: BigNumber,
    componentQuotes: any[],
    issuanceModule: string,
    isDebtIssuance: boolean
  ): Promise<any> => {
    console.log("issueExactSetFromETH");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const issueSetTx = await eiContract.issueExactSetFromETH(
        setToken,
        amountSetToken,
        componentQuotes,
        issuanceModule,
        isDebtIssuance
      );
      return issueSetTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  /**
   * Returns transaction for the following:
   * Redeems an exact amount of SetTokens for ETH.
   * The SetToken must be approved by the sender to this contract.
   *
   * @param library                library from logged in user
   * @param setToken               Address of the SetToken to be issued
   * @param minEthReceive          Minimum amount of Eth to receive
   * @param componentQuotes        The encoded 0x transactions to execute
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   *
   * @return outputAmount          Amount of output tokens sent to the caller
   */
  const redeemExactSetForETH = async (
    library: any,
    setToken: string,
    minEthReceive: BigNumber,
    componentQuotes: any[],
    issuanceModule: string,
    isDebtIssuance: boolean
  ): Promise<any> => {
    console.log("redeemExactSetForETH");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const redeemSetTx = await eiContract.redeemExactSetForETH(
        setToken,
        minEthReceive,
        componentQuotes,
        issuanceModule,
        isDebtIssuance
      );
      return redeemSetTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  /**
   * Returns transaction to get component & position quotes for token issuance
   *
   * @param library                library from logged in user
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   * @param setToken               Address of the SetToken to be issued
   * @param amountSetToken         Amount of SetTokens to issue
   *
   * @return componenets           Array of component addresses
   * @return positions             Array of component positions
   */
  const getRequiredIssuanceComponents = async (
    library: any,
    issuanceModule: string,
    isDebtIssuance: boolean,
    setToken: string,
    amountSetToken: BigNumber
  ): Promise<RequiredComponentsResponse> => {
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const issueQuoteTx = await eiContract.getRequiredIssuanceComponents(
        issuanceModule,
        isDebtIssuance,
        setToken,
        amountSetToken
      );
      return issueQuoteTx;
    } catch (err) {
      console.log("error", err);
      return { components: [], positions: [] };
    }
  };

  /**
   * Returns transaction for the following:
   * Issues an exact amount of SetTokens for given amount of input ERC20 tokens.
   * The excess amount of tokens is returned in an equivalent amount of ether.
   *
   * @param library                library from logged in user
   * @param setToken               Address of the SetToken to be issued
   * @param inputToken             Address of the input token
   * @param amountSetToken         Amount of SetTokens to issue
   * @param maxAmountInputToken    Maximum amount of input tokens to be used to issue SetTokens.
   * @param componentQuotes        The encoded 0x transactions to execute
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   *
   * @return totalInputTokenSold   Amount of input token spent for issuance
   */
  const issueExactSetFromToken = async (
    library: any,
    setToken: string,
    inputToken: string,
    amountSetToken: BigNumber,
    maxAmountInputToken: BigNumber,
    componentQuotes: any[],
    issuanceModule: string,
    isDebtIssuance: boolean
  ): Promise<any> => {
    console.log("issueExactSetFromToken");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const issueSetTx = await eiContract.issueExactSetFromToken(
        setToken,
        inputToken,
        amountSetToken,
        maxAmountInputToken,
        componentQuotes,
        issuanceModule,
        isDebtIssuance
      );
      return issueSetTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  /**
   * Returns transaction for the following:
   * Issues an exact amount of SetTokens for given amount of input ERC20 tokens.
   * The excess amount of tokens is returned in an equivalent amount of ether.
   *
   * @param library                library from logged in user
   * @param setToken               Address of the SetToken to be redeemed
   * @param outputToken            Address of the output token
   * @param amountSetToken         Amount of output token to redeem
   * @param minOutputReceive       Minimum amount of output token to receive
   * @param componentQuotes        The encoded 0x transactions to execute
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   *
   * @return outputAmount          Amount of output tokens sent to the caller
   */
  const redeemExactSetForToken = async (
    library: any,
    setToken: string,
    outputToken: string,
    amountSetToken: BigNumber,
    minOutputReceive: BigNumber,
    componentQuotes: any[],
    issuanceModule: string,
    isDebtIssuance: boolean
  ): Promise<any> => {
    console.log("redeemExactSetForToken");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const redeemSetTx = await eiContract.redeemExactSetForToken(
        setToken,
        outputToken,
        amountSetToken,
        minOutputReceive,
        componentQuotes,
        issuanceModule,
        isDebtIssuance
      );
      return redeemSetTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  /**
   * Returns transaction to get component & position quotes for token redemption
   *
   * @param library                library from logged in user
   * @param issuanceModule         Address of issuance Module to use
   * @param isDebtIssuance         Flag indicating wether given issuance module is a debt issuance module
   * @param setToken               Address of the SetToken to be issued
   * @param amountSetToken         Amount of SetTokens to issue
   *
   * @return componenets           Array of component addresses
   * @return positions             Array of component positions
   */
  const getRequiredRedemptionComponents = async (
    library: any,
    issuanceModule: string,
    isDebtIssuance: boolean,
    setToken: string,
    amountSetToken: BigNumber
  ): Promise<RequiredComponentsResponse> => {
    console.log("getRequiredRedemptionComponents");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const redeemQuoteTx = await eiContract.getRequiredRedemptionComponents(
        issuanceModule,
        isDebtIssuance,
        setToken,
        amountSetToken
      );
      return redeemQuoteTx;
    } catch (err) {
      console.log("error", err);
      return { components: [], positions: [] };
    }
  };

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
    library: any,
    setToken: string,
    issuanceModule: string
  ): Promise<any> => {
    console.log("approveSetToken");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const approveSetTokenTx = await eiContract.approveSetToken(
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
    library: any,
    token: string,
    spender: string
  ): Promise<any> => {
    console.log("approveToken");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const approveTokenTx = await eiContract.approveToken(token, spender);
      return approveTokenTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

  /**
   * Runs all the necessary approval functions required for a list of ERC20 tokens.
   *
   * @param library                library from logged in user
   * @param tokens                 Addresses of the tokens which needs approval
   * @param spender                Address of the spender which will be approved to spend token. (Must be a whitlisted issuance module)
   *
   */
  const approveTokens = async (
    library: any,
    tokens: string[],
    spender: string
  ): Promise<any> => {
    console.log("approveTokens");
    try {
      const eiContract = await getExchangeIssuanceZeroExContract(
        library.getSigner()
      );
      const approveTokensTx = await eiContract.approveTokens(tokens, spender);
      return approveTokensTx;
    } catch (err) {
      console.log("error", err);
      return err;
    }
  };

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
    tokenAddress: string
  ): Promise<BigNumber> => {
    try {
      const tokenContract = await getERC20Contract(
        library.getSigner(),
        tokenAddress
      );
      const allowance = await tokenContract.allowance(
        account,
        ExchangeIssuanceZeroExAddress
      );
      return BigNumber.from(allowance);
    } catch (err) {
      console.log("error", err);
      return BigNumber.from(0);
    }
  };

  return {
    issueExactSetFromETH,
    redeemExactSetForETH,
    getRequiredIssuanceComponents,
    issueExactSetFromToken,
    redeemExactSetForToken,
    getRequiredRedemptionComponents,
    approveSetToken,
    approveToken,
    approveTokens,
    tokenAllowance,
  };
};
