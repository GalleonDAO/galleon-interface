import { Box, Image } from '@chakra-ui/react'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import ProductsTable from 'components/products/ProductsTable'
import { portfolios, DoubloonToken, Token } from 'constants/tokens'
import {
  TokenContextKeys,
  useMarketData,
} from 'providers/MarketData/MarketDataProvider'
import logo from 'assets/brand/Community-Icon.png'
import { discordLink } from 'constants/externalLinks'
/*  Disabling for 1Y time period because it saves
  us a lot of Coingecko API calls.
  To enable, add Max History call in coingeckoApi.ts
*/
export interface ProductsTableProduct extends Token {
  performance: {
    '1D'?: number
    '1W'?: number
    '1M'?: number
    '3M'?: number
    // '1Y'?: number
  }
}

export const PriceChangeIntervals: [
  keyof ProductsTableProduct['performance'],
  number,
][] = [
  ['1D', 1],
  ['1W', 7],
  ['1M', 30],
  ['3M', 90],
  // ['1Y', 365],
]

type PriceChangesProps = {
  daysOfComparison: number
  hourlyPrices?: number[][]
  prices?: number[][]
}

export const calculatePriceChange = ({
  daysOfComparison,
  hourlyPrices,
  prices,
}: PriceChangesProps) => {
  if (daysOfComparison <= 90) {
    const startPrice = hourlyPrices
      ? hourlyPrices.slice(-24 * daysOfComparison)[0][1]
      : 1
    const hourlyPricesLength = hourlyPrices ? hourlyPrices.length - 1 : 0
    const latestPrice = hourlyPrices ? hourlyPrices[hourlyPricesLength][1] : 1
    return ((latestPrice - startPrice) / startPrice) * 100
  } else if (prices && prices?.length > daysOfComparison) {
    const startPrice = prices[prices.length - daysOfComparison][1]
    const latestPrice = prices[prices.length - 1][1]
    return ((latestPrice - startPrice) / startPrice) * 100
  }
  return 0
}

const appendProductPerformance = ({
  product,
  hourlyPrices,
  prices,
}: {
  product: Token
  hourlyPrices?: number[][]
  prices?: number[][]
}): ProductsTableProduct => {
  return PriceChangeIntervals.reduce(
    (product, interval) => {
      const [dateString, daysOfComparison] = interval
      const priceChange = calculatePriceChange({
        daysOfComparison,
        hourlyPrices,
        prices,
      })

      product.performance = {
        ...product.performance,
        [dateString]: priceChange,
      }

      return product
    },
    { ...product, performance: {} },
  )
}

const Portfolios = () => {
  const marketData = useMarketData()

  const getTokenMarketData = (tokenContextKey?: TokenContextKeys) => {
    if (tokenContextKey && tokenContextKey !== 'selectLatestMarketData') {
      return {
        hourlyPrices: marketData[tokenContextKey]?.hourlyPrices,
        prices: marketData[tokenContextKey]?.prices,
      }
    }
  }

  const productsWithMarketData = portfolios
    .filter((product) => product.symbol !== DoubloonToken.symbol)
    .map((product) => {
      return appendProductPerformance({
        product,
        ...getTokenMarketData(product.tokenContextKey),
      })
    })

  return (
    <Page>
      <Box w="100%">
        <PageTitle
          title="Explore Portfolios"
          subtitle="Allocate into simple, sector driven new thematic portfolios"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
          <div className="col-span-1 bg-theme-oldlace border-2 border-theme-navy shadow-md shadow-theme-black  rounded-2xl divide-y divide-theme-black">
            <div className="w-full items-center justify-between p-6 space-x-6">
              {/* <ProductsTable products={productsWithMarketData} /> */}
              <div className=" pb-2 sm:pb-5">
                <div className="max-w-7xl mx-auto ">
                  <div className="bg-theme-oldlace ">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="flex p-2 w-20 rounded-2xl bg-theme-oldlace">
                          <Image src={logo} alt={'logo'} />
                        </span>

                        <p className="block ml-3 font-medium text-lg text-theme-navy truncate">
                          <p className=" font-semibold text-xl text-theme-navy">
                            We're building these on-deck currently.
                          </p>
                          <span>
                            Have an idea for a portfolio that you one want
                            one-click, simple exposure to? Reach out to us.
                          </span>
                        </p>
                      </div>
                      <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                        <a
                          target={'_blank'}
                          href={discordLink}
                          className="flex items-center justify-center px-4 py-2  rounded-2xl shadow-sm  font-medium text-lg text-theme-navy bg-theme-champagne border-2 border-theme-navy hover:opacity-70"
                          rel="noreferrer"
                        >
                          Go to Discord
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Page>
  )
}

export default Portfolios
