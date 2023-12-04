import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { api } from "../services/api";

type FormInputProp = {
  setFunction: any;
  label: string;
};

export default function PickerInput({ setFunction, label}: FormInputProp) {
  const [selected, setSeclected] = useState('0');

  return (
    <View style={styles.picker}>
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => {setFunction(itemValue), setSeclected(itemValue)}}
        itemStyle={styles.selectTextStyle}
      >
        <Picker.Item label={label} value="0" />
        <Picker.Item label="Homem" value="Homem" />
        <Picker.Item label="Mulher" value="Mulher" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#D9D9D9",
    marginBottom:20,
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    height: 56,
    padding: 16,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  selectTextStyle: {
    fontSize: 6,
    color: 'black',
  },
});