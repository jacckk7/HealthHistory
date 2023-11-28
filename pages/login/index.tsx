import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Pressable
} from 'react-native'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types";
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'

type FormData = {
  email: string
  password: string
}

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: LoginScreenProps) {
  const form = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const onSubmit = (data: any) => {
    setLoading(true)
    setError('')
    /* api
      .post('auth/login', data)
      .then(resp => {
        const { data } = resp
        dispatch(login(data))
      })
      .catch(() => setError('E-mail ou senha incorretos'))
      .finally(() => setLoading(false)) */
  }

  return (
    <TouchableWithoutFeedback>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background.png')}
      >
        <Image source={require('../../assets/logo.png')} />
        <View style={styles.inputContainer}>
          <FormProvider {...form}>
            <FormInput
              name="email"
              placeholder="exemplo@email.com"
              rules={{
                required: {
                  value: true,
                  message: '*digite seu e-mail'
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: '*e-mail invalido'
                }
              }}
            />
            <FormInput
              name="password"
              placeholder="********"
              secureTextEntry
              rules={{
                required: {
                  value: true,
                  message: '*digite uma senha'
                },
                minLength: {
                  value: 8,
                  message: '*senha deve conter no mínimo 8 caracteres'
                }
              }}
            ></FormInput>
          </FormProvider>
          {error !== '' && <Text style={styles.errorTxt}>{error}</Text>}

          <Button
            text="Login"
            onPress={form.handleSubmit(onSubmit)}
            loading={loading}
          />

          <Pressable onPress={() => navigation.navigate('Register')} style={styles.newAccount}>
            <Text style={styles.text}>Nova conta</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '100%',
    marginVertical: 32,
    paddingHorizontal: 72
  },
  newAccount: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  errorTxt: {
    color: 'red'
  }
})
