import React, { useEffect, useState, Button } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomeScreen from './HomeScreen'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Stack = createStackNavigator();

function App() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authUser ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Contraceptives' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Sign in" component={SignIn} options={{ title: 'Sign in' }} />
            <Stack.Screen name="Sign up" component={SignUp} options={{ title: 'Sign up' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;