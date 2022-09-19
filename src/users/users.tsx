import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ErrorResponse, listUsersQuerry, QueryDataResponse } from '../apollo/apollo-model';
import { UserItem } from './users-model';
import { commonStyles } from '../common/common-style';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import Fab from '../common/fab';

const Users = (props: NavigationComponentProps) => {
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
    const handleCellPress = () => {
      Navigation.push(props.componentId, {
        component: {
          name: 'UserDetails',
          options: {
            topBar: {
              title: {
                text: 'Detalhes do usuário',
              },
            },
          },
        },
      });
    };

    return (
      <TouchableOpacity style={commonStyles.item} activeOpacity={0.1} onPress={handleCellPress}>
        <Text>Usuário: {item.name}</Text>
        <Text>E-mail: {item.email}</Text>
      </TouchableOpacity>
    );
  };

  const handleButtonPress = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'AddUser',
        options: {
          topBar: {
            title: {
              text: 'Novo usuário',
            },
          },
        },
      },
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      >
        <SafeAreaView style={commonStyles.item}>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.05}
            onEndReached={updateList}
            ListFooterComponent={loading ? <ActivityIndicator /> : null}
          />
          <Fab onPress={handleButtonPress} />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Users;
