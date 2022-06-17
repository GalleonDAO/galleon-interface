import { useEthers } from "@usedapp/core";
import {
  ARBITRUM,
  ChainData,
  MAINNET,
  OPTIMISM,
  POLYGON,
  SUPPORTED_CHAINS,
} from "constants/chains";
import { createContext, useCallback, useContext, useState } from "react";

interface NetworkProps {
  state?: {
    network?: ChainData;
  };
  actions?: {
    changeNetwork?: (chainId: number) => void;
  };
}

export const NetworkContext = createContext<NetworkProps>({});

export function useNetwork() {
  return { ...useContext(NetworkContext) };
}

const NetworkProvider = ({ children }) => {
  const { library, account, chainId } = useEthers();
  const [network, setNetwork] = useState(
    SUPPORTED_CHAINS.find((x) => x.chainId === chainId) ?? MAINNET
  );

  /**
   * Changes to Mainnet
   */
  const setMainnet = useCallback(() => {
    if (library)
      library
        .send("wallet_switchEthereumChain", [
          { chainId: MAINNET.chainId0x },
          account,
        ])
        .then(() => setNetwork(MAINNET));
  }, [library, account]);

  /**
   * Changes to CHAIN
   */
  const setOtherNetwork = useCallback(
    (CHAIN: ChainData) => {
      if (library)
        library
          ?.send("wallet_addEthereumChain", [
            {
              chainId: CHAIN.chainId0x,
              chainName: CHAIN.name,
              nativeCurrency: {
                name: CHAIN.nativeCurrency.name,
                symbol: CHAIN.nativeCurrency.symbol,
                decimals: CHAIN.nativeCurrency.decimals,
              },
              rpcUrls: [CHAIN.rpcUrl],
              blockExplorerUrls: [CHAIN.blockExplorerUrl],
            },
            account,
          ])
          .then(() => setNetwork(CHAIN));
    },
    [setNetwork, account, library]
  );

  const changeNetwork = useCallback(
    (chainId: number) => {
      switch (chainId) {
        case MAINNET.chainId:
          setMainnet();
          break;
        case POLYGON.chainId:
          setOtherNetwork(POLYGON);
          break;
        case OPTIMISM.chainId:
          setOtherNetwork(OPTIMISM);
          break;
        case ARBITRUM.chainId:
          setOtherNetwork(ARBITRUM);
          break;
        default:
          break;
      }
    },
    [setMainnet, setOtherNetwork]
  );

  const value: NetworkProps = {
    state: { network },
    actions: { changeNetwork },
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export default NetworkProvider;
