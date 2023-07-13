import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  color: string | null,
  setColor: Function,
}

export default function ColorPicker({
  color,
  setColor,
}: Props) {

  const colors: Array<string> = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF'
  ];

  const buttons = colors.map((c: string) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: c, borderColor: c === color ? '#666' : 'transparent' }]}
      onPress={() => setColor(c)}
    >
    </TouchableOpacity>
  ))

  return (
    <ScrollView style={styles.container} horizontal>
      {buttons}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  button: {
    height: 40,
    width: 40,
    borderWidth: 2,
    marginHorizontal: 3
  }
});
