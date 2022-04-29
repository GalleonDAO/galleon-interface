import { Flex } from "@chakra-ui/react";

const Page = (props: { children?: JSX.Element }) => {
  return (
    <div className="bg-[url('/ship-bg-02.png')] bg-cover bg-no-repeat bg-bottom pt-10 pb-10 bg-opacity-100  min-h-screen">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{props.children}</div>
    </div>
  );
};

export default Page;
