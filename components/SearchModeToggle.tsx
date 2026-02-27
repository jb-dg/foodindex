import { Pressable, StyleSheet } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type SearchMode = "brand" | "category";

type Props = {
  value: SearchMode;
  onChange: (mode: SearchMode) => void;
};

const MODES: { value: SearchMode; label: string }[] = [
  { value: "brand", label: "Marque" },
  { value: "category", label: "Catégorie" },
];

export function SearchModeToggle({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (
    <Row
      style={[styles.wrapper, { backgroundColor: colors.grayWhite + "33" }]}
      gap={4}
    >
      {MODES.map((mode) => {
        const isActive = mode.value === value;
        return (
          <Pressable
            key={mode.value}
            onPress={() => onChange(mode.value)}
            style={[
              styles.pill,
              isActive && { backgroundColor: colors.grayWhite },
            ]}
          >
            <ThemedText
              variant="subtitle3"
              color={isActive ? "tint" : "grayLight"}
            >
              {mode.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    padding: 4,
    alignSelf: "flex-start",
  },
  pill: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
