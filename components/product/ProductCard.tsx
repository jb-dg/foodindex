import { ViewStyle, StyleSheet, Image, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Card } from "@/components/Card";
import { useThemeColors } from "@/hooks/useThemeColors";

type PropsProductCard = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function ProductCard({ style, id, name }: PropsProductCard) {
  const colors = useThemeColors();

  return (
    <Card style={[style, stylesSubCard.container]}>
      <View
        style={[
          stylesSubCard.shadow,
          { backgroundColor: colors.grayBackground },
        ]}
      ></View>
      <ThemedText style={stylesSubCard.id} variant="caption" color="grayMedium">
        #{id.toString().padStart(3, "0")}
      </ThemedText>
      <Image
        style={stylesSubCard.img}
        source={require("@/assets/images/pomme.png")}
      />
      <ThemedText>{name}</ThemedText>
    </Card>
  );
}

const stylesSubCard = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 4,
  },
  img: {
    width: 72,
    height: 72,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 44,
    borderRadius: 7,
  },
});
