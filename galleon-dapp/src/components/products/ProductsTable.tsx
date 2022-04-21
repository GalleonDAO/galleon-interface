import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'

import PerformanceCell from 'components/products/PerformanceCell'
import TickerCell from 'components/products/TickerCell'
import {
  PriceChangeIntervals,
  ProductsTableProduct,
} from 'components/views/Products'
import { colors } from 'styles/colors'

type ProductsTableProps = {
  products: ProductsTableProduct[]
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false })

  const colorScheme = 'blackAlpha'
  const amountOfIntervalsToShow = isMobile ? 2 : PriceChangeIntervals.length
  const priceChangeIntervals = PriceChangeIntervals.slice(
    0,
    amountOfIntervalsToShow,
  )

  return (
    <Table colorScheme={colorScheme}>
      <Thead>
        <Tr>
          <Th color={colors.themeBlack} p={['8px 8px', '12px 24px']}>
            Ticker
          </Th>
          {priceChangeIntervals.map((interval) => (
            <Th
              color={colors.themeBlack}
              key={interval[0]}
              p={['8px 8px', '12px 24px']}
            >
              {interval[0]}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.symbol}>
            <Td p={['16px 8px', '16px 24px']}>
              <TickerCell product={product} />
            </Td>
            {priceChangeIntervals.map((interval) => (
              <Td key={interval[0]} p={['16px 8px', '16px 24px']}>
                <PerformanceCell
                  percentChange={product.performance?.[interval[0]]}
                />
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default ProductsTable
