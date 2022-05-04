import { Flex, Spacer, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

import { Token } from "constants/tokens";
import { colors } from "styles/colors";

const ProductPageHeaderMobile = (props: { tokenData: Token }) => {
  return (
    <Flex
      className="md:pl-0 pl-4"
      direction="column"
      justifyContent="flex-end"
      alignItems="left"
    >
      <Flex>
        <Image
          src={props.tokenData.image}
          alt={props.tokenData.name + " logo"}
          w="32px"
          h="32px"
        />
        <Text
          className="font-morion"
          color={colors.themeChampagne}
          fontSize="2xl"
          fontWeight="500"
          ml="8px"
        >
          {props.tokenData.symbol}
        </Text>
      </Flex>
      <Text
        className="font-morion"
        color={colors.themeChampagne}
        fontSize="xl"
        fontWeight="700"
      >
        {props.tokenData.name}
      </Text>
    </Flex>
  );
};

const ProductPageHeader = (props: { isMobile: boolean; tokenData: Token }) => {
  if (props.isMobile) {
    return <ProductPageHeaderMobile tokenData={props.tokenData} />;
  }

  return (
    <Flex
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      borderBottom="2px"
      color={colors.themeChampagne}
      borderColor={colors.themeChampagne}
      padding="10px 0"
    >
      <Text
        className="font-morion"
        color={colors.themeChampagne}
        fontSize="4xl"
        fontWeight="700"
      >
        {props.tokenData.name}
      </Text>
      <Spacer />
      <Text
        className="font-morion"
        color={colors.themeChampagne}
        fontSize="4xl"
        fontWeight="500"
        mr="24px"
      >
        {props.tokenData.symbol}
      </Text>
      <Image
        src={props.tokenData.image}
        alt={props.tokenData.name + " logo"}
        w="48px"
        h="48px"
      />
    </Flex>
  );
};

export default ProductPageHeader;
