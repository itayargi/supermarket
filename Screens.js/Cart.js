import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Linking,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { DataStorage } from "../data/DataStorage";
import colors from '../components/StylesGalery'
import { AntDesign } from '@expo/vector-icons';
import Item from "../components/item";
import ProductsContainer from '../components/ProductsContainer';
import SendToExcel from '../components/SendToExcel';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Cart({ navigation }) {
    const [favoriteList, setFavoriteList] = useContext(DataStorage);
    const productContainer = favoriteList.map((product) => {
        return {
            name: product.title,
            amount: product.amount,
            barcode: product.code
        }
    });
    const whatsappMessage = "רשימת קניות חדשה\n \n" + JSON.stringify(productContainer) + "\n סוף ההזמנה"
    const type = "cart"
    const totalCart = favoriteList.reduce(function (accumulator, currentValue) {
        return Number(accumulator) + (Number(currentValue.salePrice) * currentValue.amount)
    }, 0)
    const roundedTotal = totalCart.toFixed(2)

    const sendToWhatsapp = () => {
        Linking.openURL(`whatsapp://send?text=${whatsappMessage}&phone=+972542201060`)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/background/cart.jpg')} style={styles.container}>

                <ProductsContainer products={favoriteList} type={type} navigation={navigation} />
                {/* <SendToExcel products={favoriteList} /> */}
                {/* cart total */}
                <View style={{ backgroundColor: "#022C80", width: "100%" }}>
                    <Text style={{ textAlign: "center", fontSize: 32, color: "white" }}>{"סהכ בעגלה: "} {roundedTotal ? roundedTotal : 0}{" שח"}</Text>

                </View>
                <TouchableOpacity onPress={sendToWhatsapp}>
                    <View style={{ alignSelf: "center", width: 120, height: 70, backgroundColor: colors.favoriteColor, alignItems: "center", justifyContent: "center", borderRadius: 10, borderColor: colors.popularColor }}>
                        <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>שלח הזמנה</Text>

                    </View>
                </TouchableOpacity>
            </ImageBackground>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "white",
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

export default Cart;