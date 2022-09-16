import styled from 'styled-components/native';

interface FormInputTextProps {
  hasError: boolean;
}

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-left: 50px;
  color: black #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? 0.1 : 1)};
  background-color: #00bcd4;
  border-radius: 10px;
  border-width: 1px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 300px;
  align-self: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const FormCaption = styled.Text`
  font-size: 12px;
  color: red;
  margin-top: 8px;
  font-weight: normal;
  padding-left: 66%;
`;

export const FormInputText = styled.TextInput<FormInputTextProps>`
  border: 1px;
  padding-left: 2%;
  height: 30px;
  border-radius: 5px;
  color: #777777;
  border-color: ${(props) => (props.hasError ? 'red' : 'black')};
  align-self: center;
  width: 300px;
`;

export const FormLabel = styled.Text<FormInputTextProps>`
  padding-left: 50px;
  font-size: 12px;
  font-weight: normal;
  color: ${(props) => (props.hasError ? 'red' : '#777777')};
  margin-bottom: 12px;
`;

export const FormView = styled.View`
  height: 27px;
`;
