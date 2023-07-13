import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../constants/global';

interface Props {
  title: string,
  setTimer: Function,
}

export default function Card({
  title,
  setTimer,
}: Props) {

  return (
    <TouchableOpacity style={styles.card} onPress={() => setTimer()}>
      <Text style={{ color: '#fff', fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: (Dimensions.get('window').width - 12 * 3) / 2,
    height: (Dimensions.get('window').width - 12 * 3) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.cadetGray,
  }
});
