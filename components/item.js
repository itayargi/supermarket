import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
    Animated,
} from "react-native";
// import "react-native-gesture-handler";
// import * as RootNavigation from "../RootNavigations.js";
import colors from '../components/StylesGalery'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function item(props) {
    const productName = showTitleWords(props.movie.title)
    const imageUrl = props.movie.image;
    const favoritePageFlag = props.type == 'cart' ? true : false;
    const product = props.movie
    // in case of no poster_path
    const Uc = require("../assets/Icons/Uc.png");
    // poster url
    let imageAdress = { uri: imageUrl };
    const [buyGif, setBuyGif] = useState("none")
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
    const addToCart = (amount) => {
        setBuyGif("flex")
    }
    // animation when order
    const FadeInView = (props) => {
        const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

        useEffect(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,



                }
            ).start(({ finished }) => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start()
                // setBuyGif('none')
            })

        }, [])
        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...props.style,
                    opacity: fadeAnim,
                    display: buyGif
                }}
            >
                {props.children}
            </Animated.View>
        );
    }
    return (
        <TouchableOpacity
            onPress={() => clickPress(props.movie, props.movie.id)}
            style={styles.card}
        >
            <View style={{ flex: 1, }}>
                <View style={{ flexDirection: "row", flex: 0.75, direction: "rtl", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                    {/* product image  */}
                    <View style={{ width: "30%", height: "95%", }}>
                        <Image
                            style={styles.image}
                            source={props.movie.image ? imageAdress : Uc}
                        />
                    </View>
                    {/* product name */}
                    <View style={{ height: "100%", justifyContent: "flex-start", paddingTop: 20, }}>
                        <Text numberOfLines={1} style={styles.headerText}>{productName}</Text>
                        <FadeInView style={{ width: "100%" }}>
                            <MaterialCommunityIcons name="hand-okay" size={36} color="black" />
                        </FadeInView>
                    </View>
                    {/* logo */}
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100 / 2,
                        backgroundColor: "grey",
                        margin: 10,
                        borderWidth: 1,
                        borderColor: "#f8f8ff"
                    }}>
                        <Image style={{ width: "100%", height: "100%", transform: [{ rotate: '-30deg' }], borderRadius: 100 / 2, }} source={require('../assets/background/logo.png')} />

                    </View>


                </View>
                {/* add/remove */}
                <View style={{ flexDirection: "row", flex: 0.25, justifyContent: "space-between", borderTopWidth: 0.8, borderColor: colors.colorCoolGrey, alignItems: "center", paddingHorizontal: 5 }}>
                    {/* edit */}
                    <View>
                        <Feather name="edit" size={24} color="black" />
                    </View>
                    {/* btns */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => addAmount()}>
                            {/* <AntDesign name="pluscircle" size={27} color="blue" /> */}
                            <AntDesign name="pluscircleo" size={27} color={colors.tomato} />
                        </TouchableOpacity>
                        <View style={{ width: 40, alignItems: "center", borderWidth: 1, marginHorizontal: 2 }}>
                            <Text>{productAmount}</Text>
                        </View>
                        <Text style={{ marginRight: 6 }}>יח'</Text>
                        <TouchableOpacity onPress={() => lessAmount()} >
                            <AntDesign name="minuscircleo" size={27} color={colors.tomato} />
                            {/* <AntDesign name="minuscircle" size={27} color="red" /> */}
                        </TouchableOpacity>

                    </View>
                    {/* add btn */}
                    <TouchableOpacity onPress={addToCart} style={{ alignItems: "center", justifyContent: "center", maxHeight: 30, padding: 5, backgroundColor: "tomato" }}>
                        <Text style={{ color: 'white', justifyContent: "center", fontSize: 18 }}>הוספה</Text>
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
        </TouchableOpacity >
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
        fontSize: 17,
        // marginTop: 20
    },
});

export default item;