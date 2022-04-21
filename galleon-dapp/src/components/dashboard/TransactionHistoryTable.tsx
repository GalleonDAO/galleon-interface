import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { colors } from 'styles/colors'

import TransactionHistoryRow from './TransactionHistoryRow'

export interface TransactionHistoryItem {
  hash: string
  type: 'Send' | 'Receive'
  asset: string
  date: string
  from?: string
  to?: string
  value: number
  explorerUrl: string
}

interface TransactionHistoryTableProps {
  items: TransactionHistoryItem[]
}

const TransactionHistoryTable = ({ items }: TransactionHistoryTableProps) => {
  const colorScheme = 'blackAlpha'
  return (
    <Table backgroundColor={colors.themeChampagne} colorScheme={colorScheme}>
      <TableHeader />
      <Tbody>
        {items.map((item, index) => (
          <TransactionHistoryRow key={index} item={item} />
        ))}
      </Tbody>
    </Table>
  )
}

const TableHeader = () => {
  const isWeb = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  })
  const isTablet = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: false,
  })
  return (
    <Thead>
      <Tr>
        <Th color={colors.themeBlack}>Action</Th>
        <Th color={colors.themeBlack}></Th>
        {isWeb && (
          <>
            <Th color={colors.themeBlack}>From</Th>
            {!isTablet && <Th color={colors.themeBlack}></Th>}
            <Th color={colors.themeBlack}>To</Th>
            {!isTablet && <Th color={colors.themeBlack}>Transaction</Th>}
          </>
        )}
        <Th></Th>
      </Tr>
    </Thead>
  )
}

export default TransactionHistoryTable
