import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AddUserMutationDataResponse, createUserMutation, ErrorResponse } from '../apollo/apollo-model';
import { commonStyles } from '../common/common-style';
import {
  emailPattern,
  idPattern,
  namePattern,
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

  const [id, onChangeId] = useState('');
  const [name, onChangeName] = useState('');
  const [phone, onChangePhone] = useState('');
  const [birthDate, onChangeBirthDate] = useState('');
  const [email, onChangeEmail] = useState('');
  const [role, onChangeRole] = useState('');
  const [password, onChangePassword] = useState('');

  const [createUser, { loading }] = useMutation(createUserMutation);
  const createUserData = {
    variables: {
      data: {
        name: name,
        email: email,
        phone: phone,
        birthDate: birthDate,
        password: password,
        role: role,
      },
    },
    onCompleted: (response: AddUserMutationDataResponse) => {
      console.log(response);
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
    const isIdValid = idPattern.test(id);
    const isNameValid = namePattern.test(name);
    const isPhoneValid = phonePattern.test(phone);
    const isBirthDateValid = validateDate(birthDate);
    const isEmailValid = emailPattern.test(email);
    const isRoleValid = rolePattern.test(role);

    const fieldsValidation = [isIdValid, isNameValid, isPhoneValid, isBirthDateValid, isEmailValid, isRoleValid];
    const areFieldsValid = addUserFieldsValidation(fieldsValidation);

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
          <Text>CPF</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeId} value={id} placeholder='12345678912' />
          <Text>Nome</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeName} value={name} />
          <Text>Telefone</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangePhone} value={phone} placeholder='12345678912' />
          <Text>Aniversário</Text>
          <TextInput
            style={commonStyles.input}
            onChangeText={onChangeBirthDate}
            value={birthDate}
            placeholder='01/01/2000'
          />
          <Text>E-mail</Text>
          <TextInput
            style={commonStyles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder='nome@email.com'
          />
          <Text>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={commonStyles.input}
            onChangeText={onChangePassword}
            value={password}
          />
          <Text>Função</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeRole} value={role} />
          <Button title='Criar' onPress={handleButtonPress} disabled={loading} />
          {loading && <ActivityIndicator color={'#000000'} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddUser;
