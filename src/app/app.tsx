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

import { storeBearer } from '../utils/async-token-storage';
import { DataResponse, ErrorResponse, loginMutation } from '../apollo/apollo-model';
import { emailPattern, passwordPattern } from '../utils/regex-validation';
import { styles } from './app-styles';
import { loginFieldsValidation } from '../utils/utils';
import { Section } from '../utils/dynamic-color-section';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

const App = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const loginData = {
    variables: {
      data: { email: email, password: password },
    },
    onCompleted: (response: DataResponse) => {
      const bearer = response.login.token;
      storeBearer(bearer);
    },
    onError: (response: ErrorResponse) => {
      const errorMessage = response.message;
      Alert.alert('Conta não encontrada', errorMessage, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
    },
  };
  const [login, { loading }] = useMutation(loginMutation);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleButtonPress = async () => {
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);
    const areFieldsValid = loginFieldsValidation(isEmailValid, isPasswordValid);

    if (areFieldsValid) {
      await login(loginData);
      Navigation.push(props.componentId, {
        component: {
          name: 'BlankScreen',
          options: {
            topBar: {
              title: {
                text: 'BlankScreen',
              },
            },
          },
        },
      });
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
          <Section title='Bem-vindo(a) à Taqtile!' />
          <Text>E-mail</Text>
          <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} />
          <Text>Senha</Text>
          <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChangePassword} value={password} />
          <Button title='Entrar' onPress={handleButtonPress} disabled={loading} />
          {loading && <ActivityIndicator color={'#000000'} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
