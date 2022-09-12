import React from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { userList } from './mock';
import { UserItem } from './users-model';
import { styles } from './users-style';

const Users = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const renderItem = ({ item }: { item: UserItem }) => {
    return (
      <View style={styles.item} key={item.id}>
        <Text>Usuário: {item.user}</Text>
        <Text>E-mail: {item.email}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      >
        <SafeAreaView style={styles.item}>
          <FlatList data={userList} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Users;
