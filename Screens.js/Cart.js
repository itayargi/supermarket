import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Linking,
    StyleSheet,
    ImageBackground,
    Modal,
    Alert,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { DataStorage, serverRequests } from "../data/DataStorage";
import colors from '../components/StylesGalery'
import app from '../api/firebase'
import ModalScreen from '../components/ModalScreen';
import axios from 'axios'
import TableShow from '../components/TableShow';

function Cart({ navigation }) {

    const [modalStatus, setModalStatus] = useState(false)
    const [favoriteList, setFavoriteList] = useContext(DataStorage);
    const [loader, setLoader] = useState(false)
    const deliveryPrice = 15;
    const productContainer = favoriteList ? favoriteList.map((product) => {
        return {
            name: product.title,
            amount: product.amount,
            barcode: product.code
        }
    }) : 0;


    // const whatsappMessage = "רשימת קניות חדשה\n \n" + JSON.stringify(productContainer) + "\n סוף ההזמנה"
    const totalCart = favoriteList.reduce(function (accumulator, currentValue) {
        return Number(accumulator) + (Number(currentValue.salePrice) * currentValue.amount)
    }, 0)
    const tatalAndDelivery = totalCart > 0 ? totalCart + deliveryPrice : 0
    const roundedTotal = tatalAndDelivery.toFixed(2)

    async function updateFirebaseWithOrder() {
        setLoader(true)
        // sendToWhatsapp();
        setModalStatus(false)
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

            // console.log("dataToServer", dataToServer)
            try {
                const dataFromServer = await axiosRequest(requestUrl, "post", dataToServer)
                console.log('dataFromServer', dataFromServer.data);
                const success = dataFromServer.data.success;
                if (success) {
                    setLoader(false)
                    Alert.alert('ההזמנה בוצעה בהצלחה :)')
                    setFavoriteList([])
                }
            } catch (err) {
                console.log('error sending order ', err)
            }
            // writeNewPost(userId, username, adress, floor, appatement, email, productContainer)
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
    const sendBtn = () => {
        if (roundedTotal == 0) {
            Alert.alert('העגלה ריקה, יש להכניס מוצרים כדי לבצע הזמנה')
        }
        else if (roundedTotal < 50) {
            Alert.alert('מינימום להזמנה עומד על 50 שח, יש להכניס עוד מוצרים לעגלה')
        }
        else {
            setModalStatus(true)
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/background/cart_2.jpg')} style={styles.container}>
                {productContainer.length > 0 ? <ScrollView>
                    {/* <View> */}
                        <TableShow orders={favoriteList} navigation={navigation} />
                    {/* </View> */}
                </ScrollView> :
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>אין פריטים בעגלה</Text>
                    </View>}
                <View style={{ display: loader ? "flex" : "none" }}>

                    <ActivityIndicator size="large" color={colors.colorSeafoamBlue} />
                    <Text style={{ color: "white", textAlign: "center" }}>אנא המתן...</Text>
                </View>

                {/* cart total */}
                <View style={styles.totalText}>
                    {/* addons */}
                    <View style={[styles.totalLine, { display: totalCart !== 0 ? "flex" : "none" }]}>
                        {/* <Text style={{ textAlign: "center", fontSize: 16, }}>{"תוספת משלוח: "}</Text> */}
                        <Text style={{ textAlign: "center", fontSize: 15, }}>{"סהכ בעגלה: "}</Text>
                        <Text style={{ fontSize: 12 }}> {totalCart.toFixed(2)}{' ₪'}</Text>
                    </View>
                    <View style={[styles.totalLine, { display: totalCart !== 0 ? "flex" : "none" }]}>
                        <Text style={{ textAlign: "center", fontSize: 15, }}>{"תוספת משלוח: "}</Text>
                        <Text style={{ fontSize: 12 }}> {deliveryPrice}{' ₪'}</Text>
                    </View>
                    {/* total */}
                    <View style={styles.totalLine}>
                        <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "500" }}>{"סהכ הזמנה: "}</Text>
                        <Text style={{ fontWeight: "500", fontSize: 18 }}> {roundedTotal ? roundedTotal : 0}{' ₪'}</Text>
                    </View>

                </View>
                {/* send btn */}
                <TouchableOpacity onPress={() => sendBtn()}>
                    <View style={styles.sendBtn}>
                        <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>שלח הזמנה</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
            {/* modal */}
            <ModalScreen yesPress={() => updateFirebaseWithOrder()} setModalStatus={setModalStatus} modalStatus={modalStatus} title="האם לשלוח את ההזמנה?" yes="כן" no="לא" />

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
        backgroundColor: "#dcdcdc",
        width: "100%",
        paddingHorizontal: 5,
        // borderWidth: 1,
        // borderColor: "white",
    },
    totalLine: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row",

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