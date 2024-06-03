import { useFonts } from 'expo-font';
import Navigator from './src/Navigation/Navigator';
import ByGque from './src/Screens/ByGque';
import Version from './src/Screens/Version';
import { Provider } from 'react-redux';
import store from './src/Store/store'; 
import { init } from './src/SQLite';
import { useEffect } from 'react';
import {  StyleSheet, View, Text } from 'react-native'; 

 
export default function App() {
  
  useEffect(()=> {   
    init()
      .then((result)=> { 
        console.log(result);
      })
      .catch(err => { 
        console.log(err.message);
    })
  }, [])
  
  const [fontsLoaded] = useFonts({
    'Josefin': require('./src/Assets/Fonts/Josefin_Sans/JosefinSans-Regular.ttf'), 
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigator/>  
      <View style={styles.footer}>
      <ByGque/> 
      <Version/> 
      </View>
    </Provider>
  );
}


const styles = StyleSheet.create({ 
  footer: {
    height:"5%",
    display: "flex",
    flexDirection: "row",
    color: "red",
    justifyContent: 'center',
    alignItems: 'center',
  }})