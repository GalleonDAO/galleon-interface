import { PureComponent } from "react";

import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import piePlaceholder from "assets/brand/Treasury-Icon.png";
import PieChartTooltip from "./PieChartTooltip";
import { colors } from "styles/colors";

export interface Position {
  title: string;
  backgroundColor: string;
  color: string;
  value: number;
  valueDisplay?: string;
  percent?: string;
}

class Chart extends PureComponent<{ data: Position[] }> {
  render() {
    const { data } = this.props;
    return (
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={48}
          outerRadius={100}
          startAngle={-270}
          endAngle={90}
          stroke={colors.themeNavy}
        >
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.backgroundColor} />
          ))}
        </Pie>
        <Tooltip content={<PieChartTooltip />} position={{ x: 150, y: -25 }} />
      </PieChart>
    );
  }
}

const PositionItem = (props: { position: Position }) => {
  const { position } = props;
  return (
    <Flex direction="column" my="6px" mx="12px">
      <Flex alignItems="center">
        <Box
          w="16px"
          h="16px"
          mr="8px"
          backgroundColor={position.backgroundColor}
          borderColor={position.color}
          borderWidth="thin"
        />
        <Text fontSize="18px" fontWeight="600">
          {position.title}
        </Text>
      </Flex>
      <Text fontSize="18px" fontWeight="600">
        {position.percent ?? ""}
      </Text>
    </Flex>
  );
};

const AllocationChart = (props: { positions: Position[] }) => {
  return (
    <Flex align="center" direction="column" pt="20px" px="40px">
      <div className="px-2 pb-4 border-b border-theme-navy sm:px-4">
        <h3 className="text-xl font-morion leading-6 font-semibold text-theme-navy">
          Allocation of Galleon Products
        </h3>
        <p className="mt-1 text-md text-theme-navy">
          Diversify across Galleon investment themes to gain a broad market
          exposure.
        </p>
      </div>

      <Box mt="40px" mb="8px">
        {props.positions.length === 0 && (
          // <ChartPieIcon className="w-full h-full"></ChartPieIcon>
          <Image
            height={["225", "225"]}
            borderRadius={"25"}
            opacity={"910%"}
            src={piePlaceholder}
            alt="pie chart placeholder"
          />
        )}
        {props.positions.length > 0 && <Chart data={props.positions} />}
      </Box>
      <Flex my="16px" flexWrap="wrap">
        {props.positions.map((position) => (
          <PositionItem key={position.title} position={position} />
        ))}
        {props.positions.length === 0 && (
          <span>Purchase Galleon products to see them here</span>
        )}
      </Flex>
    </Flex>
  );
};

export default AllocationChart;
