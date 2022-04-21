import { Box, Flex, Spacer, StackDivider, VStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import { colors } from "styles/colors";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-theme-black" />
      </div>
      <div className="relative flex justify-start">
        <span className="pr-3 bg-theme-background text-lg font-semibold text-theme-black">
          {props.title}
        </span>
      </div>
    </div>
  );
};

export default SectionTitle;
