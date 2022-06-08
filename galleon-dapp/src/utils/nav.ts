import { SetComponent } from "providers/SetComponents/SetComponentsProvider";

export const netAssetValueReducer = (
  netAssetValue: number,
  component: SetComponent
): number => {
  return netAssetValue + (parseFloat(component.totalPriceUsd) || 0);
};

export const getNetAssetValue = (components: SetComponent[]) => {
  return components ? components.reduce(netAssetValueReducer, 0) : 0;
};

export const calcNetAssetValueDivergence = ({
  price,
  nav,
}: {
  price: number;
  nav: number;
}): number => {
  if (price <= 0 || nav <= 0) return 0;
  return ((price - nav) * 100) / nav;
};
