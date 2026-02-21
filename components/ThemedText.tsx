import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, StyleSheet, TextProps } from "react-native";

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
});

type ThemedTextProps = TextProps & {
  variant?: keyof typeof styles;
  color?: keyof (typeof Colors)["light"];
};

export function ThemedText({ variant, color, ...props }: ThemedTextProps) {
  const colors = useThemeColors(); // hooks useThemeColors du projet
  return (
    <Text
      style={[
        styles[variant || "body3"],
        { color: colors[color ?? "grayDark"] },
      ]}
      {...props}
    />
  );
}
