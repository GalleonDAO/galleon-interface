import {
  Box,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import metamaskIcon from "assets/metamask.png";
import walletconnectIcon from "assets/walletconnect.svg";
import { metaMaskLink } from "constants/externalLinks";

export default function ConnectModal(props: { isOpen: any; onClose: any }) {
  const { activateBrowserWallet, activate, account } = useEthers();
  const isMetaMaskInstalled = window.ethereum?.isMetaMask;

  const handleMetamask = () => {
    activateBrowserWallet();
    props.onClose();
  };

  const handleWalletConnect = () => {
    const wc = new WalletConnectConnector({
      rpc: {
        1:
          process.env.REACT_APP_MAINNET_ALCHEMY_API ||
          "https://eth-mainnet.alchemyapi.io/v2/RUwft-_xhH_-Vg8CXWomBhXIqcevPS19",
      },
      chainId: 1,
    });
    activate(wc)
      .then((res) => {
        props.onClose();
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCoinbaseConnect = () => {
    const cw = new WalletLinkConnector({
      url:
        process.env.REACT_APP_MAINNET_ALCHEMY_API ||
        "https://eth-mainnet.alchemyapi.io/v2/RUwft-_xhH_-Vg8CXWomBhXIqcevPS19",
      appName: "Galleon",
      supportedChainIds: [1, 10, 137, 42161],
    });

    activate(cw)
      .then((res) => {
        props.onClose();
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Connect to wallet
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4}>
          {isMetaMaskInstalled && (
            <Box
              border="1px"
              borderStyle="solid"
              borderColor="gray.600"
              backgroundColor="gray.700"
              onClick={handleMetamask}
              _hover={{ borderColor: "blue.600" }}
              px={5}
              pt={4}
              pb={2}
              mb={3}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="white" fontSize="lg">
                  MetaMask
                </Text>
                <Image src={metamaskIcon} width={"10%"} />
              </Flex>
            </Box>
          )}
          {!isMetaMaskInstalled && (
            <Link href={metaMaskLink} target="_blank">
              <Box
                border="1px"
                borderStyle="solid"
                borderColor="gray.600"
                backgroundColor="gray.700"
                _hover={{ borderColor: "blue.600" }}
                px={5}
                pt={4}
                pb={2}
                mb={3}
              >
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Text color="white" fontSize="lg">
                    Install MetaMask
                  </Text>
                  <Image src={metamaskIcon} width={"10%"} />
                </Flex>
              </Box>
            </Link>
          )}
          <Box
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            backgroundColor="gray.700"
            onClick={handleWalletConnect}
            _hover={{ borderColor: "blue.600" }}
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="white" fontSize="lg">
                WalletConnect
              </Text>
              <Image src={walletconnectIcon} width={"10%"} />
            </Flex>
          </Box>
          <Box
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            backgroundColor="gray.700"
            onClick={handleCoinbaseConnect}
            _hover={{ borderColor: "blue.600" }}
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="white" fontSize="lg">
                Coinbase Wallet
              </Text>
              <Image
                src={
                  "https://avatars.githubusercontent.com/u/18060234?s=200&v=4"
                }
                width={"10%"}
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
