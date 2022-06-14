import { colors } from 'styles/colors'

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { Button, Flex, Spinner, Text } from '@chakra-ui/react'

export enum TransactionStateHeaderState {
  none,
  failed,
  pending,
  success,
}

type TransactionStateHeaderProps = {
  isDarkMode: boolean
  onClick: () => void
  state: TransactionStateHeaderState
}

const TransactionStateHeader = ({
  isDarkMode,
  onClick,
  state,
}: TransactionStateHeaderProps) => (
  <Flex>
    <Button
      onClick={onClick}
      background={colors.themeOldlace}
      borderColor={colors.themeNavy}
      borderRadius="32"
      color={colors.themeNavy}
      fontSize="md"
      fontWeight="700"
      padding="6px 16px"
    >
      <TransactionStateView isDarkMode={isDarkMode} state={state} />
    </Button>
  </Flex>
)

type TransactionStateViewProps = {
  isDarkMode: boolean
  state: TransactionStateHeaderState
}

const TransactionStateView = (props: TransactionStateViewProps) => {
  switch (props.state) {
    case TransactionStateHeaderState.failed:
      return (
        <>
          <WarningIcon w={4} h={4} mr="1" color={colors.themeCopper} />
          <Text color={colors.themeNavy}> Failed</Text>
        </>
      )
    case TransactionStateHeaderState.pending:
      return (
        <>
          <Spinner
            size="sm"
            mr="16px"
            color={props.isDarkMode ? colors.white : colors.themeNavy}
          />
          <Text>1 Pending</Text>
        </>
      )
    case TransactionStateHeaderState.success:
      return (
        <>
          <CheckCircleIcon w={4} h={4} mr="1" color={colors.themeChampagne} />
          <Text color={colors.themeNavy}>Success</Text>
        </>
      )
    default:
      return <></>
  }
}

export default TransactionStateHeader
