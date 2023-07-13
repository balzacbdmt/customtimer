import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';

interface Props {
  timer: Timer,
  stopTimer: Function,
}

export default function Timer({
  timer,
  stopTimer,
}: Props) {
  const [step, setStep] = useState<Part | null>(null);
  const [round, setRound] = useState<number>(1);

  function delay(milliseconds: number) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function start() {
    const finalTimer: Array<Part> = [];
    let roundCounter: number = 1;
    for (let index = 0; index < Number(timer.loopsQuantity || 1); index++) {
      timer.parts.forEach((t: Part) => {
        for (var i = t.time; i > 0; i--) finalTimer.push({
          ...t,
          time: i,
        });
      });
      if (timer.breakDuration && index !== Number(timer.loopsQuantity || 1) - 1) {
        for (var i = timer.breakDuration; i > 0; i--) finalTimer.push({
          title: 'break',
          time: i,
          color: 'grey',
        });
      }
    }
    for (let index = 0; index < finalTimer.length + 1; index++) {
      if (index === finalTimer.length) {
        stopTimer();
        setStep(null);
      } else {
        setStep(finalTimer[index]);
        if (index !== 0 && finalTimer[index].title === timer.parts[0].title && finalTimer[index - 1].title !== timer.parts[0].title) {
          roundCounter = roundCounter += 1;
          setRound(roundCounter);
        }
        await delay(1000);
      }
    }
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: step ? step.color?.toString() : "grey" }]}>
      {timer.loopsQuantity && <Text style={styles.loopsCounter}>{round} / {timer.loopsQuantity}</Text>}
      <Text style={styles.timer}>{step?.time}</Text>
      <TouchableOpacity style={styles.stopButton} onPress={() => stopTimer()}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 100,
    color: '#fff',
    textAlign: 'center',
  },
  loopsCounter: {
    position: 'absolute',
    left: 0,
    top: Constants.statusBarHeight + 12,
    right: 0,
    textAlign: 'center',
    color: '#fff',
  },
  stopButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 150,
    textAlign: 'center',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
