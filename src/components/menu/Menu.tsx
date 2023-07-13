import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { colors, getData } from '../../constants/global';
import Card from './Card';
import { useEffect, useState } from 'react';

interface Props {
  setTimer: Function,
  setDisplayEditor: Function,
}

export default function Menu({
  setTimer,
  setDisplayEditor,
}: Props) {
  const [timers, setTimers] = useState<Array<Timer>>([]);

  useEffect(() => {
    getData('timers').then((t) => {
      if (t) setTimers(JSON.parse(t));
    })
  }, [setDisplayEditor, setTimer]);

  return (
    <View style={styles.container}>
      {timers?.map((t: Timer) => (
        <Card setTimer={() => setTimer(t)} title={t.title + t.id} />
      ))}
      <Card setTimer={() => setDisplayEditor(true)} title='New timer' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: Constants.statusBarHeight,
    gap: 12,
    backgroundColor: colors.taupe,
  },
});
