import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { ButtonContainer, ButtonText } from '../styled-components';

interface CustomButtonProps {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <ButtonContainer activeOpacity={0.7} onPress={props.onPress}>
      <ButtonText>{props.title}</ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
