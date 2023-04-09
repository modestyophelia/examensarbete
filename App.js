import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPr6Ju4sj5qh0s9yrhH_kH6c33yA_NyRU",
  authDomain: "examensarbete-5fe9b.firebaseapp.com",
  databaseURL: "https://examensarbete-5fe9b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "examensarbete-5fe9b",
  storageBucket: "examensarbete-5fe9b.appspot.com",
  messagingSenderId: "1026112094277",
  appId: "1:1026112094277:web:1cb3feed908f1963e0632c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Text>Welcome, {user.email}!</Text>
          <Button title="Log out" onPress={() => firebase.auth().signOut()} />
        </>
      ) : (
        <>
          <Text>You are not logged in.</Text>
          <Button title="Log in" onPress={() => navigation.navigate('Login')} />
        </>
      )}
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Home'))
      .catch(error => console.log(error));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Please log in:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, margin: 10, width: '90%' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, margin: 10, width: '90%' }}
      />
      <Button title="Log in" onPress={handleLogin} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log in' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
