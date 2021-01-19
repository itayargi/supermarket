import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Linking,
    StyleSheet,
    ImageBackground,
    Modal
} from 'react-native';
import { DataStorage, serverRequests } from "../data/DataStorage";
import colors from '../components/StylesGalery'
import { AntDesign } from '@expo/vector-icons';
import Item from "../components/item";
import ProductsContainer from '../components/ProductsContainer';
import SendToExcel from '../components/SendToExcel';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import app from '../api/firebase'
import ModalScreen from '../components/ModalScreen';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios'
import TableShow from '../components/TableShow';

function Cart({ navigation }) {

    const [modalStatus, setModalStatus] = useState(false)
    const [favoriteList, setFavoriteList] = useContext(DataStorage);

    const productContainer = favoriteList.map((product) => {
        return {
            name: product.title,
            amount: product.amount,
            barcode: product.code
        }
    });
    // console.log("array", productContainer)
    const productsToTable = favoriteList.map((product) => {
        return [
            product.title.split(' ').slice(0, 2).join(' '), product.amount, '₪ ' + (product.amount * product.salePrice).toFixed(2)
        ]
    });

    const tableHeads = ["שם פריט", "כמות", "מחיר"]
    // console.log("productsToTable", productsToTable)
    const tableToWhatsapp = <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHeads} style={styles.head} textStyle={styles.headText} />
        <Rows data={productsToTable} textStyle={styles.text} />
    </Table>
    const whatsappMessage = "רשימת קניות חדשה\n \n" + JSON.stringify(productContainer) + "\n סוף ההזמנה"
    const type = "cart"
    const totalCart = favoriteList.reduce(function (accumulator, currentValue) {
        return Number(accumulator) + (Number(currentValue.salePrice) * currentValue.amount)
    }, 0)
    const roundedTotal = totalCart.toFixed(2)

    async function updateFirebaseWithOrder() {
        // sendToWhatsapp();
        // setModalStatus(true)
        var userId = app.auth().currentUser.uid;
        return app.database().ref('/users/' + userId).once('value').then(async (snapshot) => {
            var username = (snapshot.val() && snapshot.val().fullName) || 'אורח';
            var appartement = (snapshot.val() && snapshot.val().appartement) || null;
            var floor = (snapshot.val() && snapshot.val().floor) || null;
            var adress = (snapshot.val() && snapshot.val().adress) || null;
            var email = (snapshot.val() && snapshot.val().email) || null;
            var phone = (snapshot.val() && snapshot.val().phone) || null;

            const requestUrl = serverRequests.mainUrl + serverRequests.post
            // const requestUrl = "http://10.0.0.8:3000/posts"
            // const requestUrl = "/posts"

            const dataToServer = {
                title: username,
                adress: adress,
                floor: floor,
                appartement: appartement,
                description: productContainer,
                email: email,
                phone: phone
            }

            console.log("dataToServer", dataToServer)

            const dataFromServer = await axiosRequest(requestUrl, "post", dataToServer)

            // writeNewPost(userId, username, adress, floor, appatement, email, productContainer)
            console.log('finish');
        });

    }

    async function axiosRequest(url = "", method = "", data = {}) {
        try {
            let res = await axios({
                url: url,
                method: method,
                data: data,

                headers: {
                    "content-type": "application/json",

                    "Access-Control-Allow-Origin": "*",
                },
            });
            let dataFromServer = res;
            if (dataFromServer) {
                return dataFromServer;
            } else {
                return null;
            }
        } catch (e) {
            console.log(`😱 Axios failed cart 117: ${e}`);
            return "";
        }
    }
    function writeNewPost(uid, username, adress, floor, appartement, email, order) {

        // A order entry.
        var postData = {
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

        Linking.openURL(`whatsapp://send?text=${whatsappMessage}&phone=+972543112161`)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/background/cart_2.jpg')} style={styles.container}>
                {productContainer.length > 0 ? <ScrollView>
                    <View>
                        {/* <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={tableHeads} style={styles.head} textStyle={styles.headText} />
                            <Rows data={productsToTable} textStyle={styles.text} />
                        </Table> */}
                        <TableShow orders={favoriteList} navigation={navigation} />
                    </View>
                </ScrollView> :
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>אין פריטים בעגלה</Text>
                    </View>}
                {/* cart total */}
                <View style={styles.totalText}>
                    <Text style={{ textAlign: "center", fontSize: 32, color: "white" }}>{"סהכ בעגלה: "} {roundedTotal ? roundedTotal : 0}{' ₪'}</Text>
                </View>
                {/* send btn */}
                <TouchableOpacity onPress={() => updateFirebaseWithOrder()}>
                    <View style={styles.sendBtn}>
                        <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>שלח הזמנה</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
            {/* modal */}
            <ModalScreen sendToWhatsapp={sendToWhatsapp} status={modalStatus} title="האם לשלוח את ההזמנה?" yes="כן" no="לא" />

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        direction: "rtl"
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
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: "center" },
    headText: { fontWeight: "bold", textAlign: "center" },
    text: { margin: 6, textAlign: "center" }
});

export default Cart;