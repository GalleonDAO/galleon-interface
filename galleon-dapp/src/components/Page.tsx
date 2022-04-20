import { Flex } from "@chakra-ui/react";

const Page = (props: { children?: JSX.Element }) => {
  return (
    <div className="max-w-7xl mt-10 mx-auto sm:px-6 lg:px-8">
      {" "}
      {props.children}
    </div>
  );
};

export default Page;
