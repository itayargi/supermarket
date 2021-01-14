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
import app from '../api/firebase'


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

    async function updateFirebaseWithOrder() {
        var userId = app.auth().currentUser.uid;
        return app.database().ref('/users/' + userId).once('value').then((snapshot) => {
            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            var appatement = (snapshot.val() && snapshot.val().appatement) || null;
            var floor = (snapshot.val() && snapshot.val().floor) || null;
            var adress = (snapshot.val() && snapshot.val().adress) || null;
            var email = (snapshot.val() && snapshot.val().email) || null;

            writeNewPost(userId, username, adress, floor, appatement, email, productContainer)
            // ...
            console.log('finish');
            sendToWhatsapp();
        });
    }

    function writeNewPost(uid, username, adress, floor, appartement, email, order) {

        // A post entry.
        var postData = {
            //   author: username,
            //   uid: uid,
            //   body: body,
            //   title: title,
            //   starCount: 0,
            //   authorPic: picture
            email: email,
            fullName: username,
            adress: adress,
            floor: floor,
            appatement: appartement,
            created: Date.now(),
            last_logged: Date.now(),
            order: order
        };

        // Get a key for a new Post.
        var newPostKey = app.database().ref().child('users').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        // updates['/users/' + newPostKey] = postData;
        updates['/users-orders/' + uid + '/' + newPostKey] = postData;

        return app.database().ref().update(updates);
    }


    const sendToWhatsapp = () => {

        Linking.openURL(`whatsapp://send?text=${whatsappMessage}&phone=+972542201060`)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/background/cart.jpg')} style={styles.container}>

                <ProductsContainer products={favoriteList} type={type} navigation={navigation} />
                {/* <SendToExcel products={favoriteList} /> */}
                {/* cart total */}
                <View style={styles.totalText}>
                    <Text style={{ textAlign: "center", fontSize: 32, color: "white" }}>{"סהכ בעגלה: "} {roundedTotal ? roundedTotal : 0}{' ₪'}</Text>

                </View>
                <TouchableOpacity onPress={() => updateFirebaseWithOrder()}>
                    <View style={styles.sendBtn}>
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
    totalText: {
        backgroundColor: "#022C80",
        width: "100%",
        borderWidth: 1,
        borderColor: "white",
    },
    sendBtn: {
        alignSelf: "center",
        width: "100%",
        height: 70,
        backgroundColor: colors.favoriteColor,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.popularColor,
        borderWidth: 5
    },
});

export default Cart;