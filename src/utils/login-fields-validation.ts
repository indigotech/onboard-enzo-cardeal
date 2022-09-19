import { Alert } from 'react-native';

export const loginFieldsValidation = (isEmailValid: boolean, isPasswordValid: boolean) => {
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
    Alert.alert(alertTitle, alertDescription, [{ text: 'OK' }]);
  }

  return isEmailValid && isPasswordValid;
};
