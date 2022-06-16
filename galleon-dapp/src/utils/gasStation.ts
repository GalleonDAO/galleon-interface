import { BigNumber } from "@ethersproject/bignumber";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";

export class GasStation {
  provider: JsonRpcProvider;
  constructor(provider: JsonRpcProvider) {
    this.provider = provider;
  }

  async getGasPrice(): Promise<BigNumber> {
    const gasPrice = await this.provider.getGasPrice();
    return gasPrice;
  }
}
