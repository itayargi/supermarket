import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from "react-native";
import Item from "./item";
import colors from './StylesGalery'
import { AntDesign } from '@expo/vector-icons';

function ProductsContainer(props) {
    const productContainer = props.products
    const type = props.type
    return (
        <View style={styles.container}>
            {/* list of movies */}
            <ScrollView style={styles.container}>
                <View style={styles.listOfMovies}>
                    {productContainer && productContainer.length > 0 ? (
                        productContainer.map((movie, i) => {
                            return (
                                <Item
                                    key={i}
                                    movie={movie}
                                    navigation={props.navigation}
                                    type={type}

                                />
                            );
                        })
                    ) : (
                            <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                                {/* in case of empty movies in favorite page */}
                                <Text style={{ fontSize: 17, color: 'red' }}>
                                    אין פריטים בקטגוריה זו
              </Text>
                            </View>
                        )}
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "white",
    },
    listOfMovies: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: "100%",
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
    },
});

export default ProductsContainer;