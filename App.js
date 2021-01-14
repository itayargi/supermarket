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



  useEffect(() => {
    // handleRegister()
    // handleLogin()
    const user = app.auth().onAuthStateChanged((user) => {
      setUser(user ? user : null);
      if (user)
        console.log(user ? "we have a user" : "empty");
      else
        console.log('no user');
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
