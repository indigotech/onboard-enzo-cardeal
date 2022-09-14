import React, { PropsWithChildren } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { commonStyles } from './common-style';

interface SectionProps {
  title: string;
}

export const CommonSection: React.FC<PropsWithChildren<SectionProps>> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={commonStyles.sectionContainer}>
      <Text
        style={[
          commonStyles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          commonStyles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};
