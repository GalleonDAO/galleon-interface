import { colors } from "styles/colors";

import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useEthers, useLookupAddress } from "@usedapp/core";

import ConnectModal from "./ConnectModal";
import NetworkSelector from "./NetworkSelector";
import { useState } from "react";
import { logger } from "index";
import { KNOWN_SERVICES, KNOWN_LABELS } from "@galleondao/logging-lib";

const ConnectButton = () => {
  const { account, deactivate } = useEthers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");
  let ens = useLookupAddress();

  const handleConnectWallet = () => {
    onOpen();
  };

  const handleDisconnect = () => {
    deactivate();
    onClose();
  };

  const sendWalletConnectionEvent = () => {
    if (account !== address) {
      setAddress(account);

      logger.logCounter({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: KNOWN_LABELS.WALLET_CONNECT,
        metadata: {
          address: account,
          referrer: document.referrer === "" ? "direct" : document.referrer,
        },
      });

      console.log("Successful Wallet Connection", {
        user: {
          name: account,
        },
      });
    }
  };

  const handleAccount = () => {
    sendWalletConnectionEvent();
    return formatAccountName();
  };

  const formatAccountName = () => {
    if (ens) return `${ens}`;
    return (
      account &&
      `${account.slice(0, 6)}...${account.slice(
        account.length - 4,
        account.length
      )}`
    );
  };

  const connectButton = () => {
    return (
      <div>
        <button
          onClick={handleConnectWallet}
          className="ml-4 inline-block bg-theme-oldlace shadow-sm shadow-theme-black text-theme-navy  py-1.5 px-4 border-2 border-theme-champagne rounded-2xl text-base font-medium  hover:bg-theme-champagne"
        >
          Connect
        </button>

        <ConnectModal isOpen={isOpen} onClose={onClose} />
      </div>
    );
  };

  const disconnectButton = () => {
    return (
      <span>
        <span className="hidden md:inline-flex items-center px-3 py-0.5 rounded-2xl text-base font-medium bg-transparent ">
          <svg
            className="-ml-1 mr-1.5 h-2 w-2 text-theme-oldlace animate animate-pulse"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span className="text-theme-oldlace">{handleAccount()}</span>
        </span>

        <button
          onClick={handleDisconnect}
          className="ml-4 inline-block bg-theme-navy shadow-sm shadow-theme-black text-theme-oldlace py-1.5 px-4  rounded-2xl text-base  border-theme-oldlace border-2 hover:bg-opacity-75"
        >
          Disconnect
        </button>
        <NetworkSelector />
      </span>
    );
  };

  return account ? disconnectButton() : connectButton();
};
export default ConnectButton;
