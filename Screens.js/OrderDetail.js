import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

function OrderDetail({ route }) {
    const { order } = route.params
    console.log(order)
    // order example
    // const order = {
    //     title: "itay",
    //     _id: "65465sfaa6sd5f4f",
    //     adress: "המלך גורג 34",
    //     appartement: "2",
    //     floor: "1",
    //     isDone: false,
    //     description: [
    //         {
    //             "amount": 4, "barcode": "8693134", "name": "דניאלה  תות",
    //         },
    //         {
    //             "amount": 3, "barcode": "7290004584528", "name": "דנונה ביו 1.7% 200גר'",
    //         }, {
    //             "amount": 2, "barcode": "4127329", "name": "קוטג' 5% תנובה 250גר'",
    //         },
    //     ]
    // }
    const tableHeads = ["שם פריט", "כמות", "ברקוד"]

    const productsToTable = order && order.description.map((product) => {
        return [
            product.name, product.amount, product.barcode
        ]
    });
    const fullAdress = order && order.adress + ", קומה:" + order.floor + ", דירה:" + order.appartement
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.container} >
                {/* padding ScrollView */}
                <ScrollView style={{ paddingHorizontal: 10 }}>

                    {/* name & adress */}
                    <View style={styles.nameAndAdress}>
                        {/* name */}
                        <View style={styles.detailBox} >
                            <Text style={styles.boldText}>שם:</Text>
                            <Text style={styles.boldText}>כתובת:</Text>
                            <Text style={styles.boldText}>טלפון:</Text>
                        </View>
                        {/* adress */}
                        <View style={styles.detailBox} >
                            <Text style={styles.orderText}>{order.title}</Text>
                            <Text style={styles.orderText}>{fullAdress}</Text>
                            <Text style={styles.orderText}>{order.phone}</Text>
                        </View>
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", textDecorationLine: "underline" }}>רשימת הזמנה</Text>
                    {/* table */}
                    <View style={{}}>
                        <Table style={{ width: "100%" }} borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={tableHeads} style={styles.head} textStyle={styles.headText} />
                            <Rows data={productsToTable} textStyle={styles.text} />
                        </Table>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1 },
    nameAndAdress: {
        flexDirection: "row",
        paddingStart: 15

    },
    detailBox: {
        // direction: "rtl"
        alignItems: "flex-start",
        paddingEnd: 10
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16,
        // marginRight: 20,
    },
    orderText: {
        fontSize: 16
    },
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: "center" },
    headText: { fontWeight: "bold", textAlign: "center", height: 30 },
    text: { margin: 6, textAlign: "center" }
});

export default OrderDetail;