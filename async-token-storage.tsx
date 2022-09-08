import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeBearer = async (bearer: string) => {
  try {
    await AsyncStorage.setItem('bearer', bearer);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getBearer = async () => {
  try {
    const value = await AsyncStorage.getItem('bearer');
    if (value !== null) {
      // value previously stored
      console.log(value);
    }
  } catch (e) {
    // error reading value
  }
};
