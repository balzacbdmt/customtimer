import AsyncStorage from '@react-native-async-storage/async-storage';

export const colors = {
  bistre: '#322214',
  taupe: '#4c443c',
  dimGray: '#636564',
  battleshipGray: '#7c898b',
  cadetGray: '#93a3b1',
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const getProgramById = async (id: number) => {
  try {
    const t = await getData('timers');
     const timers: Array<Timer> = t ? JSON.parse(t) : [];
     console.log(timers.find((ti: Timer) => ti.id === id));
     return timers.find((ti: Timer) => ti.id === id); 
  } catch(e) {
    return "No timers";
  }
}