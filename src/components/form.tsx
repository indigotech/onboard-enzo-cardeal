import React from 'react';
import { View } from 'react-native';
import { FormCaption, FormInputText, FormLabel, FormView } from '../styled-components/styled-components';
import { FormProps } from './interface';

const Form = (props: FormProps) => {
  return (
    <View>
      <FormLabel hasError={props.hasError}>{props.title}</FormLabel>
      <FormInputText
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        hasError={props.hasError}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
      />
      <FormView>{props.hasError && <FormCaption>{props.errorMessage}</FormCaption>}</FormView>
    </View>
  );
};

export default Form;
