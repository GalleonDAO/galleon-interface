import { KNOWN_LABELS, KNOWN_SERVICES } from "@galleondao/logging-lib";
import ProductPage from "components/product/ProductPage";
import { DummyExchangeIssuanceSet, EthMaxYieldIndex } from "constants/tokens";
import { logger } from "index";
import { useEffect, useState } from "react";

/*
  Reference for new EI only spot Sets
*/
const DUMMY = () => {
  // const { dummyComponents } = useSetComponents();
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
      tokenData={DummyExchangeIssuanceSet}
      marketData={{}}
      components={[] || []}
      isLeveragedToken={false}
      hasDashboard={false}
    />
  );
};

export default DUMMY;
