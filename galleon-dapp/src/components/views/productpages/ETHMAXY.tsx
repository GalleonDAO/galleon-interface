import ProductPage from "components/product/ProductPage";
import { EthMaxYieldIndex } from "constants/tokens";
import { useEthmaxyApy } from "hooks/useEthmaxyApy";
import { useMarketData } from "providers/MarketData/MarketDataProvider";
import { useSetComponents } from "providers/SetComponents/SetComponentsProvider";
import { displayFromWei } from "utils";

const ETHMAXY = () => {
  const { ethmaxy } = useMarketData();
  const { ethmaxyComponents } = useSetComponents();
  const { apy } = useEthmaxyApy();
  const formattedApy = displayFromWei(apy, 2) ?? undefined;

  return (
    <ProductPage
      tokenData={EthMaxYieldIndex}
      marketData={ethmaxy || {}}
      components={ethmaxyComponents || []}
      isLeveragedToken={true}
      apy={formattedApy}
    />
  );
};

export default ETHMAXY;
