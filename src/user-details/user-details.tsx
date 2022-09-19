import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Text, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { userDetails } from '../../resources/mock/user-details-mock';
import { UserDetailProps } from './user-details-props';

const UserDetails = (props: UserDetailProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Text>Nome: {userDetails.name}</Text>
          <Text>Telefone: {userDetails.phone}</Text>
          <Text>Aniversário: {userDetails.birthDate}</Text>
          <Text>E-mail: {userDetails.email}</Text>
          <Text>Função: {userDetails.role}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;
