import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { ButtonContainer, ButtonText } from '../styled-components/styled-components';
import { CustomButtonProps } from './interface';

const CustomButton = (props: CustomButtonProps) => {
  return (
    <ButtonContainer activeOpacity={0.7} onPress={props.onPress} disabled={props.disabled}>
      <ButtonText>{props.title}</ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
