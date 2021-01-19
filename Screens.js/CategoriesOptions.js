import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, } from 'react-native';
import colors from '../components/StylesGalery'
import productsList from '../components/ProductsData.json'
import Autocomplete from 'react-native-autocomplete-input';
import Header from '../components/Header';

function CategoriesOptions({ navigation }) {
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
        const filtered = productsList.filter((product) => product.title == title)
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
        const filted = productsList.filter((product) => product.title.includes(text))
        return filted
    }
    const categoryObj = [
        { name: "מוצרי חלב וביצים", image: "https://www.aguda.co.il/wp-content/uploads/2019/02/%D7%9C%D7%9E%D7%94-%D7%97%D7%A9%D7%95%D7%91-%D7%9C%D7%A6%D7%A8%D7%95%D7%9A-%D7%97%D7%9C%D7%91-%D7%95%D7%9E%D7%95%D7%A6%D7%A8%D7%99%D7%95.jpg", category: "1" },
        { name: "לחמים ומוצרי מאפה", image: "https://munbatim.com/wp-content/uploads/2018/08/bread-comparison.jpg", category: "2" },
        { name: "פירות וירקות", image: "https://www.tzomet-ran.co.il/wp-content/uploads/2020/01/f004ba58f7828abd95efd52ad2cbdae4.jpg", category: "3" },
        { name: "סלטים נקניקים וקפואים", image: "https://medias.atmag.co.il/www/uploads/2019/04/%D7%A7%D7%95%D7%9C%D7%90%D7%96-%D7%91%D7%A9%D7%9E%D7%99%D7%9D-%D7%9C%D7%90%D7%AA%D7%A8-1140x641.jpg", category: "4" },
        { name: "בישול אפייה ושימורים", image: "https://www.yasmin-u-l.com/upload/s1_1431948468.jpg", category: "5" },
        { name: "פסטות קטניות ודגנים", image: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2019/01/20/15479711435287_b.jpg", category: "6" },
        { name: "חטיפים ודגני בוקר", image: "https://lh3.googleusercontent.com/proxy/A7y8scBKNnq3MprYL-pJKEgE0HGFe1eoMMPsse5iPgsVD9FmvLqXEt17jbMXVmx_s9f4I3Le-xEM5f2uCkOK6_20M_Bv0k34nKwDkS42ODc3yFZhLnbJTB0GzDICnvN5HXXLJuqavuvhitW8ameAalabL7A", category: "7" },
        { name: "פיצוחים ופירות יבשים", image: "https://munbatim.com/wp-content/uploads/2018/08/bread-comparison.jpg", category: "8" },
        { name: "אורגני ובריאות", image: "https://www.thepositiv.com/wp-content/uploads/2019/10/%D7%91%D7%92%D7%93%D7%99%D7%9D-e1572526320148.jpg", category: "9" },
        { name: "משקאות ואלכוהול", image: "https://img.mako.co.il/2018/01/11/HALFBAKED_i.jpg", category: "10" },
        { name: "חומרי ניקוי", image: "https://img.mako.co.il/2013/03/06/kkkk_i.jpg", category: "11" },
        { name: "פארם ותינוקות", image: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2019/11/24/15746166128859_b.jpg", category: "12" },
    ]
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
            <View style={styles.mainView}>
                {categoryObj.map((category, index) => {
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
        // textAlign: "right",
        // width: "60%",
        zIndex: 5,
        // height: 40,
        // fontSize: 15,
        color: "white",
        padding: 5,
        // borderColor: "white",
        // borderWidth: 1,
        // borderRadius: 10,
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