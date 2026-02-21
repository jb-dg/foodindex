import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Product() {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styleText.text}>Product ID: {params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styleText = StyleSheet.create({
  text: {
    color: "#333",
    fontSize: 18,
  },
});
