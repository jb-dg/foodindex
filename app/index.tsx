import { StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { ProductCard } from "@/components/product/ProductCard";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { SearchBar } from "@/components/SearchBar";
import { SearchModeToggle } from "@/components/SearchModeToggle";
import { useMemo, useState, useEffect } from "react";
import { Row } from "@/components/Row";

type SearchMode = "brand" | "category";

export default function Index() {
  const colors = useThemeColors();

  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("brand");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const path = useMemo(() => {
    if (!debouncedSearch) return "/search?countries_tags=en:france";
    if (searchMode === "brand") return `/search?brands_tags=${debouncedSearch}`;
    return `/search?categories_tags=${debouncedSearch}`;
  }, [debouncedSearch, searchMode]);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteFetchQuery(path, 20);

  const PRODUCTS_LIST =
    data?.pages.flatMap((page) => page.products ?? []) ?? [];

  //filtre pour obtenir uniquement les produits avec un nom
  //const itemListRender = PRODUCTS_LIST.filter((item) => item?.coder);
  const itemListRender = PRODUCTS_LIST;

  const isInitialLoading = isFetching && itemListRender.length === 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      {/* header */}
      <Row style={styles.header} gap={16}>
        <Image
          style={styles.tinyLogo}
          source={require("@/assets/images/pomme-w.png")}
        />
        <ThemedText variant="headline" color="grayLight">
          My Food App
        </ThemedText>
      </Row>
      {/* search bar */}
      <Row>
        <SearchBar value={search} onChange={setSearch} />
      </Row>
      {/* body list des produits sous formes de card */}
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
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
