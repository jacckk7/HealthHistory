import React from "react";
import { StyleSheet, TextInput, TextInputProps, Text, View } from "react-native";

export type InputProps = {
  error?: string;
} & TextInputProps;

export default function Input({ error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput style={[styles.input, style]} {...props} />
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 75,
  },
  input: {
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    color: "black"
  },
  textError: {
    textAlign: "left",
    lineHeight: 22,
    color: "red",
  },
});