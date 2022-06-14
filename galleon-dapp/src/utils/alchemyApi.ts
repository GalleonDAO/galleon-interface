import { ARBITRUM, MAINNET, OPTIMISM, POLYGON } from "constants/chains";
import { BasisYieldEthIndex, DoubloonToken, EthMaxYieldIndex } from "constants/tokens";

const apiSupport = [MAINNET.chainId, POLYGON.chainId];

const alchemyApiUrl = (chainId: number) => {
  if (!apiSupport.includes(chainId)) {
    return undefined;
  }

  switch (chainId) {
    case MAINNET.chainId:
      return (
        process.env.REACT_APP_MAINNET_ALCHEMY_API ??
        "https://eth-mainnet.alchemyapi.io/v2/RUwft-_xhH_-Vg8CXWomBhXIqcevPS19"
      );
    case POLYGON.chainId:
      return (
        process.env.REACT_APP_POLYGON_ALCHEMY_API ??
        "https://polygon-mainnet.g.alchemy.com/v2/toY-lsDEkfOqpWApuezyXm6SDvQY05Ba"
      );
    case OPTIMISM.chainId:
      return (
        process.env.REACT_APP_POLYGON_ALCHEMY_API ??
        "https://opt-mainnet.g.alchemy.com/v2/apSdigw1kX2_Fi6QjUTvAUKugMWTCdOU"
      );
    case ARBITRUM.chainId:
      return (
        process.env.REACT_APP_POLYGON_ALCHEMY_API ??
        "https://arb-mainnet.g.alchemy.com/v2/SgU4gbtBjFY9zc6aLNc21ZU6cWe-E01U"
      );
    default:
      return (
        process.env.REACT_APP_MAINNET_ALCHEMY_API ??
        "https://eth-mainnet.alchemyapi.io/v2/RUwft-_xhH_-Vg8CXWomBhXIqcevPS19"
      );
  }
};

const mainnetTokens: string[] = [EthMaxYieldIndex.address!];

const polygonTokens: string[] = [];

const optimismTokens: string[] = [BasisYieldEthIndex.optimismAddress!];

const arbitrumTokens: string[] = [DoubloonToken.arbitrumAddress!];

interface AlchemyApiParams {
  fromBlock: string;
  toBlock: string;
  contractAddresses: string[];
  fromAddress?: string | null;
  toAddress?: string | null;
  maxCount: string;
  excludeZeroValue: boolean;
  category: string[];
}

export interface AlchemyApiTransaction {
  asset: string;
  blockNum: string;
  category: string;
  erc721TokenId: string | null;
  erc1155Metadata: string | null;
  from: string;
  hash: string;
  rawContract: {
    value: string;
    address: string;
    decimal: string;
  };
  to: string;
  tokenId: string | null;
  value: number;
}

const getNetworkTokens = (chainId: number) => {
  switch (chainId) {
    case MAINNET.chainId:
      return mainnetTokens;
    case POLYGON.chainId:
      return polygonTokens;
    case OPTIMISM.chainId:
      return optimismTokens;
    case ARBITRUM.chainId:
      return arbitrumTokens;
    default:
      return mainnetTokens;
  }
};

const fetchTransactionHistory = async (
  alchemyApiUrl: string,
  fromAddress: string | null = null,
  toAddress: string | null = null,
  chainId: number
): Promise<AlchemyApiTransaction[]> => {
  if (alchemyApiUrl === undefined) return [];

  const contractAddresses: string[] = getNetworkTokens(chainId);

  const params: AlchemyApiParams[] = [
    {
      fromBlock: "0xB82D69",
      toBlock: "latest",
      contractAddresses,
      maxCount: "0x20",
      excludeZeroValue: true,
      category: ["erc20"],
    },
  ];

  if (fromAddress !== null) {
    params[0].fromAddress = fromAddress;
  }

  if (toAddress !== null) {
    params[0].toAddress = toAddress;
  }

  const body = {
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const resp = await fetch(alchemyApiUrl, requestOptions);

  const data = await resp.json();

  console.log(data);
  return data["result"]["transfers"];
};

export const getTransactionHistory = async (
  address: string,
  chainId: number
) => {
  const url = alchemyApiUrl(chainId);
  if (!url) return { from: [], to: [] };
  const fromTransactions = await fetchTransactionHistory(
    url,
    address,
    null,
    chainId
  );
  const toTransactions = await fetchTransactionHistory(
    url,
    null,
    address,
    chainId
  );
  return { from: fromTransactions, to: toTransactions };
};
