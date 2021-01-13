import React from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import "react-native-gesture-handler";
// import * as RootNavigation from "../RootNavigations.js";
import colors from '../components/StylesGalery'
function item(props) {
    const imageUrl = props.movie.image;
    // const imageUrl = `http://image.tmdb.org/t/p/original/${props.movie.poster_path}`;
    const favoritePageFlag = props.type == 'cart' ? true : false;
    // in case of no poster_path
    const Uc = require("../assets/Icons/Uc.png");
    // poster url
    let imageAdress = { uri: imageUrl };
    // mouse press on a movie direct to movie details with the movie and its index
    const clickPress = (movie, index) => {
        props.navigation.navigate("ItemDetails", {
            movie: movie,
            index: index,
            type: props.type,
        });
    };
    return (
        <TouchableOpacity
            onPress={() => clickPress(props.movie, props.movie.id)}
            style={styles.card}
        >
            {props.movie.image ? (
                <View style={{
                    width: "100%",
                    height: "100%",
                    // alignContent: "center"
                }}><View >
                        <Text numberOfLines={1} style={styles.headerText}>{props.movie.title}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={imageAdress}
                    />
                    {favoritePageFlag && <View style={styles.amountBox}>
                        <Text style={{ textAlign: "center", fontSize: 22, }}>{props.movie.amount}</Text>
                    </View>}
                </View>


            ) : <Image
                    style={styles.image}
                    source={Uc}
                />}

        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    card: {
        width: 100,
        marginHorizontal: 10,
        marginVertical: 10,
        height: 150,
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        width: "100%",
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
        fontSize: 18
    },
});

export default item;