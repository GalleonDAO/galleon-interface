import { useEffect, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { colors } from "styles/colors";

import { Box, Flex, Spacer } from "@chakra-ui/layout";
import { Tab, TabList, Tabs, Text, useTheme } from "@chakra-ui/react";

export enum Durations {
  DAILY = 0,
  WEEKLY = 1,
  MONTHLY = 2,
  QUARTERLY = 3,
  YEARLY = 4,
}

export enum PriceChartRangeOption {
  DAILY_PRICE_RANGE = 1,
  WEEKLY_PRICE_RANGE = 7,
  MONTHLY_PRICE_RANGE = 30,
  QUARTERLY_PRICE_RANGE = 90,
  YEARLY_PRICE_RANGE = 365,
}

interface MarketChartOptions {
  width?: number;
  height?: number;
  hideYAxis?: boolean;
}

interface MarketChartPriceChange {
  label: string;
  isPositive: boolean;
}

export interface PriceChartData {
  x: number;
  y1: number;
  y2?: number;
  y3?: number;
  y4?: number;
  y5?: number;
}

const MarketChart = (props: {
  marketData: PriceChartData[][];
  prices: string[];
  priceChanges: MarketChartPriceChange[];
  options: MarketChartOptions;
  customSelector?: any;
  onMouseMove?: (...args: any[]) => any;
  onMouseLeave?: (...args: any[]) => any;
  apy?: string;
  isDoubloon?: boolean;
}) => {
  const theme = useTheme();
  const strokeColor = colors.themeBlack;

  const [chartData, setChartData] = useState<PriceChartData[]>([]);
  const [durationSelector, setDurationSelector] = useState<number>(
    Durations.DAILY
  );

  useEffect(() => {
    if (props.marketData.length < 1) {
      return;
    }
    const index = durationSelector;
    const chartData = props.marketData[index];
    setChartData(chartData);
  }, [durationSelector, props.marketData]);

  const onChangeDuration = (index: number) => {
    switch (index) {
      case 0:
        setDurationSelector(Durations.DAILY);
        break;
      case 1:
        setDurationSelector(Durations.WEEKLY);
        break;
      case 2:
        setDurationSelector(Durations.MONTHLY);
        break;
      case 3:
        setDurationSelector(Durations.QUARTERLY);
        break;
      case 4:
        setDurationSelector(Durations.YEARLY);
        break;
    }
  };

  const dateFormatterOptions = (
    duration: Durations
  ): Intl.DateTimeFormatOptions => {
    switch (duration) {
      case Durations.DAILY:
        return {
          hour: "2-digit",
        };
      default:
        return {
          month: "short",
          day: "2-digit",
        };
    }
  };

  const xAxisTickFormatter = (val: any | null | undefined) => {
    var options = dateFormatterOptions(durationSelector);
    return new Date(val).toLocaleString(undefined, options);
  };

  const yAxisTickFormatter = (val: any | null | undefined) => {
    if (val === undefined || val === null) {
      return "";
    }
    return `$${parseInt(val)}`;
  };

  const yAxisTickFormatterDbl = (val: any | null | undefined) => {
    if (val === undefined || val === null) {
      return "";
    }
    return val.toFixed(3);
  };

  const minY = Math.min(
    ...chartData.map<number>((data) =>
      Math.min(
        data.y1,
        data.y2 ?? data.y1,
        data.y3 ?? data.y1,
        data.y4 ?? data.y1,
        data.y5 ?? data.y1
      )
    )
  );
  const maxY = Math.max(
    ...chartData.map<number>((data) =>
      Math.max(
        data.y1,
        data.y2 ?? data.y1,
        data.y3 ?? data.y1,
        data.y4 ?? data.y1,
        data.y5 ?? data.y1
      )
    )
  );
  const minYAdjusted = minY > 4 ? minY - 5 : 0;
  const yAxisDomain = [minYAdjusted, maxY + 5];

  const yAxisDomainDbl = [minY - 0, maxY * 1.1];

  const price =
    props.prices.length === 1
      ? props.prices[0]
      : props.prices[durationSelector];
  const priceChange = props.priceChanges[durationSelector];
  const priceChangeColor = priceChange.isPositive
    ? colors.themeBlue
    : colors.themeCopper;

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Flex
        direction={["column", "row"]}
        alignItems={["left", "flex-end"]}
        mb="24px"
        w="100%"
      >
        <PriceDisplay
          price={price}
          change={priceChange.label}
          color={priceChangeColor}
          apy={props.apy}
        />
        {props.customSelector && (
          <Box mr={["auto", "24px"]}>{props.customSelector}</Box>
        )}
        <Box mt={["8px", "0"]} mr="auto" ml={["0", "15px"]}>
          <RangeSelector onChange={onChangeDuration} />
        </Box>
      </Flex>
      <ResponsiveContainer width="100%" height={props.options.height ?? 400}>
        <AreaChart
          // width={props.options.width ?? 900}
          // height={props.options.height ?? 400}
          data={chartData}
        >
          <CartesianGrid stroke={strokeColor} strokeOpacity={0.2} />
          <YAxis
            axisLine={true}
            domain={props.isDoubloon ? yAxisDomainDbl : yAxisDomain}
            stroke={strokeColor}
            tickCount={10}
            tickFormatter={
              props.isDoubloon ? yAxisTickFormatterDbl : yAxisTickFormatter
            }
            tickLine={true}
            hide={props.options.hideYAxis ?? true}
          />
          <XAxis
            axisLine={false}
            dataKey="x"
            dy={10}
            interval="preserveStart"
            minTickGap={10}
            stroke={strokeColor}
            tickCount={6}
            tickFormatter={xAxisTickFormatter}
            tickLine={true}
          />
          <Area
            type="monotone"
            dataKey="y1"
            stroke={theme.colors.themeBlue}
            fill={theme.colors.themeBlue}
          />
          <Area
            type="monotone"
            dataKey="y2"
            stroke={theme.colors.themeBlue}
            fill={theme.colors.themeBlue}
          />
          <Area
            type="monotone"
            dataKey="y3"
            stroke={theme.colors.themeBlue}
            fill={theme.colors.themeBlue}
          />
          <Area
            type="monotone"
            dataKey="y4"
            stroke={theme.colors.themeBlue}
            fill={theme.colors.themeBlue}
          />
          <Area
            type="monotone"
            dataKey="y5"
            stroke={theme.colors.themeBlue}
            fill={theme.colors.themeBlue}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

const PriceDisplay = ({
  price,
  change,
  color,
  customSelector,
  apy,
}: {
  price: string;
  change: string;
  color: string;
  customSelector?: any;
  apy?: string;
}) => (
  <Flex align="center" width="100%" alignItems={["", "flex-end"]}>
    <Flex align="baseline" flexDir={["column", "column", "column", "row"]}>
      <Flex flexDirection={"column"}>
        <Text
          className="font-morion"
          fontSize={["3xl", "3xl", "3xl", "4xl"]}
          color={colors.themeBlack}
          fontWeight="semibold"
        >
          {price}
        </Text>
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          alignItems={["flex-start", "flex-start", "flex-start", "flex-end"]}
        >
          {apy && (
            <Text
              fontSize={["md", "md", "xl", "xl"]}
              color={colors.themeBlue}
              fontWeight="normal"
              mr={["0", "0", "0", "16px"]}
            >
              {apy}% APY
            </Text>
          )}
          <Text
            fontSize={["md", "md", "xl", "xl"]}
            color={color}
            fontWeight="normal"
          >
            {change}
          </Text>
        </Flex>
      </Flex>
    </Flex>
    {customSelector && <Box mt="8px">{customSelector}</Box>}
  </Flex>
);

const RangeSelector = ({ onChange }: { onChange: (index: number) => void }) => (
  <Tabs variant="unstyled" onChange={onChange}>
    <TabList>
      <Tab>1D</Tab>
      <Tab>1W</Tab>
      <Tab>1M</Tab>
    </TabList>
  </Tabs>
);

export default MarketChart;
