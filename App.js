import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

function App() {
  const [authUser, setAuthUser] = useState(null); // initialize authUser state to null

  const Stack = createNativeStackNavigator();

  const handleSignIn = (user) => {
    setAuthUser(user); // set authUser state to the signed-in user
  };

  const handleSignOut = () => {
    setAuthUser(null); // set authUser state back to null to sign out
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        {!authUser ? (
          <>
            <Stack.Screen name="Sign In">
              {(props) => <SignIn {...props} onSignIn={handleSignIn} />}
            </Stack.Screen>
            <Stack.Screen name="Sign Up" component={SignUp} />
          </>
        ) : (
          <Stack.Screen name="Home">
            {(props) => <HomePage {...props} onSignOut={handleSignOut} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

