import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Pressable,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Types'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import PickerInput from '../../components/PickerInput'
import DateInput from '../../components/DateInput'
import { api } from '../../services/api'

type FormData = {
  nome: string
  email: string
  senha: string
  sexo: string
  data_de_nascimento: string
}

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>

export default function Register({ navigation }: RegisterScreenProps) {
  const form = useForm<FormData>()
  const pwd = form.watch('senha')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setLoading(true)
    setError('')
    try {
      await api.post('/api/auth/signup', data)
      Alert.alert('Conta criada com sucesso', '', [
        { text: 'Ok', onPress: () => navigation.navigate('Login') }
      ])
    } catch (error) {
      Alert.alert(error.message || error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <ImageBackground
          style={styles.container}
          source={require('../../assets/background.png')}
        >
          <Image source={require('../../assets/logo.png')} />
          <Text style={styles.title}>Cadastro</Text>
          <View style={styles.inputContainer}>
            <FormProvider {...form}>
              <FormInput
                name="nome"
                placeholder="Seu nome"
                rules={{
                  required: {
                    value: true,
                    message: '*digite seu nome de Usuário'
                  },
                  maxLength: {
                    value: 20,
                    message: '*excedeu o limite de 20 caracteres'
                  }
                }}
              />
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
              <PickerInput
                label="sexo"
                setFunction={(value: string) => form.setValue('sexo', value)}
              />
              <DateInput
                label="Data de nascimento"
                onDateChange={(value: string) =>
                  form.setValue('data_de_nascimento', value)
                }
              />
              <FormInput
                name="senha"
                placeholder="Senha"
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
              <FormInput
                name="senha_confirmation"
                placeholder="Confirme sua senha"
                secureTextEntry
                rules={{
                  required: {
                    value: true,
                    message: '*confirme sua senha'
                  },
                  validate: value => value === pwd || '*as senhas não conferem'
                }}
              />
            </FormProvider>
            {error !== '' && <Text style={styles.errorTxt}>{error}</Text>}

            <Button
              text="Registrar"
              onPress={form.handleSubmit(onSubmit)}
              loading={loading}
            />

            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={styles.newAccount}
            >
              <Text style={styles.text}>Já tenho uma conta</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  title: {
    marginTop: 20,
    fontSize: 20
  },
  errorTxt: {
    color: 'red'
  }
})
