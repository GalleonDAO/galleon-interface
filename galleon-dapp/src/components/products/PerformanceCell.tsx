import numeral from "numeral";
import { colors } from "styles/colors";

import { Text } from "@chakra-ui/react";

const PerformanceCell = ({ percentChange }: { percentChange?: number }) => {
  if (!percentChange) {
    return <Text>---</Text>;
  }
  const formatPercent = numeral(percentChange).format("+0.00a") + "%";
  if (percentChange >= 0) {
    return (
      <Text fontWeight={"semibold"} color={colors.themePanBlue}>
        {formatPercent}
      </Text>
    );
  }
  return (
    <Text color={colors.themeCopper} fontWeight={"semibold"}>
      {formatPercent}
    </Text>
  );
};

export default PerformanceCell;
