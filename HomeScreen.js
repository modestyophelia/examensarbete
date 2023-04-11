import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const HomeScreen = () => {

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button onClick={userSignOut}>Sign Out</button>
    </div>
  );
};

export default HomeScreen;