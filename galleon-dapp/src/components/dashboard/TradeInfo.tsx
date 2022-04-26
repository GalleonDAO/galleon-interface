import { Box, Flex, Text } from "@chakra-ui/react";
import { classNames } from "utils";
import { ArrowRightIcon } from "@heroicons/react/solid";

export interface TradeInfoItem {
  title: string;
  value: string;
}

const excludeBuyAmountItem = (tradeInfoItem: TradeInfoItem): boolean =>
  tradeInfoItem.title !== "Buy Amount";

const TradeInfoItemRow = ({ title, value }: TradeInfoItem) => {
  if (title === "Offered From") {
    const vals = value.split(",");

    return (
      <>
        <div className="relative pb-8">
          <span
            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-theme-navy"
            aria-hidden="true"
          />

          <div className="relative flex space-x-3">
            <div>
              <span
                className={classNames(
                  "bg-theme-champagne",
                  "h-8 w-8 rounded-full flex items-center justify-center ring-2 ring-theme-navy"
                )}
              >
                <ArrowRightIcon
                  className="h-5 w-5 text-theme-navy"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
              <div>
                <span className="text-sm text-theme-navy">
                  {title}
                  {": "}
                  {vals.map((dex, index) => (
                    <Text key={index} fontSize="20px" fontWeight="700">
                      {dex}
                    </Text>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="relative pb-8">
      <span
        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-theme-navy"
        aria-hidden="true"
      />

      <div className="relative flex space-x-3">
        <div>
          <span
            className={classNames(
              "bg-theme-champagne",
              "h-8 w-8 rounded-full flex items-center justify-center ring-2 ring-theme-navy"
            )}
          >
            <ArrowRightIcon
              className="h-5 w-5 text-theme-navy"
              aria-hidden="true"
            />
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
          <div>
            <span className="text-sm text-theme-navy">
              {title}
              {": "}

              <Text fontSize="20px" fontWeight="700">
                {value}
              </Text>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TradeInfo = (props: { data: TradeInfoItem[] }) => {
  return (
    <Flex direction="column">
      {props.data.filter(excludeBuyAmountItem).map((item, index) => (
        <Box key={index} mb="16px">
          <TradeInfoItemRow title={item.title} value={item.value} />
        </Box>
      ))}
    </Flex>
  );
};

export default TradeInfo;
