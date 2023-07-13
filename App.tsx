import { useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Menu from './src/components/menu/Menu';
import Editor from './src/components/editor/Editor';
import Timer from './src/components/timer/Timer';

export default function App() {
  const [timer, setTimer] = useState<Timer | null>(null);
  const [displayEditor, setDisplayEditor] = useState<Boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Menu
          setTimer={(t: Timer) => setTimer(t)}
          setDisplayEditor={(b: boolean, t?: string) => setDisplayEditor(b)}
        />
        {displayEditor && <Editor setDisplayEditor={setDisplayEditor} />}
        {timer && <Timer timer={timer} stopTimer={() => setTimer(null)} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
