import { colors } from "styles/colors";

import { Select } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

import { SUPPORTED_CHAINS } from "constants/chains";
import { useNetwork } from "hooks/useNetwork";

const NetworkSelector = () => {
  const { chainId } = useEthers();
  const { changeNetwork } = useNetwork();

  return (
    <Select
      ml={[0, 0, 4, 4]}
      mt={[4, 4, 0, 0]}
      border="2px solid"
      borderColor={colors.themeBlue}
      borderRadius="8"
      color={colors.themeBlue}
      fontSize="md"
      fontWeight="bold"
      minWidth="50px"
      w="130px"
      onChange={(event) => {
        changeNetwork(event.target.value);
      }}
      value={chainId}
    >
      {SUPPORTED_CHAINS.map((chain) => {
        return (
          <option key={chain.chainId} value={chain.chainId}>
            {chain.name}
          </option>
        );
      })}
    </Select>
  );
};
export default NetworkSelector;
