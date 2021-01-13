import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
// import * as RootNavigation from "../RootNavigations.js";
import "react-native-gesture-handler";
import colors from '../components/StylesGalery'
// import Supermaket from "../components/ProductsData.json"

function Welcome({ navigation }) {
    // const [movieList, setMovieList] = useState([]);

    // useEffect(() => {
    //     // axiosRequest();
    //     setMovieList(Supermaket)
    //     console.log(Supermaket)
    //     return () => {
    //         <Text>...Loading</Text>;
    //     };
    // }, []);
    // navigate to popular page (props of popular)
    const goToPopular = () => {
        navigation.navigate("ListOfProducts");
    };
    // navigate to favorite page (props of favorite)
    const goToFavorite = () => {
        navigation.navigate("Cart");
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundPic}
                source={require("../assets/background/new.jpg")}
            >
                {/* header welcome */}
                <View style={styles.headerView}>
                    <Text style={styles.header}>ברוך הבא יא זין</Text>
                </View>
                <View style={styles.btnsBox}>
                    {/* Popular btn */}
                    <TouchableOpacity
                        style={[
                            colors.categoryBtn,
                            { backgroundColor: colors.popularColor },
                        ]}
                        onPress={goToPopular}
                    >
                        <Text style={styles.btnText}>רשימת מוצרים</Text>
                    </TouchableOpacity>
                    {/* Favority btn */}
                    <TouchableOpacity
                        style={[
                            colors.categoryBtn,
                            { backgroundColor: colors.favoriteColor, },
                        ]}
                        onPress={goToFavorite}
                    >
                        <Text style={styles.btnText}>עגלת קניות</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    headerView: {
        width: "97%",
        backgroundColor: "#022C80",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
        marginBottom: 5,
    },
    btnsBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginBottom: 50,
    },
    backgroundPic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Welcome;