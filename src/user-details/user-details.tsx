import { useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ErrorResponse, UserQueryDataResponse } from '../apollo/apollo-interfaces';
import { userQuery } from '../apollo/queries';
import { UserDetailProps } from './user-details-props';

const UserDetails = (props: UserDetailProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const listUsersData = {
    variables: {
      ID: props.userId,
    },
    onError: (response: ErrorResponse) => {
      const errorMessage = response.message;
      Alert.alert('ERRO', errorMessage, [{ text: 'OK' }]);
    },
  };

  const { data, loading } = useQuery(userQuery, listUsersData);
  const user = data?.user;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {loading && <ActivityIndicator />}
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        {!loading && (
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          >
            <Text>Nome: {user.name}</Text>
            <Text>Telefone: {user.phone}</Text>
            <Text>Aniversário: {user.birthDate}</Text>
            <Text>E-mail: {user.email}</Text>
            <Text>Função: {user.role}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;
