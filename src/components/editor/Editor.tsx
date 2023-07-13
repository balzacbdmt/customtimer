import { useState } from 'react';
import { Button, Dimensions, FlatList, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import InputRow from '../../components/inputRow/InputRow';
import { colors, getData, storeData } from '../../constants/global';
import ColorPicker from '../colorPicker/ColorPicker';

interface Props {
  setDisplayEditor: Function,
}

export default function Editor({
  setDisplayEditor,
}: Props) {
  const [title, setTitle] = useState<string | null>(null);
  const [parts, setParts] = useState<Array<Part>>([]);
  const [titlePart, setTitlePart] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [loopsQuantity, setLoopsQuantity] = useState<number | null>(null);
  const [breakDuration, setBreakDuration] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);

  function addPart() {
    if (titlePart && time) {
      setParts([...parts, { title: titlePart, time, color }]);
      setTitlePart(null);
      setTime(null);
      setColor(null);
    }
  }

  function addTimer() {
    if (title && parts.length) {
      Keyboard.dismiss();
      getData('timers').then((t) => {
        let nextTimers: Array<Timer> = t ? JSON.parse(t) : [];
        nextTimers.push({
          id: t ? JSON.parse(t).length + 1 : 1,
          title,
          parts,
          loopsQuantity,
          breakDuration,
        });
        storeData('timers', JSON.stringify(nextTimers)).then(() => {
          setDisplayEditor(false);
        });
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setDisplayEditor(false)}>
          <Text style={{ color: '#fff', fontSize: 24 }}>X</Text>
        </TouchableOpacity>
        <View style={styles.menuTop}>
          <TextInput placeholder='title of timer' value={title || undefined} onChange={(e) => setTitle(e.nativeEvent.text)} />
          <InputRow title='Break duration :' value={breakDuration} onChange={setBreakDuration} unit="second(s)" />
          <InputRow title='Loops quantity :' value={loopsQuantity} onChange={setLoopsQuantity} unit="time(s)" />
        </View>
        <FlatList
          data={parts}
          renderItem={({ item }) => (
            <View style={[styles.row, { backgroundColor: item.color || 'unset' }]}>
              <InputRow title={item.title} value={item.time} onChange={setLoopsQuantity} unit="second(s)" />
            </View>
          )}
        />
        <View style={[styles.rowAdd, { backgroundColor: 'unset' }]}>
          <TextInput placeholder='title of part' value={titlePart || undefined} onChange={(e) => setTitlePart(e.nativeEvent.text)} />
          <TextInput placeholder='time (in seconds)' value={time?.toString() || undefined} onChange={(e) => setTime(Number(e.nativeEvent.text))} inputMode="numeric" />
          <Button onPress={() => addPart()} title='Add' disabled={!titlePart || !time || !color} />
        </View>
        <ColorPicker color={color} setColor={setColor} />
        <View>
          <Button onPress={() => addTimer()} title='Done' disabled={!parts.length} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.battleshipGray,
    alignItems: 'center',
    zIndex: 2,
    position: 'absolute',
    top: Constants.statusBarHeight + 12,
    right: 30,
    bottom: 30,
    left: 30,
    borderRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  menuTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
    paddingBottom: 24,
  },
  row: {
    width: Dimensions.get('window').width,
    backgroundColor: 'red',
    padding: 12,
    marginBottom: 1,
  },
  rowAdd: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'purple',
  }
});
