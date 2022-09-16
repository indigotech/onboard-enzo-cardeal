import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AddUserMutationDataResponse, ErrorResponse } from '../apollo/apollo-interfaces';
import { createUserMutation } from '../apollo/mutations';
import CustomButton from '../components/custom-button';
import Form from '../components/form';
import { Title } from '../styled-components/styled-components';
import {
  emailPattern,
  idPattern,
  namePattern,
  passwordPattern,
  phonePattern,
  rolePattern,
} from '../utils/add-user-fields-regex-validation';
import { addUserFieldsValidation } from '../utils/add-user-fields-validation';
import { validateDate } from '../utils/date-validation';

export const AddUser = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [name, onChangeName] = useState('');
  const [phone, onChangePhone] = useState('');
  const [birthDate, onChangeBirthDate] = useState('');
  const [email, onChangeEmail] = useState('');
  const [role, onChangeRole] = useState('');
  const [password, onChangePassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [createUser, { loading }] = useMutation(createUserMutation);
  const birthDateSplitted = birthDate.split('/');
  const birthDateFormatted = birthDateSplitted[2] + '-' + birthDateSplitted[1] + '-' + birthDateSplitted[0];
  const createUserData = {
    variables: {
      data: {
        name,
        email,
        phone,
        birthDate: birthDateFormatted,
        password,
        role,
      },
    },
    onCompleted: (response: AddUserMutationDataResponse) => {
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

  const handleButtonPress = async () => {
    const isNameValid = namePattern.test(name);
    const isPhoneValid = phonePattern.test(phone);
    const isBirthDateValid = validateDate(birthDateFormatted);
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);
    const isRoleValid = rolePattern.test(role);

    setNameError(!isNameValid);
    setPhoneError(!isPhoneValid);
    setBirthDateError(!isBirthDateValid);
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setRoleError(!isRoleValid);

    const areFieldsValid = addUserFieldsValidation({
      isNameValid,
      isPhoneValid,
      isBirthDateValid,
      isEmailValid,
      isPasswordValid,
      isRoleValid,
    });
    if (areFieldsValid) {
      await createUser(createUserData);
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
          <Title>Criar Usuário</Title>
          <Form
            title='Nome'
            hasError={nameError}
            errorMessage='Nome inválido'
            value={name}
            onChangeText={onChangeName}
          />
          <Form
            title='Telefone'
            hasError={phoneError}
            errorMessage='Telefone inválido'
            value={phone}
            onChangeText={onChangePhone}
            placeholder='12345678912'
          />
          <Form
            title='Aniversário'
            hasError={birthDateError}
            errorMessage='Data inválida'
            value={birthDate}
            onChangeText={onChangeBirthDate}
            placeholder='01/01/2000'
          />
          <Form
            title='E-mail'
            hasError={emailError}
            errorMessage='E-mail inválido'
            value={email}
            onChangeText={onChangeEmail}
            placeholder='nome@email.com'
            autoCapitalize='none'
          />
          <Form
            title='Senha'
            hasError={passwordError}
            errorMessage='Senha inválida'
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={true}
          />
          <Form
            title='Função'
            hasError={roleError}
            errorMessage='Função inválida'
            value={role}
            onChangeText={onChangeRole}
            placeholder='user'
            autoCapitalize='none'
          />
          <CustomButton title='Criar' onPress={handleButtonPress} disabled={loading} />
          {loading && <ActivityIndicator color={'#000000'} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddUser;
