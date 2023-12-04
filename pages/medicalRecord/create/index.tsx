import {
  ImageBackground,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native'
import Button from '../../../components/Button'
import { RootStackParamList } from '../../../Types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as DocumentPicker from 'expo-document-picker'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../../../components/FormInput'
import { useState } from 'react'
import { api } from '../../../services/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type MedicalRecordCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MedicalRecordCreate'
>

type FormData = {
  nome_arquivo: string
  descricao: string
  arquivo_pdf: {
    name: string
    uri: string
    type: string
  }
}

export default function MedicalRecordCreate({
  navigation
}: MedicalRecordCreateScreenProps) {
  const form = useForm<FormData>()
  const [selected, setSelected] = useState('')
  const [texto, setTexto] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const token = useSelector((store: RootState) => store.auth).access_token

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf'
      })

      const file = {
        name: result.assets[0].name,
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType
      }

      form.setValue('arquivo_pdf', file)
      setSelected(result.assets[0].name)
    } catch (error) {
      console.error('Erro ao escolher o arquivo', error)
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('nome_arquivo', data.nome_arquivo)
      formData.append('descricao', data.descricao)
      formData.append('arquivo_pdf', {
        name: data.arquivo_pdf.name,
        uri: data.arquivo_pdf.uri,
        type: data.arquivo_pdf.type
      })

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }

      await api.post('/api/documentos/adicionar', formData, { headers })
      Alert.alert('Prontuário criado com sucesso', '', [
        { text: 'Ok', onPress: () => navigation.navigate('MedicalRecordList') }
      ])
    } catch (error) {
      Alert.alert(error.message || error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/background2.png')}
      >
        <Text style={styles.title}>Adicionar Prontuário</Text>
        <View style={styles.inputContainer}>
          <FormProvider {...form}>
            <Button onPress={pickDocument} text="Adicionar arquivo" />
            {selected && <Text style={styles.arquive}>{selected}</Text>}
            <FormInput
              name="nome_arquivo"
              placeholder="Título"
              rules={{
                required: {
                  value: true,
                  message: '*digite o título do prontuário'
                },
                maxLength: {
                  value: 20,
                  message: '*excedeu o limite de 20 caracteres'
                }
              }}
            />
            <TextInput
              style={styles.textinput}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              placeholder="Digite uma descrição aqui..."
              value={texto}
              onChangeText={text => {
                form.setValue('descricao', text)
                setTexto(text)
              }}
            />
          </FormProvider>

          <Button
            text="Criar"
            onPress={form.handleSubmit(onSubmit)}
            loading={loading}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%',
    marginVertical: 32,
    paddingHorizontal: 72
  },
  arquive: {
    marginBottom: 10
  },
  textinput: {
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10
  },
  title: {
    marginTop: 20,
    fontSize: 20
  }
})
