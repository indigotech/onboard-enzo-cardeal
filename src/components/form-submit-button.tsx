import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { ButtonContainer, ButtonText } from '../styled-components/styled-components';

interface FormSubmitButtonProps {
  title: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  return (
    <ButtonContainer activeOpacity={0.7} onPress={props.onPress} disabled={props.disabled}>
      <ButtonText>{props.title}</ButtonText>
    </ButtonContainer>
  );
};

export default FormSubmitButton;
