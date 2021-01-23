import React from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
    Platform
} from "react-native";
import "react-native-gesture-handler";
// import * as RootNavigation from "../RootNavigations.js";
import colors from '../components/StylesGalery'
function item(props) {
    const productName = showTitleWords(props.movie.title)
    const imageUrl = props.movie.image;
    const favoritePageFlag = props.type == 'cart' ? true : false;
    // in case of no poster_path
    const Uc = require("../assets/Icons/Uc.png");
    // poster url
    let imageAdress = { uri: imageUrl };

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
    return (
        <TouchableOpacity
            onPress={() => clickPress(props.movie, props.movie.id)}
            style={styles.card}
        >
            {props.movie.image ? (
                <View style={{
                    width: "100%",
                    height: "100%",
                }}><View >
                        <Text numberOfLines={1} style={styles.headerText}>{productName}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={imageAdress}
                    />
                    {favoritePageFlag && <View style={styles.amountBox}>
                        <Text style={{ textAlign: "center", fontSize: 22, }}>{props.movie.amount}</Text>
                    </View>}
                </View>


            ) :
                <View>
                    <Text numberOfLines={1} style={styles.headerText}>{productName}</Text>
                    <Image
                        style={styles.image}
                        source={Uc}
                    />
                </View>
            }

        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    card: {
        width: "25%",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 130,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 7,
        shadowColor: "#000",
        backgroundColor: "#FFFFFF",
        elevation: 1
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        width: "100%",
        borderRadius: 20,
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
        fontSize: 17
    },
});

export default item;