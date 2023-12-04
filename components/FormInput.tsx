import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useController, RegisterOptions } from "react-hook-form";
import { TextInputProps } from "react-native";
import Input from "./Input";

type FormInputProps = {
  name: string;
  children?: React.ReactNode;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
} & TextInputProps;


export default function FormInput({ name, rules, children, ...inputProps }: FormInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <View style={styles.container}>
      <View style={styles.input}>{children}</View>
      <Input
        style={children ? { paddingLeft: 38 } : null}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        error={error?.message}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    position: "absolute",
    zIndex: 2,
    left: 10,
    top: 16,
  },
});