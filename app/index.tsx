import { StyleSheet, Image, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { ProductCard } from "@/components/product/ProductCard";

export default function Index() {
  const colors = useThemeColors();

  const PRODUCTS_LIST = Array.from({ length: 35 }, (_, k) => ({
    name: "Product name",
    id: k + 1,
  }));

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
              style={{ flex: 1 / 3 }}
              id={item.id}
              name={item.name}
            ></ProductCard>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
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
