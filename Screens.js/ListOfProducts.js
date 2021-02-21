import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
} from "react-native";
import Item from "../components/Item";
import { DataStorage } from "../data/DataStorage";
import colors from '../components/StylesGalery'
import { AntDesign } from '@expo/vector-icons';
import Supermaket from "../components/ProductsData.json"
import ProductsContainer from "../components/ProductsContainer";
import Header from "../components/Header";

function ListOfProducts({ navigation, route }) {
    const [favoriteList, setFavoriteList] = useContext(DataStorage);
    const { productList } = route.params
    const type = "allProducts"


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Header navigation={navigation} title="העגלה שלי" />),
        });
    }, [navigation]);


    return (
        <SafeAreaView style={styles.container}>
            {/* <Categories /> */}
            <ProductsContainer products={productList} type={type} navigation={navigation} />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    listOfMovies: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },

});

export default ListOfProducts;