import * as React from 'react'
import Login from './pages/login'
import Home from './pages/home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from './pages/register'

const Stack = createNativeStackNavigator()

export default function App() {
  const isLogged = false

  return (
    <NavigationContainer>
      {isLogged ? (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
            <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  )
}
