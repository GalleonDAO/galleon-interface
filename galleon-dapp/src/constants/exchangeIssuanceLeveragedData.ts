import { Exchange } from "utils/exchangeIssuanceQuotes";

import { ETH, EthMaxYieldIndex, MATIC } from "./tokens";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const collateralDebtSwapData = {
  [EthMaxYieldIndex.symbol]: {
    exchange: Exchange.Curve,
    path: ["0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", ETH.address],
    fees: [],
    pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  },
};

export const debtCollateralSwapData = {
  // ethmaxy
  "0x0FE20E0Fa9C78278702B05c333Cc000034bb69E2": {
    exchange: Exchange.Curve,
    path: [ETH.address, "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"],
    fees: [],
    pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  },
};

export const inputSwapData = {
  // ethmaxy
  "0x0FE20E0Fa9C78278702B05c333Cc000034bb69E2": {
    // ethmaxy only supports ETH as the input token
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE": {
      exchange: Exchange.Curve,
      path: [ETH.address, "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"],
      fees: [],
      pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
    },
  },
};

export const outputSwapData = {
  [EthMaxYieldIndex.symbol]: {
    // ethmaxy only supports ETH as the output token
    [ETH.symbol]: {
      exchange: Exchange.Curve,
      path: ["0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", ETH.address],
      fees: [],
      pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
    },
  },
};
