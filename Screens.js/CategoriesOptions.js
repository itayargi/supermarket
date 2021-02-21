import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView, } from 'react-native';
import colors from '../components/StylesGalery'
import Autocomplete from 'react-native-autocomplete-input';
import Header from '../components/Header';

function CategoriesOptions({navigation, route}) {
    const{productCategories,productsList}= route.params
    const categoryObj = productCategories
    const [productsCart, setProductsCart] = useState(productsList);
    const [searchInput, setSearchInput] = useState("");

    const query = searchInput
    const data = filteredProducts(searchInput);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Header navigation={navigation} title="העגלה שלי" />),
        });
    }, [navigation]);


    const navigateBySearch = (title) => {
        const filtered =productsList && productsList.filter((product) => product.title == title)
        if (filtered !== undefined) {
            setSearchInput("")
            navigation.push('ItemDetails', { movie: filtered[0] })
        }

    }
    const navigateWithProducts = (category) => {
        const filtered = productsCart.filter((product) => product.category == category)
        navigation.push('ListOfProducts', { productList: filtered })
    }
    function filteredProducts(text) {
        const filted =productsList && productsList.filter((product) => product.title.includes(text))
        return filted
    }
    
    const ViewAccordingDevice = ({ children }) => {
        if (Platform.OS == 'ios') {
            return <View style={{ width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-around", zIndex: 1 }}>{children}</View>
        }
        else return <View style={{ width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-around" }}>{children}</View>
    }

    return (
        <View style={styles.container}>
            {Platform.OS == 'ios' ? <View style={{ width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-around", zIndex: 1 }}>
                {/* auto complete */}
                <View style={styles.autocompleteContainer}>
                    <Autocomplete style={styles.inputStyle}
                        data={data}
                        placeholder="חפש/י מוצר"
                        placeholderTextColor="grey"
                        keyExtractor={(item, i) => item.id}
                        defaultValue={searchInput}
                        onChangeText={text => setSearchInput(text)}
                        renderItem={({ item, i }) => {
                            if (searchInput.length > 2) return <TouchableOpacity style={{ height: 50, justifyContent: "center", borderBottomWidth: 1, }} key={i} onPress={() => navigateBySearch(item.title)}>
                                <Text style={{ fontSize: 18, textAlign: "left" }}>{item.title}</Text>
                            </TouchableOpacity>
                        }
                        }
                    />

                </View>
                {/* end */}
            </View> :
                <View style={{ width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-around" }}>
                    {/* auto complete */}
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete style={styles.inputStyle}
                            data={data}
                            placeholder="חפש/י מוצר"
                            placeholderTextColor="grey"
                            keyExtractor={(item, i) => item.id}
                            defaultValue={searchInput}
                            onChangeText={text => setSearchInput(text)}
                            renderItem={({ item, i }) => {
                                if (searchInput.length > 2) return <TouchableOpacity style={{ height: 50, justifyContent: "center", borderBottomWidth: 1, }} key={i} onPress={() => navigateBySearch(item.title)}>
                                    <Text style={{ fontSize: 18, textAlign: "left" }}>{item.title}</Text>
                                </TouchableOpacity>
                            }
                            }
                        />

                    </View>
                    {/* end */}
                </View>}
            {/* {renderCategories} */}
            <ScrollView>
                <View style={styles.mainView}>
                    {categoryObj && categoryObj.map((category, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigateWithProducts(category.category)} key={index} style={styles.categoryBox}>
                                <ImageBackground source={{ uri: category.image }} style={styles.imageBackground}>
                                    <View style={{ backgroundColor: "grey", paddingVertical: 5 }}>

                                        <Text style={styles.categoryText}>{category.name}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    mainView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "10%",
        justifyContent: "center"

    },
    imageBackground: {
        justifyContent: "center",
        width: "100%",
        height: "100%",


    },
    categoryBox: {
        width: "30%",
        height: 160,
        alignItems: "center",
        borderColor: "white",
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,

    },
    categoryText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    },
    inputStyle: {
        zIndex: 5,
        color: "white",
        padding: 5,
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent: "space-between",
        zIndex: 2,
    },
});

export default CategoriesOptions;