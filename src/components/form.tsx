import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { FormCaption, FormInputText, FormLabel, FormView } from '../styled-components';

interface Form {
  title: string;
  hasError: boolean;
  errorMessage?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value: string;
  placeholder?: string;
}

const Form = (props: Form) => {
  return (
    <View>
      <FormLabel hasError={props.hasError}>{props.title}</FormLabel>
      <FormInputText
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        hasError={props.hasError}
      />
      <FormView>{props.hasError && <FormCaption>{props.errorMessage}</FormCaption>}</FormView>
    </View>
  );
};

export default Form;
