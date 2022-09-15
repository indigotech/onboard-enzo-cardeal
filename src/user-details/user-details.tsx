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
import { userDetails } from '../../resources/mock/user-details-mock';
import { ErrorResponse, UserQueryDataResponse } from '../apollo/apollo-interfaces';
import { userQuery } from '../apollo/queries';
import { UserDetailProps } from './user-details-props';

const UserDetails = (props: UserDetailProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const listUsersData = {
    variables: {
      ID: props.userId,
    },
    onCompleted: (response: UserQueryDataResponse) => {
      setName(response.user.name);
      setPhone(response.user.phone);
      setBirthDate(response.user.birthDate);
      setEmail(response.user.email);
      setRole(response.user.role);
    },
    onError: (response: ErrorResponse) => {
      const errorMessage = response.message;
      Alert.alert('ERRO', errorMessage, [{ text: 'OK' }]);
    },
  };

  const { loading } = useQuery(userQuery, listUsersData);
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
            <Text>Nome: {name}</Text>
            <Text>Telefone: {phone}</Text>
            <Text>Aniversário: {birthDate}</Text>
            <Text>E-mail: {email}</Text>
            <Text>Função: {role}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;
