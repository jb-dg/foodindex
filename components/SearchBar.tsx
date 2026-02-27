import { TextInput, View, Image, StyleSheet } from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type PropsSearchBar = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: PropsSearchBar) {
  const colors = useThemeColors();
  return (
    <Row
      style={[stylesSearchBar.wrapper, { backgroundColor: colors.grayWhite }]}
      gap={8}
    >
      <Image
        source={require("@/assets/images/search.png")}
        style={stylesSearchBar.tinyIcon}
      />
      <TextInput
        style={stylesSearchBar.input}
        onChangeText={onChange}
        value={value}
      ></TextInput>
    </Row>
  );
}

const stylesSearchBar = StyleSheet.create({
  tinyIcon: {
    width: 16,
    height: 16,
  },
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16,
  },
});
