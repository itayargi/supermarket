import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigator/AppNavigator'
import AuthContext from './data/AuthContext'
import app from './api/firebase'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);
  const email = 'itayargi@gmail.com';
  const password = '123456';
  const newEmail = 'itaytest3@gmail.com';
  const name = 'baji'
  const authContext = useContext(AuthContext);

  const handleRegister = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(newEmail, password)
      .then(function (result) {
        console.log("Signed up");
        app
          .database()
          .ref("/users/" + result.user.uid)
          .set(
            {
              gmail: result.user.email,
              created: Date.now(),
              last_logged: Date.now(),
            },
            function (error) {
              if (error) {
                // The write failed...
                console.log(error);
              } else {
                // Data saved successfully!
                console.log("Success post to DB");
              }
            }
          );
      })
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: name,
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleLogin = () => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log("error firebase");
      });
    const { currentUser } = app.auth();
    // console.log("currentUser", currentUser)
    setUser(currentUser);
  };

  useEffect(() => {
    // handleRegister()
    // handleLogin()
    const user = app.auth().onAuthStateChanged((user) => {
      setUser(user ? user : null);
      // console.log("user: ", user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
