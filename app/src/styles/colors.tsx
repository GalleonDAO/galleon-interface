import { theme, useColorMode } from "@chakra-ui/react";

export const colors = {
  ...theme.colors,
  background: "#1f2937",
  icApricot: "#FF8A7D",
  icBlue: "#327EE8",
  icLazurite: "#433BCE",
  icMalachite: "#09AA74",
  icPeriwinkle: "#B9B6FC",
  icRed: "#C32238",
  icYellow: "#FABF00",
  icWhite: "#fff",
};

export const useGalleonColorMode = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const dividerColor = isDarkMode ? colors.icWhite : colors.black;
  return { isDarkMode, dividerColor };
};
