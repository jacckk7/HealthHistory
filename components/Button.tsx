import React from "react";
import { StyleSheet, Pressable, Text, View, ActivityIndicator } from "react-native";

type StyledButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
};

export default function Button({ text, onPress, loading }: StyledButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>{text}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#00B39D",
    marginVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
});