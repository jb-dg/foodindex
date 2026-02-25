import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { ProductCard } from "@/components/product/ProductCard";
import { useFetchQuery } from "@/hooks/useFetchQuery";

export default function Index() {
  const colors = useThemeColors();

  const { data, isFetching } = useFetchQuery(
    "/search?countries_tags=en:france&page_size=21",
  );
  const PRODUCTS_LIST = data?.products ?? [];

  // const PRODUCTS_LIST = Array.from({ length: 35 }, (_, k) => ({
  //   name: "Product name",
  //   id: k + 1,
  // }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require("@/assets/images/pomme-w.png")}
        />
        <ThemedText variant="headline" color="grayLight">
          My Food App
        </ThemedText>
      </View>
      <Card style={styles.body}>
        <FlatList
          data={PRODUCTS_LIST}
          renderItem={({ item }) => (
            <ProductCard
              style={{ flex: 1 / 2 }}
              id={item.code}
              name={item.abbreviated_product_name}
              imagePath={item.image_front_url}
            ></ProductCard>
          )}
          keyExtractor={(item) => item.code.toString()}
          numColumns={2}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
        ></FlatList>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 26,
    height: 26,
    color: "#FFF",
  },
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12,
  },
  body: {
    flex: 1,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
