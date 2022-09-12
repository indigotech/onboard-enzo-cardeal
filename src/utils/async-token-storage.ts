import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthenticationToken = async (bearer: string) => {
  await AsyncStorage.setItem('bearer', bearer);
};

export const getAuthenticationToken = async () => {
  const value = await AsyncStorage.getItem('bearer');

  return value;
};
