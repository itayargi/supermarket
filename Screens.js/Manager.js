import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';
// import { axiosRequest } from '../components/FunctionsUtils'
// import { serverRequests } from '../data/DataStorage'
import {DataStorage} from '../data/DataStorage'

const Item = ({ order, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('OrderDetail',{order})}>
        <View style={styles.itemLine}>
            <View>
                <Text style={styles.itemText} >{order.title}</Text>
            </View>
            <View>
                <Text style={styles.itemText} >12:00</Text>
            </View>
            <View>
                <Text style={styles.itemText}>{order.adress}</Text>
            </View>
            <View>
                <Text style={styles.itemText}>{order.isDone ? "נשלח" : "לא נשלח"}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

function Manager({ navigation }) {
    // const [orders, setOrders] = useContext(DataStorage)
    const [favoriteList, setFavoriteList] = useContext(DataStorage)

    const renderItem = ({ item }) => (
        <Item navigation={navigation} order={item} />
    );
    // async function getOrdersFromServer() {
    //     const server = serverRequests.mainUrl + serverRequests.post
    //     console.log('axios server get', server)
    //     const dataFromServer = await axiosRequest(server)
    //     // console.log("dataFromServer", dataFromServer)
    //     setOrders(dataFromServer.data)
    // }


    // useEffect(() => {
    //     getOrdersFromServer()
    // }, [])
    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require("../assets/background/welcome.jpg")}
            >
                <View style={{flex:1, alignItems: "center" }}>
                    <Text style={{ fontSize: 18 }}>הזמנות</Text>
                    <View style={{ flex:1 }}>
                        <View style={styles.itemLine}>
                            <View>
                                <Text style={styles.headerText} >שם</Text>
                            </View>
                            <View>
                                <Text style={styles.headerText} >שעת הזמנה</Text>
                            </View>
                            <View>
                                <Text style={styles.headerText} >כתובת</Text>
                            </View>
                            <View>
                                <Text style={styles.headerText} >סטטוס</Text>
                            </View>
                        </View>

                        <FlatList
                            data={favoriteList}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            style={{flex:1}}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, direction: "rtl" },
    itemLine: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderColor: "grey",
        height: 40,
        alignItems: "center"
    },
    itemText: {
        color: "white"
    },
    headerText: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "white"
    }
});

export default Manager;