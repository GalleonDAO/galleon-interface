import { KNOWN_LABELS, KNOWN_SERVICES } from "@galleondao/logging-lib";
import ProductPage from "components/product/ProductPage";
import { EthMaxYieldIndex } from "constants/tokens";
import { useEthmaxyApy } from "hooks/useEthmaxyApy";
import { logger } from "index";
import { useMarketData } from "providers/MarketData/MarketDataProvider";
import { useSetComponents } from "providers/SetComponents/SetComponentsProvider";
import { useEffect, useState } from "react";
import { displayFromWei } from "utils";

const ETHMAXY = () => {
  const { ethmaxy } = useMarketData();
  const { ethmaxyComponents } = useSetComponents();
  const { apy } = useEthmaxyApy();
  const formattedApy = displayFromWei(apy, 2) ?? undefined;

  const [visited, setVisited] = useState(false);
  useEffect(() => {
    if (!visited) {
      logger.logCounter({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: KNOWN_LABELS.VISIT,
        metadata: {
          referrer: document.referrer === "" ? "direct" : document.referrer,
          path: window.location.pathname,
        },
      });
      setVisited(true);
    }
  }, []);

  return (
    <ProductPage
      tokenData={EthMaxYieldIndex}
      marketData={ethmaxy || {}}
      components={ethmaxyComponents || []}
      isLeveragedToken={true}
      apy={formattedApy}
      hasDashboard={true}
    />
  );
};

export default ETHMAXY;
