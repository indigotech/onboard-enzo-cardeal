/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {type PropsWithChildren} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TextInput,
   Button,
 } from 'react-native';
 
 import {
   Colors
 } from 'react-native/Libraries/NewAppScreen';
 
 const Section: React.FC<
   PropsWithChildren<{
     title: string;
   }>
 > = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 

};
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
   const [email, onChangeEmail] = React.useState("");
   const [password,onChangePassword] = React.useState("");
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <View
         style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section title="Bem-vindo(a) à Taqtile!"/>
           <Text>E-mail</Text>
           <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            />
            <Text>Senha</Text>
            <TextInput
             style={styles.input}
             onChangeText={onChangePassword}
             value={password}
            />
            <Button
             title='Entrar'
            />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
 });
 
 export default App;
 