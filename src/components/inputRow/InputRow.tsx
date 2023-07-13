import { TextInput, StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string,
  value: string | number | null,
  onChange: Function,
  unit?: string,
}

export default function InputRow({
  title,
  value,
  onChange,
  unit,
}: Props) {

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputText, { flex: 3, textAlign: 'right' }]}>{title}</Text>
      <TextInput
        placeholder='0'
        value={value ? String(value) : undefined}
        onChange={(e) => onChange(e.nativeEvent.text ? Number(e.nativeEvent.text) : null)}
        inputMode="numeric"
        style={styles.input}
      />
      {unit && <Text style={[styles.inputText, { flex: 3 }]}>{unit}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  inputText: {
    fontSize: 21,
    marginBottom: 2
  },
  input: {
    fontSize: 21,
    paddingVertical: 2,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});
