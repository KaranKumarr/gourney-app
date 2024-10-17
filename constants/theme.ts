import { StyleSheet } from "react-native";

export const colors = {
  primary: "#41D3BD",
  secondary: "#a696f6",
  backgroundLight: "#fff",
  backgroundDark: "#18181B",
  textLight: "#18181B",
  textDark: "#FAFAFA",
  cardDark: "#2F2F31",
  cardLight: "#f2f2f2",
  neutralLight: "#18181B7B",
  error: "#D81919FF",
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

export const textStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 32,
    fontFamily: "Roboto_500Medium",
    color: colors.textLight,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
    fontFamily: "Roboto_500Medium",
    color: colors.textLight,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
    fontFamily: "Roboto_500Medium",
    color: colors.textLight,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    fontFamily: "Roboto_400Regular",
    color: colors.textLight,
  },
  smallText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "Roboto_400Regular",
    color: colors.textLight,
  },
});

export const defaultStyling = {
  defaultInput: {
    ...textStyles.body,
    backgroundColor: colors.backgroundLight,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small * 1.5,
    borderRadius: 4,
  },
  primaryButtonText: {
    ...textStyles.body,
    color: colors.backgroundLight,
    textAlign: "center" as const,
  },
};
