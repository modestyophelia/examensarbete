import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPr6Ju4sj5qh0s9yrhH_kH6c33yA_NyRU",
  authDomain: "examensarbete-5fe9b.firebaseapp.com",
  projectId: "examensarbete-5fe9b",
  storageBucket: "examensarbete-5fe9b.appspot.com",
  messagingSenderId: "1026112094277",
  appId: "1:1026112094277:web:1cb3feed908f1963e0632c"
};

const app = initializeApp(firebaseConfig);

const auth = firebase.auth();