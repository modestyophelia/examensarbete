import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ContraceptivesScreen from './ContraceptivesScreen'
import CoppercoilScreen from './CoppercoilScreen'
import BirthControlpillsScreen from './BirthControlpillsScreen'
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
            <Stack.Screen name="Contraceptives" options={{
              headerStyle: {
                backgroundColor: "#5CCFBA",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}>{props => <ContraceptivesScreen {...props} />}</Stack.Screen>
            <Stack.Screen name="Copper coil" component={CoppercoilScreen} options={{
              title: 'Copper coil',
              headerStyle: {
                backgroundColor: "#5CCFBA",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }} />
            <Stack.Screen name="Birth Control pills" component={BirthControlpillsScreen} options={{
              title: 'Birth Control pills',
              headerStyle: {
                backgroundColor: "#5CCFBA",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }} />

          </>
        ) : (
          <>
            <Stack.Screen name="Sign in" options={{
              headerStyle: {
                backgroundColor: "#5CCFBA",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}>{props => <SignIn {...props} />}</Stack.Screen>
            <Stack.Screen name="Sign up" options={{
              headerStyle: {
                backgroundColor: "#5CCFBA",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}>
              {(props) => <SignUp {...props} navigation={props.navigation} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;