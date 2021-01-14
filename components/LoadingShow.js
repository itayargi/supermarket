import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

function LoadingShow(props) {
    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{ color: "white" }} >טוען... אנא המתן</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        flex: 1,
        right: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    mainView: {
        width: "100%",
        alignItems: "center",

    }
});

export default LoadingShow;