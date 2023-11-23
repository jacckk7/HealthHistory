import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    justifyContent: "center",
    alignSelf: "center",
    color: "black",
  },
});