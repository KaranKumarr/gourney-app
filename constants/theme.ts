import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 32,
    fontFamily: "Roboto_500Medium",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
    fontFamily: "Roboto_500Medium",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    fontFamily: "Roboto_400Regular",
  },
  smallText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "Roboto_400Regular",
  },
});

export const colors = {
  primary: "#41D3BD",
  backgroundLight: "#FAFAFA",
  backgroundDark: "#18181B",
  textLight: "#18181B",
  textDark: "#FAFAFA",
  cardDark: "#2F2F31",
  cardLight: "#E7E7E7FF",
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};
