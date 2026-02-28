import { View, ViewStyle, type ViewProps } from "react-native";

type PropsRow = ViewProps & {
  gap?: number;
};
export function Row({ style, gap, ...restProps }: PropsRow) {
  return (
    <View
      style={[rowStyle, style, gap ? { gap: gap } : undefined]}
      {...restProps}
    ></View>
  );
}

const rowStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
} satisfies ViewStyle;
