import { Box, Flex, Spacer, StackDivider, VStack } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import { colors } from 'styles/colors'

interface SectionTitleProps {
  title: string
}

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <div className="relative mb-4">
      <div className="relative flex justify-start">
        <span className="pr-3 bg-transparent text-lg font-semibold text-theme-black">
          {props.title}
        </span>
      </div>
    </div>
  )
}

export default SectionTitle
