import React, { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Sign In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="button" type="submit">Sign In</button>
      </form>
      <TouchableOpacity onPress={() => navigation.navigate("Sign up")}>
        <Text>Not yet a member? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;