import { colors } from "styles/colors";

export const Text = {
  baseStyle: ({ colorMode }: { colorMode: string }) => ({
    color: colorMode === "dark" ? colors.icWhite : colors.black,
  }),
  variants: {
    secondary: {
      color: "#dad5d5",
    },
  },
};
