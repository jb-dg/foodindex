import { ViewStyle, StyleSheet, Image, View, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { Card } from "@/components/Card";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";

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
    <Link href={{ pathname: "/product/[id]", params: { id: id } }} asChild>
      <Pressable style={style}>
        <Card style={[stylesSubCard.container]}>
          <View
            style={[
              stylesSubCard.shadow,
              { backgroundColor: colors.grayBackground },
            ]}
          ></View>
          <ThemedText
            style={stylesSubCard.id}
            variant="caption"
            color="grayMedium"
          >
            #{id.toString()}
          </ThemedText>
          <Image style={stylesSubCard.img} source={imageSource} />
          {/* <ThemedText>{name}</ThemedText> */}
        </Card>
      </Pressable>
    </Link>
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
