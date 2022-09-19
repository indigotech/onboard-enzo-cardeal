/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View, Alert, ActivityIndicator } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useMutation } from '@apollo/client';

import { storeAuthenticationToken } from '../utils/async-token-storage';
import { LoginMutationDataResponse, ErrorResponse } from '../apollo/apollo-interfaces';
import { emailPattern, passwordPattern } from '../utils/login-fields-regex-validation';
import { loginFieldsValidation } from '../utils/login-fields-validation';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { loginMutation } from '../apollo/mutations';
import { Title } from '../styled-components/styled-components';
import FormTextField from '../components/form-text-field';
import FormSubmitButton from '../components/form-submit-button';

const Login = (props: NavigationComponentProps) => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData = {
    variables: {
      data: { email: email, password: password },
    },
    onCompleted: (response: LoginMutationDataResponse) => {
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
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
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
          <Title>Bem-vindo(a) à Taqtile</Title>
          <FormTextField
            title='E-mail'
            hasError={emailError}
            errorMessage='E-mail inválido'
            onChangeText={setEmail}
            value={email}
            autoCapitalize='none'
          />
          <FormTextField
            title='Senha'
            hasError={passwordError}
            errorMessage='Senha inválida'
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <FormSubmitButton title='Entrar' onPress={handleButtonPress} disabled={loading} />
          {loading && <ActivityIndicator color={'#000000'} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
