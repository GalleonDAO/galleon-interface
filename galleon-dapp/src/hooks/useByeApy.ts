import { utils } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { useContractCall, useTokenBalance } from '@usedapp/core'

import { displayFromWei, fromWei, safeDiv, toWei } from 'utils'
import {
  TokenContextKeys,
  useMarketData,
} from 'providers/MarketData/MarketDataProvider'
import { useUserMarketData } from './useUserMarketData'
import { BasisYieldEthIndex, Token } from 'constants/tokens'
import {
  calculatePriceChange,
  PriceChangeIntervals,
  ProductsTableProduct,
} from 'components/views/Products'
import { useEffect, useState } from 'react'

const YEARLY_INTERVAL = BigNumber.from(1)
const MONTHLY_INTERVAL = BigNumber.from(12)
const WEEKLY_INTERVAL = BigNumber.from(52)
const DAILY_INTERVAL = BigNumber.from(365)
const REINVESTMENT_INTERVAL = BigNumber.from(365).div(3)
// const HOURLY_INTERVAL = BigNumber.from(365).mul(24)

export const useByeApy = (interval: string): { apy: string } => {
  const { bye } = useMarketData()
  const [apy, setApy] = useState('0')

  useEffect(() => {
    calculateApy(interval)
  }, [interval])

  const calculateApy = (interval: string) => {
    // percentChange is the ROI of the Set
    const product = getProduct(BasisYieldEthIndex, bye.hourlyPrices, bye.prices)

    // Formula:
    // APY = {[(1 + (APR / N)) ^ N] - 1} * 100 %
    // APR = ROI * Number of days, where number of days depends on the time filter
    //    Hourly: APR * 24 * 365
    //    Daily: APR * 365
    //    Weekly: APR * 52
    //    Monthly: APR * 12
    //    Yearly: APR
    // and N is (365/7) because the methodology reinvests once a week

    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const firstDate = new Date()
    // when set was created
    const secondDate = new Date('1654928216')

    const diffDays = Math.round(
      Math.abs(((firstDate as any) - (secondDate as any)) / oneDay),
    )

    const N = REINVESTMENT_INTERVAL
    let isPriceUp = false

    let APR
    switch (interval) {
      case 'year':
        APR = BigNumber.from(product.performance['1Y']).mul(YEARLY_INTERVAL)
        isPriceUp = product.performance['1Y'] > 0.0
        break
      case 'month':
        APR = BigNumber.from(product.performance['1M']).mul(MONTHLY_INTERVAL)
        isPriceUp = product.performance['1M'] > 0.0
        break
      case 'week':
        APR = BigNumber.from(product.performance['1W']).mul(WEEKLY_INTERVAL)
        isPriceUp = product.performance['1W'] > 0.0
        break
      case 'day':
        APR = BigNumber.from(product.performance['1D']).mul(DAILY_INTERVAL)
        isPriceUp = product.performance['1D'] > 0.0
        break
      default:
        APR = BigNumber.from(product.performance['1M']).mul(MONTHLY_INTERVAL)
          isPriceUp = product.performance['1M'] > 0.0
        break
    }

    const apyLowerBound = BigNumber.from(-99.99)
    let apyCalculation: BigNumber

    if (isPriceUp) {
      apyCalculation = BigNumber.from(
        BigNumber.from(1).add(APR.div(100).div(N)).pow(N.toNumber()).sub(1),
      ).mul(100)
    } else {
      apyCalculation = APR.mul(-1)
    }

    // TODO: Make sure we don't return <= -100% APY
    const apy = displayFromWei(apyCalculation, 2)

    setApy(apy)
  }

  const getProduct = (
    product: Token,
    hourlyPrices: number[][],
    prices: number[][],
  ): ProductsTableProduct => {
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

  return { apy }
}
