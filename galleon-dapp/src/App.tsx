import { Outlet } from "react-router-dom";
import { useNotifications } from "@usedapp/core";
import { useNetwork } from "providers/Network/NetworkProvider";
import Header from "components/Header";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { SUPPORTED_CHAINS } from "constants/chains";

const App = () => {
  const { notifications } = useNotifications();
  const {
    state: { network },
  } = useNetwork();
  const chainId = network.chainId;
  const toast = useToast();
  useEffect(() => {
    if (notifications.length === 0) return;

    let explorer = SUPPORTED_CHAINS.find((x) => x.chainId === chainId);
    notifications.forEach((notification) => {
      if ("transaction" in notification) {
        toast({
          title: notification.type,
          description: (
            <a
              className="hover:text-theme-sky text-theme-navy"
              target={"_blank"}
              href={
                explorer.blockExplorerUrl +
                "tx/" +
                notification.transaction.hash
              }
              rel="noreferrer"
            >
              Go to transaction explorer
            </a>
          ),
          variant: "info",
          duration: 3000,
          isClosable: true,
          containerStyle: {
            borderRadius: "1rem",
            border: "2px solid #040728",
            backgroundColor: " #FEF3E2",
            color: "#040728",
          },
        });
      }
    });
  }, [notifications, chainId, toast]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
