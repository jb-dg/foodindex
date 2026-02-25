import { ViewStyle, StyleSheet, Image, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Card } from "@/components/Card";
import { useThemeColors } from "@/hooks/useThemeColors";

type PropsProductCard = {
  style?: ViewStyle;
  id: number;
  name: string;
  imagePath: string;
};

export function ProductCard({ style, id, name, imagePath }: PropsProductCard) {
  const colors = useThemeColors();
  const imageSource = imagePath
    ? { uri: imagePath }
    : require("@/assets/images/pomme.png");

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
      <Image style={stylesSubCard.img} source={imageSource} />
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
    width: 100,
    height: 100,
    resizeMode: "contain",
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
