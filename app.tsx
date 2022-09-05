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
   Alert,
 } from 'react-native';
 
 import {
   Colors
 } from 'react-native/Libraries/NewAppScreen';
 
interface SectionProps {
  title: string;
}
 const Section: React.FC<PropsWithChildren<SectionProps>> = ({children, title}) => {
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
   
   const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
   const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{7,}$/;
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
            secureTextEntry={true}
             style={styles.input}
             onChangeText={onChangePassword}
             value={password}
            />
            <Button
             title='Entrar'
             onPress={
                ()=>{
                    if(!emailPattern.test(email) && !passwordPattern.test(password)){
                        Alert.alert(
                            "E-mail e sennha inválidos.",
                            "Por favor, insira um e-mail no formato '####@####.com', e uma senha com pelo menos 7 caracteres sendo pelo menos uma letra e um número.",
                            [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                    
                    else if(!emailPattern.test(email) && passwordPattern.test(password)){
                        Alert.alert(
                            "E-mail inválido.",
                            "Por favor, innsira um e-mail no formato: ####@####.com.",
                            [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                    else if(!passwordPattern.test(password)){
                        Alert.alert(
                            "Senha inválida.",
                            "Por favor, insira uma senha com pelo menos 7 caracteres, contendo pelo menos uma letra e um número",
                            [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                }
             }
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
 