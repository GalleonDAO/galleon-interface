import { useEffect, useRef, useState } from "react";
import { initOnRamp } from "@coinbase/cbpay-js";
import { useEthers } from "@usedapp/core";
import coinbase from "assets/coinbase-logo.png";
import { useToast } from "@chakra-ui/react";

const CoinbaseButton = () => {
  const [isReady, setIsReady] = useState(false);
  const toast = useToast();
  const [cb, setCb] = useState(null);
  const { account } = useEthers();
  useEffect(() => {
    setCb(
      initOnRamp(
        {
          widgetParameters: {
            destinationWallets: [
              {
                address: account,
                blockchains: ["ethereum"],
                assets: ["ETH", "USDC"],
              },
            ],
          },
          // host: 'https://*.galleon.community',
          appId: process.env.REACT_APP_COINBASE_APP_ID,
          onSuccess: () => {
            toast({
              title: "Success!",
              description: "Your purchased assets will arrive shortly.",
              variant: "info",
              duration: 5000,
              isClosable: true,
              containerStyle: {
                borderRadius: "1rem",
                border: "2px solid #040728",
                backgroundColor: " #FEF3E2",
                color: "#040728",
              },
            });
          },
          onExit: () => {
            window.location.reload();
            console.log("exit");
          },
          onEvent: (event) => {
            console.log("ON RAMP EVENT: ", event);
          },
          experienceLoggedIn: "embedded",
          experienceLoggedOut: "popup",
          closeOnExit: true,
          closeOnSuccess: true,
        },
        () => {
          setIsReady(true);
        }
      )
    );
  }, [account]);

  const handleClick = () => {
    cb.open();
  };

  return (
    isReady && (
      <button className="px-4 -ml-4 py-1.5" onClick={handleClick}>
        <img
          src={coinbase}
          className=" inline-flex -translate-y-0.5 mr-1.5 h-6 w-6 text-theme-white"
        ></img>
        Buy ETH
      </button>
    )
  );
};

export default CoinbaseButton;
