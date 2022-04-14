import { useGalleonColorMode } from "styles/colors";

import { Box, Flex, Spacer, StackDivider, VStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";

interface SectionTitleProps {
  title: string;
  itemRight?: JSX.Element;
}

const SectionTitle = (props: SectionTitleProps) => {
  const { dividerColor } = useGalleonColorMode();
  return (
    <Box flex="1">
      <VStack
        divider={<StackDivider borderColor={dividerColor} />}
        spacing={2}
        align="flex-start"
      >
        <Flex w="100%">
          <Heading as="h3" size="md">
            {props.title}
          </Heading>
          <Spacer />
          {props.itemRight}
        </Flex>
        <Box />
      </VStack>
    </Box>
  );
};

export default SectionTitle;
