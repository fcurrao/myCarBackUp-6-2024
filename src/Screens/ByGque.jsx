import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ByGque = () => {
  const handlePress = () => {
    Linking.openURL('https://fcurrao.github.io/fcurrao-1');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.linkText}>👳‍♂️Created by GQUE desarrollos👳‍♂️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "minContent",
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center', 
  },
});

export default ByGque;
