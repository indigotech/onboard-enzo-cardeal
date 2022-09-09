import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeBearer = async (bearer: string) => {
  await AsyncStorage.setItem('bearer', bearer);
};

export const getBearer = async () => {
  const value = await AsyncStorage.getItem('bearer');

  return value;
};
