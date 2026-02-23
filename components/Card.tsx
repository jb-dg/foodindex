import React from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";

type PropsCard = ViewProps;

export function Card({ style, ...props }: PropsCard) {
  const colors = useThemeColors();
  return (
    <View
      style={[style, styleCard, { backgroundColor: colors.grayWhite }]}
      {...props}
    />
  );
}

const styleCard = {
  borderRadius: 8,
  overflow: "hidden",
  ...Shadows.dp2,
} satisfies ViewStyle;
