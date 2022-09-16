import { GestureResponderEvent } from 'react-native';

export interface CustomButtonProps {
  title: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export interface FormProps {
  title: string;
  hasError: boolean;
  errorMessage?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}
