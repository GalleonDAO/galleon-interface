import { colors } from "styles/colors";

import {
  Box,
  Flex,
  Image,
  Link,
  Td,
  Text,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

import historyLinkIcon from "assets/history-link-icon.svg";
import arrowAsset from "assets/ic_arrow_right_24.svg";

import { TransactionHistoryItem } from "./TransactionHistoryTable";
import { ArrowRightIcon } from "@heroicons/react/outline";

const TransactionHistoryRow = (props: { item: TransactionHistoryItem }) => {
  const isWeb = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  });
  const isTablet = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: false,
  });
  const { item } = props;
  return (
    <Tr width={["340px", "400px", "800px", "1024px"]}>
      <Td>
        <Flex align="center">
          <Flex
            align="center"
            backgroundColor={colors.themeNavy}
            borderRadius="6px"
            justify="center"
            padding="4px 8px"
            minWidth={"20"}
          >
            <Text color="#fff" fontSize="12px" fontWeight="500">
              {item.type}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        {item.asset && (
          <Flex direction="column">
            <Text>${item.asset}</Text>
            {isWeb && <Text color={colors.themeNavy}>{item.value}</Text>}
          </Flex>
        )}
      </Td>
      {isWeb && (
        <>
          <Td>{item.from}</Td>

          {!isTablet && (
            <Td>
              <ArrowRightIcon
                className="h-4 w-4 text-theme-navy"
                aria-hidden="true"
              />
            </Td>
          )}
          <Td>{item.to}</Td>
          {!isTablet && (
            <Td>
              <Flex direction="column">
                <Text color="black">{item.hash}</Text>
                <Text>Block {item.date}</Text>
              </Flex>
            </Td>
          )}
        </>
      )}
      <Td>
        <Link href={item.explorerUrl} isExternal>
          <Flex align="center" direction="row" justify="end">
            Explorer{" "}
            <Box px="2.5" py="1.5">
              <ArrowRightIcon
                className="h-4 w-4 text-theme-navy"
                aria-hidden="true"
              />
            </Box>
          </Flex>
        </Link>
      </Td>
    </Tr>
  );
};

export default TransactionHistoryRow;
