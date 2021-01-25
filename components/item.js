import React, { useState } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
// import "react-native-gesture-handler";
// import * as RootNavigation from "../RootNavigations.js";
import colors from '../components/StylesGalery'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function item(props) {
    const productName = showTitleWords(props.movie.title)
    const imageUrl = props.movie.image;
    const favoritePageFlag = props.type == 'cart' ? true : false;
    const product = props.movie
    // in case of no poster_path
    const Uc = require("../assets/Icons/Uc.png");
    // poster url
    let imageAdress = { uri: imageUrl };
    const [productAmount, setProductAmount] = useState(0)
    const clickPress = (movie, index) => {
        props.navigation.navigate("ItemDetails", {
            movie: movie,
            index: index,
        });
    };
    function showTitleWords(str) {
        if (str) {
            const splitStr = str.split(' ').slice(0, 2).join(' ');
            return splitStr;
        }
    }
    const addAmount = () => {
        setProductAmount(productAmount + 1)
    }
    const lessAmount = () => {
        if (productAmount > 0) {
            setProductAmount(prev => prev - 1)
        }
    }
    return (
        <TouchableOpacity
            onPress={() => clickPress(props.movie, props.movie.id)}
            style={styles.card}
        >
            <View style={{ flex: 1, }}>
                {/* image and title */}
                <View style={{ flexDirection: "row", flex: 0.8, justifyContent: "flex-start", direction: "rtl" }}>
                    <View style={{ width: "30%", height: "100%", marginRight: 20 }}>
                        <Image
                            style={styles.image}
                            source={props.movie.image ? imageAdress : Uc}
                        />
                    </View>
                    <View>
                        <Text numberOfLines={1} style={styles.headerText}>{productName}</Text>
                    </View>

                </View>
                {/* add/remove */}
                <View style={{ flexDirection: "row", flex: 0.2, justifyContent: "space-between", borderTopWidth: 0.8, borderColor: colors.light, alignItems: "center" }}>
                    {/* edit */}
                    <View>
                        <Feather name="edit" size={24} color="black" />
                    </View>
                    {/* btns */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => addAmount()}>
                            <AntDesign name="pluscircle" size={27} color="blue" />

                        </TouchableOpacity>
                        <View style={{ width: 40, alignItems: "center", borderWidth: 1, marginHorizontal: 5 }}>
                            <Text>{productAmount}</Text>
                        </View>
                        <TouchableOpacity onPress={() => lessAmount()} >

                            <AntDesign name="minuscircle" size={27} color="red" />
                        </TouchableOpacity>

                    </View>
                    {/* add btn */}
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", maxHeight: 30, padding: 5 }}>
                        <Text style={{ color: colors.favoriteColor, justifyContent: "center", fontSize: 18 }}>Add</Text>
                    </TouchableOpacity>


                </View>


                {/* <View >
                    <Text numberOfLines={1} style={styles.headerText}>{productName}</Text>
                </View>
                <Image
                    style={styles.image}
                    source={props.movie.image ? imageAdress : Uc}
                /> */}
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    card: {
        width: "95%",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 140,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        shadowColor: "#000",
        backgroundColor: "#FFFFFF",
        elevation: 1,
        // direction: "rtl"
    },
    image: {
        resizeMode: "contain",
        margin: 5,
        // flex: 0.6
        width: "100%",
        height: "100%"
    },
    amountBox: {
        borderRadius: 10,
        justifyContent: "center",
        width: 50,
        height: 50,
        backgroundColor: colors.favoriteColor,
        alignSelf: "center",
        top: -15,
        borderColor: "white",
        borderWidth: 0.8
    },
    headerText: {
        textAlign: "center",
        fontSize: 17,
        marginTop: 20
    },
});

export default item;