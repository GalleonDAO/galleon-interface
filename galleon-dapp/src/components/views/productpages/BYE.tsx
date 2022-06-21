import { KNOWN_LABELS, KNOWN_SERVICES } from "@galleondao/logging-lib";
import ProductPage from "components/product/ProductPage";
import { BasisYieldEthIndex } from "constants/tokens";
import { logger } from "index";
import { useMarketData } from "providers/MarketData/MarketDataProvider";
import { useSetComponents } from "providers/SetComponents/SetComponentsProvider";
import { useEffect, useState } from "react";
import { displayFromWei } from "utils";

const BYE = () => {
  const { bye } = useMarketData();
  const { byeComponents } = useSetComponents();
  // const formattedApy = displayFromWei(apy, 2) ?? undefined

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
      tokenData={BasisYieldEthIndex}
      marketData={bye || {}}
      components={byeComponents || []}
      isLeveragedToken={false}
      hasDashboard={false}
    >
      <div className=" px-2 pb-4 border-b border-theme-navy sm:px-4">
        <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
          Trade the Basis Yield ETH Index
        </h3>
        <p className="mt-1 text-md text-theme-navy">
          The highest source of delta-neutral yield available in DeFi using
          Perpetual Protocol V2.
        </p>
      </div>
    </ProductPage>
  );
};

export default BYE;
