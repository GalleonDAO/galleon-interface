// import { Exchange } from 'utils/exchangeIssuanceQuotes'

import { ETH, EthMaxYieldIndex, STETH } from "./tokens";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

enum Exchange {
  None,
  Quickswap,
  Sushiswap,
  UniV3,
  Curve,
}

export const collateralDebtSwapData = {
  [EthMaxYieldIndex.symbol]: {
    exchange: Exchange.Curve,
    path: ["0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", ETH.address!],
    fees: [],
    pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  },
};

export const debtCollateralSwapData = {
  // ETHMAXY
  [EthMaxYieldIndex.symbol]: {
    exchange: Exchange.Curve,
    path: [ETH.address!, "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"],
    fees: [],
    pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
  },
};

export const inputSwapData = {
  [EthMaxYieldIndex.symbol]: {
    // ETHMAXY only supports ETH as the input token
    [ETH.symbol]: {
      exchange: Exchange.Curve,
      path: [ETH.address!, STETH.address!],
      fees: [],
      pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
    },
    [STETH.symbol]: {
      exchange: Exchange.Curve,
      path: [STETH.address!],
      fees: [],
      pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
    },
  },
};

export const outputSwapData = {
  [EthMaxYieldIndex.symbol]: {
    // ETHMAXY only supports ETH as the output token
    [ETH.symbol]: {
      exchange: Exchange.Curve,
      path: ["0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", ETH.address!],
      fees: [],
      pool: "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
    },
  },
};
