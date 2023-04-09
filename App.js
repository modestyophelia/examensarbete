import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
//import AuthDetails from './AuthDetails';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign in" component={SignIn} options={{ title: 'Sign in' }} />
        <Stack.Screen name="Sign up" component={SignUp} options={{ title: 'Sign up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;