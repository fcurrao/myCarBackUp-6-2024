import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import appConfig from '../../app.json'; 
// const appConfig = require('./app.json');
 
const Version = () => {

  const handlePress = () => {
    Linking.openURL('versiones');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.linkText}>{appConfig.expo.name} v.{appConfig.expo.version} </Text> 
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: "2%",
    height: "100%",
    width: "minContent",
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center', 
  },
});

export default Version;
