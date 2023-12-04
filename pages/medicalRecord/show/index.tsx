import {
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import { RootStackParamList } from '../../../Types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import PDF from 'react-native-pdf';

type RecordShowScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RecordShow'
>

type Record = {
  id: number
  nome_arquivo: string
  titulo: string
  arquivo_pdf: string
  descricao: string
}

export default function RecordShow({
  route,
  navigation
}: RecordShowScreenProps) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const token = useSelector((store: RootState) => store.auth).access_token

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    api
      .get(`api/documentos/recuperar/${route.params.id}/`, { headers })
      .then(resp => {
        setPdfUrl(resp.data.pdfUrl)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <ImageBackground
          style={styles.container}
          source={require('../../../assets/background2.png')}
        >
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
  title: {
    marginTop: 20,
    fontSize: 20
  }
})
