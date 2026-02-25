import { TextInput, View } from "react-native";

type PropsSearchBar = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: PropsSearchBar) {
  return (
    <View>
      <TextInput onChangeText={onChange} value={value}></TextInput>
    </View>
  );
}
