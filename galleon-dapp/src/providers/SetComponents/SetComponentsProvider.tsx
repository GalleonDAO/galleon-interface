import { createContext, useContext, useEffect, useState } from 'react'

import { ethers } from 'ethers'
import {
  CoinGeckoCoinPrices,
  Position,
  SetDetails,
} from 'set.js/dist/types/src/types'

import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from '@usedapp/core'

import { MAINNET, OPTIMISM, POLYGON } from 'constants/chains'
import { EthMaxYieldIndex, BasisYieldEthIndex } from 'constants/tokens'
import {
  MergeIndex,
  CryptoFeesIndex,
  veTokenIndex,
  SpartanIndex,
} from 'constants/portfolios'
import { useMarketData } from 'providers/MarketData/MarketDataProvider'
import { displayFromWei, safeDiv } from 'utils'
import { getSetDetails } from 'utils/setjsApi'
import { getTokenList, TokenData as Token } from 'utils/tokenlists'

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'
const key = `&x_cg_pro_api_key=${
  process.env.REACT_APP_COINGECKO_PRO_API_KEY ?? ''
}`

export function useSetComponents() {
  return { ...useContext(SetComponentsContext) }
}

const SetComponentsProvider = (props: { children: any }) => {
  const {
    selectLatestMarketData,
    ethmaxy,
    bye,
    merge,
    spi,
    vote,
    fees,
  } = useMarketData()
  const [ethmaxyComponents, setEthmaxyComponents] = useState<SetComponent[]>([])
  const [byeComponents, setByeComponents] = useState<SetComponent[]>([])
  const [mergeComponents, setMergeComponents] = useState<SetComponent[]>([])
  const [spiComponents, setSpiComponents] = useState<SetComponent[]>([])
  const [voteComponents, setVoteComponents] = useState<SetComponent[]>([])
  const [feesComponents, setFeesComponents] = useState<SetComponent[]>([])

  const { account, chainId, library } = useEthers()
  const tokenList = getTokenList(chainId)

  useEffect(() => {
    if (
      chainId &&
      chainId === MAINNET.chainId &&
      account &&
      library &&
      tokenList &&
      ethmaxy &&
      EthMaxYieldIndex.address &&
      MergeIndex.address &&
      CryptoFeesIndex.address &&
      veTokenIndex.address
    ) {
      getSetDetails(library, [EthMaxYieldIndex.address], chainId).then(
        async (result) => {
          const [ethmaxySet] = result

          const ethmaxyComponentPrices = await getPositionPrices(ethmaxySet)
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

                  selectLatestMarketData(ethmaxy.hourlyPrices),
                )
              },
            )
            Promise.all(ethmaxyPositions)
              .then(sortPositionsByPercentOfSet)
              .then(setEthmaxyComponents)
          }
        },
      )

      getSetDetails(library, [MergeIndex.address], chainId).then(
        async (result) => {
          const [mergeSet] = result
          const mergeComponentPrices = await getPositionPrices(mergeSet)
          if (mergeComponentPrices != null) {
            const mergePositions = mergeSet.positions.map(async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                mergeComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                mergeComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],

                selectLatestMarketData([]),
              )
            })
            Promise.all(mergePositions)
              .then(sortPositionsByPercentOfSet)
              .then(setMergeComponents)
          }
        },
      )

      getSetDetails(library, [veTokenIndex.address], chainId).then(
        async (result) => {
          const [voteSet] = result

          const voteComponentPrices = await getPositionPrices(voteSet)
          if (voteComponentPrices != null) {
            const votePositions = voteSet.positions.map(async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                voteComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                voteComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],

                selectLatestMarketData([]),
              )
            })
            Promise.all(votePositions)
              .then(sortPositionsByPercentOfSet)
              .then(setVoteComponents)
          }
        },
      )

      getSetDetails(library, [CryptoFeesIndex.address], chainId).then(
        async (result) => {
          const [feesSet] = result

          const feesComponentPrices = await getPositionPrices(feesSet)
          if (feesComponentPrices != null) {
            const feesPositions = feesSet.positions.map(async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                feesComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                feesComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],

                selectLatestMarketData([]),
              )
            })
            Promise.all(feesPositions)
              .then(sortPositionsByPercentOfSet)
              .then(setFeesComponents)
          }
        },
      )
    }
  }, [library, tokenList, ethmaxy, vote, fees, merge, selectLatestMarketData()])

  useEffect(() => {
    if (chainId && chainId === POLYGON.chainId && library && tokenList) {
      getSetDetails(library, [], chainId)
        .then(async (result) => {
          const [] = result
        })
        .catch((err) => console.log('err', err))
    }
  }, [chainId, library, tokenList, selectLatestMarketData()])

  useEffect(() => {
    if (
      chainId &&
      chainId === OPTIMISM.chainId &&
      account &&
      library &&
      tokenList &&
      bye &&
      spi &&
      BasisYieldEthIndex.optimismAddress &&
      SpartanIndex.optimismAddress
    ) {
      getSetDetails(
        library,
        [BasisYieldEthIndex.optimismAddress],
        chainId,
      ).then(async (result) => {
        const [byeSet] = result

        const byeComponentPrices = await getPositionPrices(
          byeSet,
          'optimistic-ethereum',
        )

        if (byeComponentPrices != null) {
          const byePositions = byeSet.positions.map(async (position) => {
            return await convertPositionToSetComponent(
              position,
              tokenList,
              byeComponentPrices[position.component.toLowerCase()]?.[
                VS_CURRENCY
              ],
              byeComponentPrices[position.component.toLowerCase()]?.[
                `${VS_CURRENCY}_24h_change`
              ],

              selectLatestMarketData(bye.hourlyPrices),
            )
          })

          Promise.all(byePositions)
            .then(sortPositionsByPercentOfSet)
            .then(setByeComponents)
        }
      })

      getSetDetails(library, [SpartanIndex.optimismAddress], chainId).then(
        async (result) => {
          const [spiSet] = result

          const spiComponentPrices = await getPositionPrices(
            spiSet,
            'optimistic-ethereum',
          )

          if (spiComponentPrices != null) {
            const spiPositions = spiSet.positions.map(async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                spiComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                spiComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],

                selectLatestMarketData(spi.hourlyPrices),
              )
            })

            Promise.all(spiPositions)
              .then(sortPositionsByPercentOfSet)
              .then(setSpiComponents)
          }
        },
      )
    }
  }, [library, tokenList, bye, spi, selectLatestMarketData()])

  return (
    <SetComponentsContext.Provider
      value={{
        ethmaxyComponents: ethmaxyComponents,
        byeComponents: byeComponents,
        mergeComponents: mergeComponents,
        spiComponents: spiComponents,
        voteComponents: voteComponents,
        feesComponents: feesComponents,
      }}
    >
      {props.children}
    </SetComponentsContext.Provider>
  )
}

export async function convertPositionToSetComponent(
  position: Position,
  tokenList: Token[],
  componentPriceUsd: number,
  componentPriceChangeUsd: number,
  setPriceUsd: number,
): Promise<SetComponent> {
  const token = getTokenForPosition(tokenList, position)
  if (token === undefined) {
    return {
      address: position.component,
      id: position.component,
      quantity: '',
      symbol: 'SYM',
      name: position.component,
      image: '',
      totalPriceUsd: '0',
      dailyPercentChange: '0',
      percentOfSet: '0',
      percentOfSetNumber: 0,
    }
  }

  const commonDecimals = 18
  const decimalsDiff = commonDecimals - token.decimals

  const tokenPriceUsdDecimal = ethers.utils.parseUnits(
    componentPriceUsd.toString(),
  )
  const setPriceUsdDecimal = ethers.utils.parseUnits(setPriceUsd.toString())

  const tokenValueUsd = ethers.utils
    .parseUnits(position.unit.toString(), decimalsDiff)
    .mul(tokenPriceUsdDecimal)

  const percentOfSet = safeDiv(tokenValueUsd, setPriceUsdDecimal)
  const displayPercentOfSet = displayFromWei(
    percentOfSet.mul(BigNumber.from(100)),
    2,
  )

  return {
    address: position.component,
    id: token.name.toLowerCase(),
    quantity: ethers.utils.formatUnits(
      ethers.utils.parseUnits(position.unit.toString(), decimalsDiff),
    ),
    symbol: token.symbol,
    name: token.name,
    image: token.logoURI,
    totalPriceUsd: ethers.utils.formatUnits(
      tokenValueUsd,
      commonDecimals + decimalsDiff + token.decimals,
    ),
    dailyPercentChange: componentPriceChangeUsd
      ? componentPriceChangeUsd.toString()
      : '0',
    percentOfSet: displayPercentOfSet ?? '0',
    percentOfSetNumber: Number(displayPercentOfSet ?? '0'),
  }
}

function getTokenForPosition(tokenList: Token[], position: Position): Token {
  const matchingTokens = tokenList.filter(
    (t) => t.address.toLowerCase() === position.component.toLowerCase(),
  )
  if (matchingTokens.length === 0) {
    console.warn(
      `No token for position ${position.component} exists in token lists`,
    )
  } else if (matchingTokens.length > 1) {
    console.warn(
      `Multiple tokens for position ${position.component} exist in token lists`,
    )
  }
  return matchingTokens[0]
}

function sortPositionsByPercentOfSet(
  components: SetComponent[],
): SetComponent[] {
  return components.sort((a, b) => {
    if (b.percentOfSetNumber > a.percentOfSetNumber) return 1
    if (b.percentOfSetNumber < a.percentOfSetNumber) return -1
    return 0
  })
}

async function getPositionPrices(
  setDetails: SetDetails,
  assetPlatform: string = ASSET_PLATFORM,
): Promise<CoinGeckoCoinPrices> {
  const componentAddresses = setDetails.positions.map((p) => p.component)

  return fetch(
    `https://pro-api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}&include_24hr_change=true${key}`,
  )
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      return null
    })
}

export default SetComponentsProvider

interface SetComponentsProps {
  ethmaxyComponents?: SetComponent[]
  byeComponents?: SetComponent[]
  mergeComponents?: SetComponent[]
  voteComponents?: SetComponent[]
  feesComponents?: SetComponent[]
  spiComponents?: SetComponent[]
}

export const SetComponentsContext = createContext<SetComponentsProps>({})

export interface SetComponent {
  /**
   * Token address
   * @example "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
   */
  address: string

  /**
   * Token id
   * @example "uniswap"
   */
  id: string

  /**
   * Token image URL
   * @example "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png"
   */
  image: string

  /**
   * Token name
   * @example "Uniswap"
   */
  name: string

  /**
   * The percent of USD this component makes up in the Set.
   * Equivalant to totalPriceUsd / total price of set in USD
   */
  percentOfSet: string

  /**
   * The percent of USD this component makes up in the Set.
   * Equivalant to totalPriceUsd / total price of set in USD
   */
  percentOfSetNumber: number

  /**
   * Quantity of component in the Set
   */
  quantity: string

  /**
   * Token symbol
   * @example "UNI"
   */
  symbol: string

  /**
   * Total price of this component. This is equivalant to quantity of
   * component * price of component.
   */
  totalPriceUsd: string

  /**
   * Daily percent price change of this component
   */
  dailyPercentChange: string
}
