import { Alert } from "react-native";

export const addUserFieldsValidation = (isIdValid: boolean, isNameValid: boolean, isPhoneValid: boolean, isBirthDateValid: boolean, isEmailValid: boolean, isRoleValid: boolean) => {
    let alertDescription = '';
  
    const booleanList = [isIdValid, isNameValid, isPhoneValid, isBirthDateValid, isEmailValid, isRoleValid]
    const messages = [
      'O campo CPF deve ser composto apenas por números e deve ter um total de 11 digitos.\n\n',
      'O campo Nome deve ser composto apenas por letras e deve ser preenchido com nome e sobrenome.\n\n',
      'O campo Telefone deve ser preenchido com 11 números, sendo os 2 primeiros o DD.\n\n',
      'O campo Aniversário deve ser prenchido no formato dd/mm/aaaa e deve ser uma data valida menor que o dia atual.\n\n',
      'O campo e-mail deve ser preenchido no formato: ####@####.com\n\n',
      'O campo Função é uma palavra única e deve ser preenchido apenas com letras.'
    ]
  
    for (let i = 0; i < booleanList.length; i++){
      const item = booleanList[i]
      if(!item){
        alertDescription += messages[i]
      }
    }
    if (alertDescription != '') {
      Alert.alert( 'Campo inválido', alertDescription, [{ text: 'OK'}]);
    }
  };