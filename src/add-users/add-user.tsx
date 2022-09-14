import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Text, TextInput, Button, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { commonStyles } from '../common/common-style';
import {
  birthDatePattern,
  emailPattern,
  idPattern,
  namePattern,
  phonePattern,
  rolePattern,
} from '../utils/add-user-fields-regex-validation';
import { addUserFieldsValidation } from '../utils/add-user-fields-validation';

export const AddUser = () => {
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

  const handleButtonPress = () => {
    const isIdValid = idPattern.test(id);
    const isNameValid = namePattern.test(name);
    const isPhoneValid = phonePattern.test(phone);
    const isBirthDateValid = birthDatePattern.test(birthDate);
    const isEmailValid = emailPattern.test(email);
    const isRoleValid = rolePattern.test(role);

    addUserFieldsValidation(isIdValid, isNameValid, isPhoneValid, isBirthDateValid, isEmailValid, isRoleValid);
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
          <Text>Id</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeId} value={id} placeholder='1234' />
          <Text>Nome</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeName} value={name} />
          <Text>Telefone</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangePhone} value={phone} placeholder='00000000000' />
          <Text>Aniversário</Text>
          <TextInput
            style={commonStyles.input}
            onChangeText={onChangeBirthDate}
            value={birthDate}
            placeholder='00/00/00'
          />
          <Text>E-mail</Text>
          <TextInput
            style={commonStyles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder='nome@email.com'
          />
          <Text>Função</Text>
          <TextInput style={commonStyles.input} onChangeText={onChangeRole} value={role} />
          <Button title='Entrar' onPress={handleButtonPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddUser;
