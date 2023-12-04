import {
  ImageBackground,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Button from '../../../components/Button'
import { RootStackParamList } from '../../../Types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type MedicalRecordListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MedicalRecordList'
>

export default function MedicalRecordList({navigation}: MedicalRecordListScreenProps) {
  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <ImageBackground
          style={styles.container}
          source={require('../../../assets/background2.png')}
        >
          <Text style={styles.title}>Lista de Prontuários</Text>
          <View style={styles.inputContainer}>
          <Button onPress={() => navigation.navigate('MedicalRecordCreate')} text='Adicionar prontuário'/>
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
  title: {
    marginTop: 20,
    fontSize: 20
  },
})
