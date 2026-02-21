import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styleText.text}>This is the about page.</Text>
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
    color: "#1711c2",
    fontSize: 18,
  },
});
