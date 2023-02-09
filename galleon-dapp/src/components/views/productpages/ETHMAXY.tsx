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
      <div className=" px-2 pb-4 border-b bg-red-400 py-4 rounded-2xl sm:px-4">
        <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
          DEPRECIATION NOTICE
        </h3>
        <p className="mt-1 text-md text-theme-navy">
          Galleon is depreciation the ETHMAXY product, please only redeem your
          ETHMAXY tokens below using available liquidity or Flash Redemption.
          You can read more about this decision from the DAO{" "}
          <a
            href="https://medium.com/galleondao/galleon-structured-products-depreciation-looking-forward-8ba9e5fa1fa6"
            target="_blank"
            rel="noreferrer"
            className="text-theme-blue"
          >
            here
          </a>
          .
        </p>
      </div>
    </ProductPage>
  );
};

export default ETHMAXY;
