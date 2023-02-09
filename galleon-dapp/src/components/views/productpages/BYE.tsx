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

  const [perpIssuance, setPerpIssuance] = useState(false);
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
      isLeveragedToken={true}
      perpIssuance={true}
      hasDashboard={false}
    >
      <div className=" px-2 pb-4 border-b bg-red-400 py-4 mb-2 rounded-2xl sm:px-4">
        <h3 className="text-xl leading-6 font-morion font-semibold text-theme-navy">
          DEPRECIATION NOTICE
        </h3>
        <p className="mt-1 text-md text-theme-navy">
          Galleon is depreciation the BYE product, please only redeem your BYE
          tokens below using Flash Redemption. You can read more about this
          decision from the DAO{" "}
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
      {/* <p className="mt-0.5 text-sm block text-theme-navy  float-right  ">
        {" "}
        {!perpIssuance ? "Large Buyer?" : ""}{" "}
        <button
          onClick={() => {
            setPerpIssuance(!perpIssuance);
          }}
          type="button"
          className={
            "bg-theme-pan-champagne relative  items-center  py-0.5 px-2 ml-1 mt-2  rounded-xl border border-theme-navy  text-sm  text-theme-navy hover:bg-white focus:z-10 "
          }
        >
          {perpIssuance ? "Toggle DEX Swap" : "Toggle Flash Issuance"}
        </button>
      </p> */}
    </ProductPage>
  );
};

export default BYE;
