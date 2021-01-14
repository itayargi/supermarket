import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
// import * as RootNavigation from "../RootNavigations.js";
// import "react-native-gesture-handler";
import { DataStorage } from "../data/DataStorage";
import colors from "../components/StylesGalery";
import { AntDesign } from '@expo/vector-icons';

export default function ItemDetails({ route, navigation }) {
    // movie object and index
    const { movie, index, type } = route.params;
    // error message for user
    const [error, setError] = useState('');
    // favorite list
    const [favoriteList, setFavoriteList] = useContext(DataStorage);
    // const [products, setProducts] = useContext(DataStorage);
    const amountFromContext = findAmount()
    // movie poster
    const imageUrl = movie.image;
    const [productAmount, setProductAmount] = useState(amountFromContext !== 0 ? amountFromContext : 0)
    let imageAdress = { uri: imageUrl };
    // find amount
    function findAmount() {
        if (favoriteList.length == 0) return 0
        let thisPRoduct = favoriteList.filter((item) => item.id == index)
        if (thisPRoduct == "") return 0
        return thisPRoduct[0].amount
    }

    const lessAmount = (ind) => {
        if (productAmount == 1) {
            removeMovieFromFavorite(ind)
        }
        if (productAmount > 0) {
            setProductAmount(prevProduct => prevProduct - 1)
        }
        else {
            setError('המוצר ירד מהעגלה')
        }

    }

    //   remove product from cart list
    const removeMovieFromFavorite = (index) => {
        // setError('')
        setFavoriteList(favoriteList.filter((item) => item.id !== index));
    };

    const addToCart = (item) => {
        if (error !== "") {
            setError("")
        }
        setProductAmount(productAmount + 1)
    }
    function goBackBtn(sum) {
        if (productAmount > 0) {
            movie["amount"] = sum
            let duplicateMovies = favoriteList.find(
                (movieObj) => movieObj.id == movie.id
            );
            // if the movie is not on the list, save it to favorite list
            if (duplicateMovies == undefined) {
                setFavoriteList([...favoriteList, movie]);
            }
            else {
                let newCart = favoriteList.filter((item) => item.id !== index)
                newCart.push(movie)
                setFavoriteList(newCart)
            }
        }
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground imageStyle={{ resizeMode: "contain", top: -200 }} style={styles.background} source={imageAdress}>
                <View style={styles.detailsAndBtn}>
                    {/* name */}
                    <View style={styles.detailsSquere}>
                        <View style={styles.detailLine}>
                            <Text style={styles.headers}>שם פריט </Text>
                            <Text style={styles.detailText}>{movie.title} </Text>
                        </View>
                        {/* summary */}
                        <View style={styles.detailLine}>
                            <Text style={styles.headers}>מחיר </Text>
                            <Text style={styles.detailText}>{movie.salePrice + " שח"} </Text>
                        </View>
                        {/* rating */}
                        <View style={styles.detailLine}>
                            <Text style={styles.headers}>כמות</Text>
                            <Text style={styles.detailText}>{productAmount} </Text>
                        </View>
                    </View>
                    {/* error message in case of empty amount on cart */}
                    {
                        error.length > 0 ?
                            <View style={styles.errorView}>
                                <Text style={styles.error}>{error}</Text>
                            </View>
                            : null
                    }

                    {/* buttons - add && remove */}
                    <View style={styles.btnsRow}>
                        <TouchableOpacity
                            onPress={() => {
                                addToCart();
                            }}
                            style={colors.btn}
                        >
                            <Text style={styles.btnText}>הוסף לעגלה</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => lessAmount(index)}
                            style={colors.btn}
                        >
                            <Text style={styles.btnText}>הורד מעגלה</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 5, width: "100%", alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => goBackBtn(productAmount)}
                            style={[colors.btn, { backgroundColor: colors.favoriteColor }]}
                        >
                            <Text style={styles.btnText}>אשר</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        flex: 1,
        backgroundColor: "white"
        // resizeMode: "contain",

    },
    detailsAndBtn: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "10%",
    },
    detailLine: {
        backgroundColor: colors.colorBlack,
        borderWidth: 1,
        borderColor: colors.colorBlack,
        alignItems: "center",
        margin: 5,
        padding: 5,
        opacity: 0.8,
    },
    headers: {
        fontSize: 18,
        color: colors.colorWhite,
        fontWeight: 'bold'
    },
    detailText: {
        textAlign: "center",
        color: colors.colorWhite,
    },
    btnsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginTop: 5
    },
    btnText: {
        color: colors.colorWhite,
        fontWeight: 'bold'
    },
    error: {
        color: colors.colorWhite,
        fontSize: 15,
    },
    errorView: {
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: colors.colordarkCoral,
        alignItems: "center",
        margin: 5,
        padding: 5,
        width: '100%'
    }
});
