import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Login from '../pages/login'
import Home from '../pages/home'
import Register from '../pages/register'
import Header from '../components/Header'
import MedicalRecordList from '../pages/medicalRecord/list'
import Medicine from '../pages/medicine'
import MedicalRecordCreate from '../pages/medicalRecord/create'

export default function Navigation({ onLayoutRootView }: any) {
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator()

function RootNavigator() {
  const { isLogged } = useSelector((store: RootState) => store.auth)

  return (
    <Stack.Navigator>
      {isLogged ? (
        <>
          <Stack.Screen
            name="Home"
            options={{
              header: props => <Header {...props} />
            }}
            component={Home}
          />
          <Stack.Screen
            name="MedicalRecordList"
            options={{
              header: props => <Header {...props} />
            }}
            component={MedicalRecordList}
          />
          <Stack.Screen
            name="MedicalRecordCreate"
            options={{
              header: props => <Header {...props} />
            }}
            component={MedicalRecordCreate}
          />
          <Stack.Screen
            name="Medicine"
            options={{
              header: props => <Header {...props} />
            }}
            component={Medicine}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={Register}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
