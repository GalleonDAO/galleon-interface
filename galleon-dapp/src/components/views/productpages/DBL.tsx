import { KNOWN_LABELS, KNOWN_SERVICES } from "@galleondao/logging-lib";
import DoubloonPage from "components/product/DoubloonPage";
import { DoubloonToken } from "constants/tokens";
import { logger } from "index";
import { useMarketData } from "providers/MarketData/MarketDataProvider";
import { useEffect, useState } from "react";

const DBL = () => {
  const { doubloon } = useMarketData();

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

  return <DoubloonPage tokenData={DoubloonToken} marketData={doubloon || {}} />;
};

export default DBL;
