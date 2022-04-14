import { colors } from "styles/colors";

export const Tabs = {
  variants: {
    unstyled: ({ colorMode }: { colorMode: string }) => ({
      tablist: {
        backgroundColor: colorMode === "dark" ? "#1f2937" : "#fff",
        borderRadius: "8px",
        color: colorMode === "dark" ? colors.icWhite : colors.black,
        fontSize: "16px",
        fontWeight: "500",
        height: "45px",
        outline: "0",
      },
      tab: {
        _selected: {
          backgroundColor: colorMode === "dark" ? "white" : colors.icYellow,
          borderRadius: "8px",
          color: colorMode === "dark" ? colors.black : colors.icWhite,
        },
      },
    }),
  },
};
