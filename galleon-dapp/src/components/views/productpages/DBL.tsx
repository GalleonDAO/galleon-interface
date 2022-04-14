import DoubloonPage from "components/product/DoubloonPage";
import { DoubloonToken } from "constants/tokens";
import { useMarketData } from "providers/MarketData/MarketDataProvider";

const DBL = () => {
  const { doubloon } = useMarketData();

  return <DoubloonPage tokenData={DoubloonToken} marketData={doubloon || {}} />;
};

export default DBL;
