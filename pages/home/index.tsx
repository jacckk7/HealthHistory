import {
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Types'
import Button from '../../components/Button'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Home({ navigation }: HomeScreenProps) {
  return (
    <TouchableWithoutFeedback>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background2.png')}
      >
        <Image style={styles.image} source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Home</Text>
        <View style={styles.buttons}>
          <Button
            text="Listar prontuários"
            onPress={() => navigation.navigate('MedicalRecordList')}
            loading={false}
          />
          <Button
            text="Listar remédios"
            onPress={() => navigation.navigate('Medicine')}
            loading={false}
          />
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
    padding: 50,
  },
  image: {
    marginBottom: 50
  },
  buttons: {
    width: "100%"
  },
  title: {
    marginBottom: 20,
    fontSize: 20
  }
})
