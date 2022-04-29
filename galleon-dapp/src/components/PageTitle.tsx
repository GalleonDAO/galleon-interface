import { StackDivider, VStack } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";
import { colors } from "styles/colors";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <div className="md:flex mb-4 md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 font-morion text-theme-champagne sm:text-3xl sm:truncate">
          {props.title}
        </h2>
        <p className="text-subtitle text-theme-champagne">{props.subtitle}</p>
      </div>
    </div>
  );
};

export default PageTitle;
