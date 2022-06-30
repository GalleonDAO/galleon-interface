import {
  Button,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  KNOWN_LABELS,
  KNOWN_SERVICES,
} from "@galleondao/logging-lib/build/cjs/lib/constants";

import { ProductsTableProduct } from "components/views/Products";
import { logger } from "index";

type TickerCellProps = {
  product: ProductsTableProduct;
};

const onProductSelected = (productSymbol: string) => {
  const payload = {
    serviceName: KNOWN_SERVICES.GALLEON_DAPP,
    environment: process.env.NODE_ENV,
    label: KNOWN_LABELS.PRODUCT_SELECT,
    metadata: { product: productSymbol },
  };

  logger.logCounter(payload);
};

const TickerCell = ({ product }: TickerCellProps) => {
  const isWeb = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  });

  return (
    <Link
      href={"/" + product.url}
      _focus={{ boxShadow: "none" }}
      onClick={() => onProductSelected(product.symbol)}
    >
      <Grid
        width={["inherit", "inherit", "320px"]}
        templateRows={["", "", "repeat(2, 1fr)"]}
        templateColumns={["32px auto", "32px auto", "70px auto"]}
      >
        <GridItem colStart={1} rowSpan={2}>
          <Image
            src={product.image}
            fallbackSrc="https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/galleon-logo.png?raw=true"
            h={[25, 25, 50, 50]}
          />
        </GridItem>
        {isWeb && (
          <GridItem colStart={2}>
            <Text
              className="text-theme-navy"
              fontSize="sm"
              variant="secondary"
              align="left"
            >
              {product.symbol}
            </Text>
          </GridItem>
        )}
        <GridItem colStart={2}>
          <Text
            className="text-theme-navy"
            fontWeight={"semibold"}
            fontSize={["sm", "sm", "xl"]}
          >
            {product.name}
          </Text>
        </GridItem>
      </Grid>
    </Link>
  );
};

export default TickerCell;
