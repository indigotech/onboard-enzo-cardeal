/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { gql, useMutation } from '@apollo/client';

import { storeBearer } from './async-token-storage';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

interface DataResponse {
  login: {
    __typename: string;
    token: string;
    user: {
      __typename: string;
      id: string;
    };
  };
}

interface ErrorResponse {
  message: string;
}

interface SectionProps {
  title: string;
}
const Section: React.FC<PropsWithChildren<SectionProps>> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};
const App = (props: NavigationComponentProps) => {
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{7,}$/;
  const loginMutation = gql`
    mutation Login($data: LoginInputType!) {
      login(data: $data) {
        token
        user {
          id
        }
      }
    }
  `;
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
  const [login] = useMutation(loginMutation);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleButtonPress = async () => {
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);

    let alertTitle = '';
    let alertDescription = '';
    if (!isEmailValid && !isPasswordValid) {
      alertTitle = 'E-mail e sennha inválidos.';
      alertDescription =
        "Por favor, insira um e-mail no formato '####@####.com', e uma senha com pelo menos 7 caracteres sendo pelo menos uma letra e um número.";
    } else if (!isEmailValid && isPasswordValid) {
      alertTitle = 'E-mail inválido.';
      alertDescription = 'Por favor, innsira um e-mail no formato: ####@####.com.';
    } else if (!isPasswordValid) {
      alertTitle = 'Senha inválida.';
      alertDescription =
        'Por favor, insira uma senha com pelo menos 7 caracteres, contendo pelo menos uma letra e um número';
    }

    if (!isEmailValid || !isPasswordValid) {
      Alert.alert(alertTitle, alertDescription, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
    } else {
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
          <Button title='Entrar' onPress={handleButtonPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
