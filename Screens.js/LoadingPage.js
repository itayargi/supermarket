import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from "firebase/app";
import app from '../api/firebase'
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function LoadingPage({ navigation }) {

    const navigateTo = async () => {
        const userData = app.auth().onAuthStateChanged((user) => {
            // User is signed in.
            if (user) {
                console.log('funck yeah');
                navigation.navigate('LogginScreen')
            }
            // No user is signed in.
            else {
                console.log('no fucking fuck');
                navigation.navigate('RegisterScreen')
            }
        })
    }
    useEffect(() => {
        navigateTo()
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground imageStyle={{ resizeMode: "contain" }} style={styles.background} source={require('../assets/background/logo.png')}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{ color: "black" }} >טוען... אנא המתן</Text>
                {/* <LoadingShow /> */}
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "20%"

    }
});

export default LoadingPage;