import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthenticationToken = async (bearer: string) => {
  try {
    await AsyncStorage.setItem('bearer', bearer);
  } catch (error) {
    console.log(error);
  }
};

export const getAuthenticationToken = async () => {
  let value = null;
  try {
    value = await AsyncStorage.getItem('bearer');
  } catch (error) {
    console.log(error);
  }
  return value;
};
