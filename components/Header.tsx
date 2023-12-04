import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Pressable,
  Text
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { Feather } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootState } from '../store'
import { logout } from '../store/modules/auth'

export default function Header({ navigation, route }: NativeStackHeaderProps) {
  const user = useSelector((store: RootState) => store.auth).user
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="black" />
      </Pressable>
      <Text style={styles.title}>Olá, {user.nome}</Text>
      <View>
        <Pressable
          onPress={() => {
            dispatch(logout())
          }}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  title: {
    fontSize: 30,
    color: 'black',
    lineHeight: 30
  },
})
