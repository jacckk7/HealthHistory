import {
  ImageBackground,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList
} from 'react-native'
import Button from '../../../components/Button'
import { RootStackParamList } from '../../../Types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type MedicalRecordListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MedicalRecordList'
>

type Record = {
  id: number
  nome_arquivo: string
  titulo: string
  arquivo_pdf: string
  descricao: string
}

export default function MedicalRecordList({
  navigation
}: MedicalRecordListScreenProps) {
  const [record, setRecord] = useState<Record[]>()
  const [refreshing, setRefreshing] = useState(true)
  const token = useSelector((store: RootState) => store.auth).access_token

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    api
      .get('/api/documentos/listar', { headers })
      .then(resp => setRecord(resp.data))
      .finally(() => setRefreshing(false))
  }, [])

  const renderItem = ({ item }: { item: Record }) => (
    <Pressable
      onPress={() => navigation.navigate('RecordShow', { id: item.id })}
    >
      <View style={styles.card} key={item.id}>
        <Text style={styles.text}>{item.titulo}</Text>
        <Text style={styles.text2}>{item.descricao}</Text>
      </View>
    </Pressable>
  )

  return (
    <TouchableWithoutFeedback>
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/background2.png')}
      >
        <Text style={styles.title}>Lista de Prontuários</Text>
        <View style={styles.inputContainer}>
          <Button
            onPress={() => navigation.navigate('MedicalRecordCreate')}
            text="Adicionar prontuário"
          />

          <FlatList
            data={record}
            renderItem={renderItem}
            keyExtractor={(record: Record) => record.id.toString()}
            onRefresh={() => {
              setRefreshing(true)
              const headers = {
                Authorization: `Bearer ${token}`
              }
              api
                .get('/api/documentos/listar', { headers })
                .then(resp => setRecord(resp.data))
                .finally(() => setRefreshing(false))
            }}
            refreshing={refreshing}
          ></FlatList>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '100%',
    marginVertical: 32,
    paddingHorizontal: 72
  },
  card: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#033D54',
    padding: 20,
    borderRadius: 20
  },
  title: {
    marginTop: 20,
    fontSize: 20
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  text2: {
    fontSize: 14,
    color: 'white'
  }
})
