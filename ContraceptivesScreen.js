import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
//import { styles } from "./styles.css";

const ContraceptivesScreen = ({ navigation }) => {
  const [contraceptives, setContraceptives] = useState([]);

  useEffect(() => {
    const getContraceptives = async () => {
      const querySnapshot = await getDocs(collection(db, "contraceptives"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setContraceptives(data);
    };
    getContraceptives();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign out successful"))
      .catch((error) => console.log(error));
  };

  const handleClick = (contraceptive) => {
    const { contraceptiveName, id } = contraceptive;
    const screenName = contraceptiveName === 'Copper coil' ? 'Copper coil' :
      contraceptiveName === 'Birth Control pills' ? 'Birth Control pills' :
        '';
    if (screenName) {
      navigation.navigate(screenName, { contraceptiveId: id });
    }
  }

  return (
    <View>
      {contraceptives.map(contraceptive => (
        <View key={contraceptive.id}>
          <h4 className='contraceptiveName'>{contraceptive.contraceptiveName}</h4>
          <button className='buttonImage' onClick={() => handleClick(contraceptive)}>
            <img className='contraceptiveImages' src={contraceptive.contraceptiveImage} alt="Contraceptive image" />
          </button>
        </View>
      ))}
      <button className="button" onClick={handleSignOut}>Sign Out</button>
    </View>
  );
};

export default ContraceptivesScreen;
