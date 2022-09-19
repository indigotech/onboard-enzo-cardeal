import { BooleanValueNode } from 'graphql';
import { Alert } from 'react-native';

export const addUserFieldsValidation = ({
  isNameValid,
  isPhoneValid,
  isBirthDateValid,
  isEmailValid,
  isPasswordValid,
  isRoleValid,
}: {
  isNameValid: boolean;
  isPhoneValid: boolean;
  isBirthDateValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isRoleValid: boolean;
}) => {
  let alertDescription = '';

  const fieldsValidations = [isNameValid, isPhoneValid, isBirthDateValid, isEmailValid, isPasswordValid, isRoleValid];
  const messages = [
    'O campo Nome deve ser composto apenas por letras e deve ser preenchido com nome e sobrenome.\n\n',
    'O campo Telefone deve ser preenchido com 11 números, sendo os 2 primeiros o DD.\n\n',
    'O campo Aniversário deve ser prenchido no formato dd/mm/aaaa e deve ser uma data valida menor que o dia atual.\n\n',
    'O campo e-mail deve ser preenchido no formato: ####@####.com\n\n',
    'O campo Senha dever ser preenchido com ao menos 7 caracteres sendo pelo menos uma letra e um número.\n\n',
    'O campo Função deve ser "user" ou "admin"',
  ];

  for (let i = 0; i < fieldsValidations.length; i++) {
    const item = fieldsValidations[i];
    if (!item) {
      alertDescription += messages[i];
    }
  }
  if (alertDescription != '') {
    Alert.alert('Campo inválido', alertDescription, [{ text: 'OK' }]);
    return false;
  } else {
    return true;
  }
};
