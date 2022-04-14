export const EI_LEVERAGED_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_weth", type: "address" },
      { internalType: "address", name: "_quickRouter", type: "address" },
      { internalType: "address", name: "_sushiRouter", type: "address" },
      { internalType: "address", name: "_uniV3Router", type: "address" },
      { internalType: "address", name: "_uniV3Quoter", type: "address" },
      {
        internalType: "contract IController",
        name: "_setController",
        type: "address",
      },
      {
        internalType: "contract IDebtIssuanceModule",
        name: "_debtIssuanceModule",
        type: "address",
      },
      {
        internalType: "contract IAaveLeverageModule",
        name: "_aaveLeverageModule",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aaveAddressProvider",
        type: "address",
      },
      {
        internalType: "address",
        name: "_curveAddressProvider",
        type: "address",
      },
      { internalType: "address", name: "_curveCalculator", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_inputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountInputToken",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountSetIssued",
        type: "uint256",
      },
    ],
    name: "ExchangeIssue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_outputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountSetRedeemed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountOutputToken",
        type: "uint256",
      },
    ],
    name: "ExchangeRedeem",
    type: "event",
  },
  {
    inputs: [],
    name: "ADDRESSES_PROVIDER",
    outputs: [
      {
        internalType: "contract ILendingPoolAddressesProviderV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LENDING_POOL",
    outputs: [
      { internalType: "contract ILendingPoolV2", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROUNDING_ERROR_MARGIN",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "aaveLeverageModule",
    outputs: [
      {
        internalType: "contract IAaveLeverageModule",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "addresses",
    outputs: [
      { internalType: "address", name: "quickRouter", type: "address" },
      { internalType: "address", name: "sushiRouter", type: "address" },
      { internalType: "address", name: "uniV3Router", type: "address" },
      { internalType: "address", name: "uniV3Quoter", type: "address" },
      {
        internalType: "address",
        name: "curveAddressProvider",
        type: "address",
      },
      { internalType: "address", name: "curveCalculator", type: "address" },
      { internalType: "address", name: "weth", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
    ],
    name: "approveSetToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "_token", type: "address" },
    ],
    name: "approveToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20[]", name: "_tokens", type: "address[]" },
    ],
    name: "approveTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "debtIssuanceModule",
    outputs: [
      {
        internalType: "contract IDebtIssuanceModule",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "uint256[]", name: "premiums", type: "uint256[]" },
      { internalType: "address", name: "initiator", type: "address" },
      { internalType: "bytes", name: "params", type: "bytes" },
    ],
    name: "executeOperation",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataDebtForCollateral",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataInputToken",
        type: "tuple",
      },
    ],
    name: "getIssueExactSet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      { internalType: "bool", name: "_isIssuance", type: "bool" },
    ],
    name: "getLeveragedTokenData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collateralAToken",
            type: "address",
          },
          { internalType: "address", name: "collateralToken", type: "address" },
          {
            internalType: "uint256",
            name: "collateralAmount",
            type: "uint256",
          },
          { internalType: "address", name: "debtToken", type: "address" },
          { internalType: "uint256", name: "debtAmount", type: "uint256" },
        ],
        internalType: "struct ExchangeIssuanceLeveraged.LeveragedTokenData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataCollateralForDebt",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataOutputToken",
        type: "tuple",
      },
    ],
    name: "getRedeemExactSet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      { internalType: "address", name: "_inputToken", type: "address" },
      {
        internalType: "uint256",
        name: "_maxAmountInputToken",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataDebtForCollateral",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataInputToken",
        type: "tuple",
      },
    ],
    name: "issueExactSetFromERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataDebtForCollateral",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataInputToken",
        type: "tuple",
      },
    ],
    name: "issueExactSetFromETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      { internalType: "address", name: "_outputToken", type: "address" },
      {
        internalType: "uint256",
        name: "_minAmountOutputToken",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataCollateralForDebt",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataOutputToken",
        type: "tuple",
      },
    ],
    name: "redeemExactSetForERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      { internalType: "uint256", name: "_setAmount", type: "uint256" },
      {
        internalType: "uint256",
        name: "_minAmountOutputToken",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataCollateralForDebt",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "uint24[]", name: "fees", type: "uint24[]" },
          { internalType: "address", name: "pool", type: "address" },
          {
            internalType: "enum DEXAdapter.Exchange",
            name: "exchange",
            type: "uint8",
          },
        ],
        internalType: "struct DEXAdapter.SwapData",
        name: "_swapDataOutputToken",
        type: "tuple",
      },
    ],
    name: "redeemExactSetForETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setController",
    outputs: [
      { internalType: "contract IController", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
