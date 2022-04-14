import { createContext, useContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import {
  CoinGeckoCoinPrices,
  Position,
  SetDetails,
} from "set.js/dist/types/src/types";

import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";

import { MAINNET, POLYGON } from "constants/chains";
import { EthMaxYieldIndex } from "constants/tokens";
import { useMarketData } from "providers/MarketData/MarketDataProvider";
import { displayFromWei, safeDiv } from "utils";
import { getSetDetails } from "utils/setjsApi";
import { getTokenList, TokenData as Token } from "utils/tokenlists";

const ASSET_PLATFORM = "ethereum";
const VS_CURRENCY = "usd";

export function useSetComponents() {
  return { ...useContext(SetComponentsContext) };
}

const SetComponentsProvider = (props: { children: any }) => {
  const { selectLatestMarketData, ethmaxy } = useMarketData();
  const [ethmaxyComponents, setEthmaxyComponents] = useState<SetComponent[]>(
    []
  );

  const { account, chainId, library } = useEthers();
  const tokenList = getTokenList(chainId);

  useEffect(() => {
    if (
      chainId &&
      chainId === MAINNET.chainId &&
      account &&
      library &&
      tokenList &&
      ethmaxy &&
      EthMaxYieldIndex.address
    ) {
      getSetDetails(library, [EthMaxYieldIndex.address], chainId).then(
        async (result) => {
          const [ethmaxySet] = result;

          const ethmaxyComponentPrices = await getPositionPrices(ethmaxySet);
          if (ethmaxyComponentPrices != null) {
            const ethmaxyPositions = ethmaxySet.positions.map(
              async (position) => {
                return await convertPositionToSetComponent(
                  position,
                  tokenList,
                  ethmaxyComponentPrices[position.component.toLowerCase()]?.[
                    VS_CURRENCY
                  ],
                  ethmaxyComponentPrices[position.component.toLowerCase()]?.[
                    `${VS_CURRENCY}_24h_change`
                  ],

                  selectLatestMarketData(ethmaxy.hourlyPrices)
                );
              }
            );
            Promise.all(ethmaxyPositions)
              .then(sortPositionsByPercentOfSet)
              .then(setEthmaxyComponents);
          }
        }
      );
    }
  }, [library, tokenList, ethmaxy, selectLatestMarketData()]);

  useEffect(() => {
    if (chainId && chainId === POLYGON.chainId && library && tokenList) {
      getSetDetails(library, [], chainId)
        .then(async (result) => {
          const [] = result;
        })
        .catch((err) => console.log("err", err));
    }
  }, [chainId, library, tokenList, selectLatestMarketData()]);

  return (
    <SetComponentsContext.Provider
      value={{
        ethmaxyComponents: ethmaxyComponents,
      }}
    >
      {props.children}
    </SetComponentsContext.Provider>
  );
};

export async function convertPositionToSetComponent(
  position: Position,
  tokenList: Token[],
  componentPriceUsd: number,
  componentPriceChangeUsd: number,
  setPriceUsd: number
): Promise<SetComponent> {
  const token = getTokenForPosition(tokenList, position);
  if (token === undefined) {
    return {
      address: position.component,
      id: position.component,
      quantity: "",
      symbol: "SYM",
      name: position.component,
      image: "",
      totalPriceUsd: "0",
      dailyPercentChange: "0",
      percentOfSet: "0",
      percentOfSetNumber: 0,
    };
  }

  const commonDecimals = 18;
  const decimalsDiff = commonDecimals - token.decimals;

  const tokenPriceUsdDecimal = ethers.utils.parseUnits(
    componentPriceUsd.toString()
  );
  const setPriceUsdDecimal = ethers.utils.parseUnits(setPriceUsd.toString());

  const tokenValueUsd = ethers.utils
    .parseUnits(position.unit.toString(), decimalsDiff)
    .mul(tokenPriceUsdDecimal);

  const percentOfSet = safeDiv(tokenValueUsd, setPriceUsdDecimal);
  const displayPercentOfSet = displayFromWei(
    percentOfSet.mul(BigNumber.from(100)),
    2
  );

  return {
    address: position.component,
    id: token.name.toLowerCase(),
    quantity: ethers.utils.formatUnits(
      ethers.utils.parseUnits(position.unit.toString(), decimalsDiff)
    ),
    symbol: token.symbol,
    name: token.name,
    image: token.logoURI,
    totalPriceUsd: ethers.utils.formatUnits(
      tokenValueUsd,
      commonDecimals + decimalsDiff + token.decimals
    ),
    dailyPercentChange: componentPriceChangeUsd
      ? componentPriceChangeUsd.toString()
      : "0",
    percentOfSet: displayPercentOfSet ?? "0",
    percentOfSetNumber: Number(displayPercentOfSet ?? "0"),
  };
}

function getTokenForPosition(tokenList: Token[], position: Position): Token {
  const matchingTokens = tokenList.filter(
    (t) => t.address.toLowerCase() === position.component.toLowerCase()
  );
  if (matchingTokens.length === 0) {
    console.warn(
      `No token for position ${position.component} exists in token lists`
    );
  } else if (matchingTokens.length > 1) {
    console.warn(
      `Multiple tokens for position ${position.component} exist in token lists`
    );
  }
  return matchingTokens[0];
}

function sortPositionsByPercentOfSet(
  components: SetComponent[]
): SetComponent[] {
  return components.sort((a, b) => {
    if (b.percentOfSetNumber > a.percentOfSetNumber) return 1;
    if (b.percentOfSetNumber < a.percentOfSetNumber) return -1;
    return 0;
  });
}

async function getPositionPrices(
  setDetails: SetDetails,
  assetPlatform: string = ASSET_PLATFORM
): Promise<CoinGeckoCoinPrices> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set(
    "X-Cg-Pro-Api-Key",
    process.env.REACT_APP_COINGECKO_PRO_API_KEY ?? ""
  );
  const componentAddresses = setDetails.positions.map((p) => p.component);
  return fetch(
    `https://pro-api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}&include_24hr_change=true`,
    { headers: requestHeaders }
  )
    .then((response) => response.json())
    .catch((e) => {
      console.error(e);
      return null;
    });
}

export default SetComponentsProvider;

interface SetComponentsProps {
  ethmaxyComponents?: SetComponent[];
}

export const SetComponentsContext = createContext<SetComponentsProps>({});

export interface SetComponent {
  /**
   * Token address
   * @example "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
   */
  address: string;

  /**
   * Token id
   * @example "uniswap"
   */
  id: string;

  /**
   * Token image URL
   * @example "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png"
   */
  image: string;

  /**
   * Token name
   * @example "Uniswap"
   */
  name: string;

  /**
   * The percent of USD this component makes up in the Set.
   * Equivalant to totalPriceUsd / total price of set in USD
   */
  percentOfSet: string;

  /**
   * The percent of USD this component makes up in the Set.
   * Equivalant to totalPriceUsd / total price of set in USD
   */
  percentOfSetNumber: number;

  /**
   * Quantity of component in the Set
   */
  quantity: string;

  /**
   * Token symbol
   * @example "UNI"
   */
  symbol: string;

  /**
   * Total price of this component. This is equivalant to quantity of
   * component * price of component.
   */
  totalPriceUsd: string;

  /**
   * Daily percent price change of this component
   */
  dailyPercentChange: string;
}
