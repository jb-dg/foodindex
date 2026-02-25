import { TextInput, View } from "react-native";
import { Row } from "./Row";

type PropsSearchBar = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: PropsSearchBar) {
  return (
    <Row>
      <TextInput onChangeText={onChange} value={value}></TextInput>
    </Row>
  );
}
