import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView, } from 'react-native';
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
        { name: "סלטים נקניקים וקפואים", image: "https://lh3.googleusercontent.com/proxy/B04zWFm-RwJ4td0tXJqxPJE4HSHIVf-IJ1dQHdgub0Xm7QMdLuTv9DVx8vosDbeD5xGGfWr5a9pWUwmWCxs6qaKgh9JKnQInyI6plTV_60VUQljEWb8QsmmowNdd-Ksrq6ob7Kfqi_j6nPwxhnobMT7HPKwhIVYC8BpTuUES2caP7aj_np91E-pyteKYz8gUySeGxQ", category: "4" },
        { name: "בישול אפייה ושימורים", image: "https://www.yasmin-u-l.com/upload/s1_1431948468.jpg", category: "5" },
        { name: "פסטות קטניות ודגנים", image: "https://d3m9l0v76dty0.cloudfront.net/system/photos/474615/original/2a5c3118c993c503827a02b03f03c91d.jpg", category: "6" },
        { name: "חטיפים ודגני בוקר", image: "https://img.mako.co.il/2017/08/01/shutterstock_397918384_i.jpg", category: "7" },
        { name: "פיצוחים ופירות יבשים", image: "https://d1vdx9ifs4n5d7.cloudfront.net/s3fs-public/legacy_files/imce/shutterstock_116210527_0.jpg", category: "8" },
        { name: "אורגני ובריאות", image: "data:image/jpeg;base64,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", category: "9" },
        { name: "משקאות ואלכוהול", image: "https://storage.hidabroot.org/articles/45081_tumb_750Xauto.jpg", category: "10" },
        { name: "חומרי ניקוי", image: "https://img.mako.co.il/2013/03/06/kkkk_i.jpg", category: "11" },
        { name: "פארם ותינוקות", image: "https://www.clalit.co.il/he/new_article_images/your_health/babies%20and%20kids/GettyImages-923852236/medium.jpg", category: "12" },
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
            <ScrollView>
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