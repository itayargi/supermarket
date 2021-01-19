import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
} from "react-native";
import Item from "../components/item";
// import "react-native-gesture-handler";
// import * as RootNavigation from "../RootNavigations.js";
import { DataStorage } from "../data/DataStorage";
import colors from '../components/StylesGalery'
import { AntDesign } from '@expo/vector-icons';
import Supermaket from "../components/ProductsData.json"
import ProductsContainer from "../components/ProductsContainer";
import Header from "../components/Header";
import Categories from "../components/Categories";

function ListOfProducts({ navigation, route }) {
    // const [products, setProducts] = useContext(DataStorage);
    const [favoriteList, setFavoriteList] = useContext(DataStorage);
    const { productList } = route.params
    // const { type } = route.params;
    const type = "allProducts"
    // const productContainer = checkWitchPage();


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
    header: {
        width: "100%",
        alignItems: "center",
        backgroundColor: '#022C80',
        paddingBottom: 10,
        opacity: 0.7,
        paddingTop: 10,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
    },
});

export default ListOfProducts;