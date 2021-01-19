import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { axiosRequest } from '../components/FunctionsUtils'
import { serverRequests } from '../data/DataStorage'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ order, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { order: order })}>
        <View style={styles.itemLine}>
            <View>
                <Text style={styles.itemText} >{order.title}</Text>
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
    const [orders, setOrders] = useState()




    const renderItem = ({ item }) => (
        <Item navigation={navigation} order={item} />
    );
    async function getOrdersFromServer() {
        const server = serverRequests.mainUrl + serverRequests.post
        console.log('axios server get', server)
        const dataFromServer = await axiosRequest(server)
        console.log("dataFromServer", dataFromServer)
        setOrders(dataFromServer.data)
    }


    useEffect(() => {
        getOrdersFromServer()
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require("../assets/background/welcome.jpg")}
            >
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={{ fontSize: 18 }}>הזמנות</Text>
                    <View style={{ width: "100%" }}>
                        <View style={styles.itemLine}>
                            <View>
                                <Text style={styles.headerText} >שם</Text>
                            </View>
                            <View>
                                <Text style={styles.headerText} >כתובת</Text>
                            </View>
                            <View>
                                <Text style={styles.headerText} >סטטוס</Text>
                            </View>
                        </View>

                        <FlatList
                            data={orders}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
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