import { KNOWN_LABELS, KNOWN_SERVICES } from '@galleondao/logging-lib'
import PortfoliosPage from 'components/product/PortfoliosPage'
import ProductPage from 'components/product/ProductPage'
import { MergeIndex } from 'constants/portfolios'
import { logger } from 'index'
import { useMarketData } from 'providers/MarketData/MarketDataProvider'
import { useSetComponents } from 'providers/SetComponents/SetComponentsProvider'
import { useEffect, useState } from 'react'


const MERGE = () => {
  // const { merge } = useMarketData();
  const { mergeComponents } = useSetComponents()
  const [visited, setVisited] = useState(false)
  useEffect(() => {
    if (!visited) {
      logger.logCounter({
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: KNOWN_LABELS.VISIT,
        metadata: {
          referrer: document.referrer === '' ? 'direct' : document.referrer,
          path: window.location.pathname,
        },
      })
      setVisited(true)
    }
  }, [])

  return (
    <PortfoliosPage
      tokenData={MergeIndex}
      marketData={{}}
      components={mergeComponents}
      isLeveragedToken={false}
      hasDashboard={false}
      isPortfolio={true}
    />
  )
}

export default MERGE
