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
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";

export default function Index() {
  const colors = useThemeColors();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteFetchQuery("/search?countries_tags=en:france", 20);

  const PRODUCTS_LIST =
    data?.pages.flatMap((page) => page.products ?? []) ?? [];

  //filtre pour obtenir uniquement les produits avec un nom
  const itemListRender = PRODUCTS_LIST.filter(
    (item) => item?.abbreviated_product_name,
  );

  const isInitialLoading = isFetching && itemListRender.length === 0;

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
          data={itemListRender}
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
            isFetchingNextPage ? (
              <ActivityIndicator color={colors.tint} size="large" />
            ) : null
          }
          ListEmptyComponent={
            isInitialLoading ? (
              <ActivityIndicator color={colors.tint} size="large" />
            ) : null
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
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
