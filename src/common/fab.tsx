import React from 'react';
import { TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { commonStyles } from './common-style';

const Fab = (props: { onPress: ((event: GestureResponderEvent) => void) | undefined }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress} style={commonStyles.touchableOpacityStyle}>
      <Image source={require('../../resources/img/fab.png')} style={commonStyles.floatingButtonStyle} />
    </TouchableOpacity>
  );
};

export default Fab;
