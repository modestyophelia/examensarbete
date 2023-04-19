import firebase, { db } from './firebase';
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./styles.css"

const HomeScreen = () => {
  const [contraceptives, setContraceptives] = useState([]);

  console.log("firebase:", firebase);
  console.log("db:", db);

  useEffect(() => {
    const getContraceptives = async () => {
      const querySnapshot = await getDocs(collection(db, "contraceptives"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setContraceptives(data);
      console.log(data)
      console.log(querySnapshot)
      console.log('running')
    };

    getContraceptives();
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {contraceptives && contraceptives.map(contraceptive => {
        return (
          <div>
            <h4 className='contraceptiveName'>{contraceptive.contraceptiveName}</h4>
            <img className='contraceptiveImages' src={contraceptive.contraceptiveImage} alt="Image" />
          </div>
        )
      })}
      <button onClick={userSignOut}>Sign Out</button>
    </div>
  );
};

export default HomeScreen;


