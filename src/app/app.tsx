/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useMutation } from '@apollo/client';

import { storeAuthenticationToken } from '../utils/async-token-storage';
import { MutationDataResponse, ErrorResponse, loginMutation } from '../apollo/apollo-model';
import { emailPattern, passwordPattern } from '../utils/login-fields-regex-validation';
import { commonStyles } from '../common/common-style';
import { loginFieldsValidation } from '../utils/login-fields-validation';
import { CommonSection } from '../common/common-dynamic-color-section';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

const App = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const loginData = {
    variables: {
      data: { email: email, password: password },
    },
    onCompleted: (response: MutationDataResponse) => {
      const bearer = response.login.token;
      storeAuthenticationToken(bearer);
      Navigation.push(props.componentId, {
        component: {
          name: 'Users',
          options: {
            topBar: {
              title: {
                text: 'Usuários',
              },
            },
          },
        },
      });
    },
    onError: (response: ErrorResponse) => {
      const errorMessage = response.message;
      Alert.alert('ERRO', errorMessage, [{ text: 'OK' }]);
    },
  };
  const [login, { loading }] = useMutation(loginMutation);

  const handleButtonPress = async () => {
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);
    const areFieldsValid = loginFieldsValidation(isEmailValid, isPasswordValid);

    if (areFieldsValid) {
      await login(loginData);
    }
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
          <CommonSection title='Bem-vindo(a) à Taqtile!' />
          <Text>E-mail</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeEmail} value={email} />
          <Text>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={commonStyles.input}
            onChangeText={onChangePassword}
            value={password}
          />
          <Button title='Entrar' onPress={handleButtonPress} disabled={loading} />
          {loading && <ActivityIndicator color={'#000000'} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
