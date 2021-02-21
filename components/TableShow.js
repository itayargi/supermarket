import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

function TableShow(props) {
    const [orders, setOrders] = useState(props.orders)
    const navigation = props.navigation;

    const Item = ({ order, navigation }) => {
        const totalPrice = order.amount * order.salePrice;
        const title = order.title.split(' ').slice(0, 2).join(' ')

        const clickPress = (movie, index) => {
            props.navigation.navigate("ItemDetails", {
                movie: movie,
                index: index,
            });
        };
        return (
            <TouchableOpacity onPress={() => clickPress(order, order.id)}>
                <View style={styles.itemLine}>
                    <View style={{}}>
                        <Text style={styles.itemText} >{title}</Text>
                    </View>
                    <View style={{ position: "absolute", left: "50%" }}>
                        <Text style={styles.itemText}>{order.amount}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.itemText}>{totalPrice.toFixed(2)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    };

    const renderItem = ({ item }) => (
        <Item navigation={navigation} order={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.itemLine}>
                <View>
                    <Text style={styles.headerText} >שם פריט</Text>
                </View>
                <View style={{ position: "absolute", left: "48.5%" }}>
                    <Text style={styles.headerText} >כמות</Text>
                </View>
                <View>
                    <Text style={styles.headerText} >עלות</Text>
                </View>
            </View>

            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, direction: "rtl" },
    itemLine: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "grey",
        height: 40,
        alignItems: "center", paddingHorizontal: 10
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

export default TableShow;