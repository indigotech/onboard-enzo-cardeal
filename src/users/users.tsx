import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ErrorResponse, listUsersQuerry, QueryDataResponse } from '../apollo/apollo-model';
import { UserItem } from './users-model';
import { styles } from './users-style';

const Users = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState([]);
  const hasNextPage = useRef(true);
  const listUsersData = {
    variables: {
      pageInfo: {
        offset: offset,
        limit: 30,
      },
    },
    onCompleted: (response: QueryDataResponse) => {
      setUsers([...users, ...response.users.nodes]);
      hasNextPage.current = response.users.pageInfo.hasNextPage;
    },
    onError: (response: ErrorResponse) => {
      const errorMessage = response.message;
      Alert.alert('ERRO', errorMessage, [{ text: 'OK' }]);
    },
  };
  const { loading } = useQuery(listUsersQuerry, listUsersData);

  const updateList = () => {
    if (hasNextPage.current) {
      setOffset(offset + 30);
    }
  };

  const renderItem = ({ item }: { item: UserItem }) => {
    return (
      <View style={styles.item} key={item.id}>
        <Text>Usuário: {item.name}</Text>
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
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.05}
            onEndReached={updateList}
            ListFooterComponent={loading ? <ActivityIndicator /> : null}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Users;
