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
    >
      <div className=" px-2 pb-4 border-b border-theme-navy sm:px-4">
        <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
          Trade the ETH Max Yield Index
        </h3>
        <p className="mt-1 text-md text-theme-navy">
          Gain exposure to one of the highest, decentralised and fully
          composable leveraged ETH Yield in DeFi with ETHMAXY.
        </p>
      </div>
    </ProductPage>
  );
};

export default ETHMAXY;
