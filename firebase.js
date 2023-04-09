import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPr6Ju4sj5qh0s9yrhH_kH6c33yA_NyRU",
  authDomain: "examensarbete-5fe9b.firebaseapp.com",
  projectId: "examensarbete-5fe9b",
  storageBucket: "examensarbete-5fe9b.appspot.com",
  messagingSenderId: "1026112094277",
  appId: "1:1026112094277:web:1cb3feed908f1963e0632c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);