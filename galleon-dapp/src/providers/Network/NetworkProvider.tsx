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
    currentNetwork?: ChainData;
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
  const [currentNetwork, setCurrentNetwork] = useState(
    SUPPORTED_CHAINS.find((x) => x.chainId === chainId) ?? MAINNET
  );
  console.log(`current network initialised with value ${currentNetwork}`);
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
        .then(() => setCurrentNetwork(MAINNET));
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
          .then(() => setCurrentNetwork(CHAIN));
    },
    [setCurrentNetwork, account, library]
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
    state: { currentNetwork },
    actions: { changeNetwork },
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export default NetworkProvider;
