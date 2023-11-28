import React from 'react'
import { View, Text, StyleSheet } from "react-native";

export default function Register() {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Registro</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black'
  }
})