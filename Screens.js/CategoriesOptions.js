import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import colors from '../components/StylesGalery'
import productsList from '../components/ProductsData.json'
import { AntDesign } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';
function CategoriesOptions({ navigation }) {
    const [productsCart, setProductsCart] = useState(productsList);
    const [searchInput, setSearchInput] = useState("");

    const query = searchInput
    const data = filteredProducts(searchInput);
    // const data = productsCart.filter((product) => product.title.includes(searchInput))
    console.log(data)
    const navigateBySearch = (title) => {

        const filtered = productsList.filter((product) => product.title == title)
        console.log("filtered", filtered)
        if (filtered !== undefined) {
            setSearchInput("")
            navigation.push('ItemDetails', { movie: filtered[0] })
        }

    }

    const searchProduct = (product) => {
        console.log('item', product)
        navigation.push('ItemDetails', { movie: product })

    }
    const navigateWithProducts = (category) => {
        const filtered = productsCart.filter((product) => product.category == category)
        navigation.push('ListOfProducts', { productList: filtered })
    }
    function filteredProducts(text) {
        const filted = productsList.filter((product) => product.title.includes(text))
        // const filted = productsList.filter((product) => product.title.indexOf(text) !== -1).title
        const titleArray = filted.map(product => {
            return product.title
        })
        // const filtered = productList.map
        // console.log("data", titleArray)

        return filted
        // navigation.push('ListOfProducts', { productList: filted })

    }
    const categoryObj = [
        { name: "מוצרי חלב", image: "https://www.aguda.co.il/wp-content/uploads/2019/02/%D7%9C%D7%9E%D7%94-%D7%97%D7%A9%D7%95%D7%91-%D7%9C%D7%A6%D7%A8%D7%95%D7%9A-%D7%97%D7%9C%D7%91-%D7%95%D7%9E%D7%95%D7%A6%D7%A8%D7%99%D7%95.jpg", category: "1" },
        { name: "בשר", image: "data:image/jpeg;base64,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" },
        { name: "חומרי ניקוי", image: "https://img.mako.co.il/2013/03/06/kkkk_i.jpg" },
        { name: "פירות וירקות", image: "https://www.tzomet-ran.co.il/wp-content/uploads/2020/01/f004ba58f7828abd95efd52ad2cbdae4.jpg" },
        { name: "שימורים", image: "https://www.yasmin-u-l.com/upload/s1_1431948468.jpg" },
        { name: "יבשים", image: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2019/01/20/15479711435287_b.jpg" },
        { name: "בשמים", image: "https://medias.atmag.co.il/www/uploads/2019/04/%D7%A7%D7%95%D7%9C%D7%90%D7%96-%D7%91%D7%A9%D7%9E%D7%99%D7%9D-%D7%9C%D7%90%D7%AA%D7%A8-1140x641.jpg" },
        { name: "לחם ותחליפיו", image: "https://munbatim.com/wp-content/uploads/2018/08/bread-comparison.jpg" },
        { name: "בגדים", image: "https://www.thepositiv.com/wp-content/uploads/2019/10/%D7%91%D7%92%D7%93%D7%99%D7%9D-e1572526320148.jpg" },
        { name: "מתוקים", image: "https://lh3.googleusercontent.com/proxy/A7y8scBKNnq3MprYL-pJKEgE0HGFe1eoMMPsse5iPgsVD9FmvLqXEt17jbMXVmx_s9f4I3Le-xEM5f2uCkOK6_20M_Bv0k34nKwDkS42ODc3yFZhLnbJTB0GzDICnvN5HXXLJuqavuvhitW8ameAalabL7A" },
        { name: "גלידות", image: "https://img.mako.co.il/2018/01/11/HALFBAKED_i.jpg" },
        { name: "ממתקים", image: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2019/11/24/15746166128859_b.jpg" },
    ]


    return (
        <View style={styles.container}>
            <View style={{ width: "100%", alignItems: "center", marginTop: 5, justifyContent: "space-around" }}>

                {/* <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", zIndex: 2 }} onPress={() => navigateBySearch(searchInput)}>
                    <AntDesign name="search1" size={24} color="white" />
                    <Text style={{ fontSize: 16, color: "white", }}>חיפוש</Text>
                </TouchableOpacity> */}
                {/* auto complete */}
                <View style={styles.autocompleteContainer}>
                    <Autocomplete containerStyle={{ width: "80%", }} style={styles.inputStyle}
                        data={data}
                        // value={searchInput}
                        placeholder="חפש מוצר"
                        placeholderTextColor="grey"
                        keyExtractor={(item, i) => item.id}
                        defaultValue={searchInput}
                        onChangeText={text => setSearchInput(text)}
                        renderItem={({ item, i }) => {
                            if (searchInput.length > 2) return <TouchableOpacity style={{ height: 50, justifyContent: "center", borderBottomWidth: 1, }} key={i} onPress={() => navigateBySearch(item.title)}>
                                <Text style={{ fontSize: 18 }}>{item.title}</Text>
                            </TouchableOpacity>
                        }
                        }
                    />
                    {/* <TouchableOpacity onPress={() => setSearchInput("")} style={{ width: 50, justifyContent: "center", alignItems: "center", zIndex: 2 }}>
                        <Text style={{ color: "white" }}>נקה</Text>
                    </TouchableOpacity> */}
                </View>
                {/* end */}
            </View>
            {/* {renderCategories(categoryList)} */}
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
        justifyContent: "center"
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
        borderWidth: 1

    },
    categoryText: {
        color: "white",
        fontSize: 22,
        textAlign: "center"
    },
    inputStyle: {
        // width: "60%",
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
        zIndex: 1
    },
});

export default CategoriesOptions;