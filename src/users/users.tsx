import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { userList } from '../../resources/mock/mock';
import { styles } from './users-style';

const Users = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const listRender = userList.map((item) => {
    return (
      <View style={styles.item} key={item.id}>
        <Text>Usuário: {item.user}</Text>
        <Text>E-mail: {item.email}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          {listRender}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Users;
