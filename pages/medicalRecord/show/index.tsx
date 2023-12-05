import * as React from 'react'
import {
  Text,
  StyleSheet,
  View
} from 'react-native'
import { RootStackParamList } from '../../../Types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import PDF from 'react-native-pdf'

type RecordShowScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RecordShow'
>

export default function RecordShow({
  route,
  navigation
}: RecordShowScreenProps) {
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [hexString, setHexString] = useState<string>('');
  const token = useSelector((store: RootState) => store.auth).access_token

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    api
      .get(`api/documentos/recuperar/${route.params.id}/`, {
        headers
      })
      .then(resp => {
        const hexString = resp.request["_response"]
        
        setPdfData(hexToBytes(hexString))
        console.log(pdfData)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const hexToBytes = (hex: string): Uint8Array | null => {

    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  };

  return (
        <View>
          {/* {
            pdfData ? (
              <PDF source={{ uri: 'data:application/pdf;base64,' + pdfData.toString() }} />
            ) : (
              <Text>Carregando PDF ...</Text>
            )
          } */}
        </View>
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
