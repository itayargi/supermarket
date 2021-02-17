import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Animated,
  Platform,
  Alert,
} from "react-native";
// import "react-native-gesture-handler";
// import * as RootNavigation from "../RootNavigations.js";
import colors from "./StylesGalery";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BoxShadow } from "react-native-shadow";
import { DataStorage } from "../data/DataStorage";

const screenWidth = Math.round(Dimensions.get("window").width);

function Item(props) {
  const [favoriteList, setFavoriteList] = useContext(DataStorage);
  const productName = showTitleWords(props.movie.title);
  const imageUrl = props.movie.image;
  const favoritePageFlag = props.type == "cart" ? true : false;
  const product = props.movie;
  const amountP = findAmount();
  // in case of no poster_path
  const Uc = require("../assets/Icons/Uc.png");
  // poster url
  let imageAdress = { uri: imageUrl };
  const productImage = imageUrl ? imageAdress : Uc;
  const [buyGif, setBuyGif] = useState("none");
  const [productAmount, setProductAmount] = useState(amountP);
  const clickPress = (movie, index) => {
    props.navigation.navigate("ItemDetails", {
      movie: movie,
      index: index,
    });
  };
  const shadowOpt = {
    width: (screenWidth * 95) / 100,
    height: 150,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 },
  };
  //   remove product from cart list
  const removeProductFromFavorite = (index) => {
    // setError('')
    setFavoriteList(favoriteList.filter((item) => item.id !== index));
  };
  const ShadowForAndroid = ({ children }) => {
    if (Platform.OS === "android") {
      return <BoxShadow setting={shadowOpt}>{children}</BoxShadow>;
    } else return children;
  };
  function showTitleWords(str) {
    if (str) {
      const splitStr = str.split(" ").slice(0, 2).join(" ");
      return splitStr;
    }
  }
  const addAmount = () => {
    setProductAmount(productAmount + 1);
  };
  const lessAmount = () => {
    if (productAmount > 0) {
      setProductAmount((prev) => prev - 1);
    }
  };
  function addProductToCart(sum) {
    if (productAmount > 0) {
      product["amount"] = sum;
      let duplicateMovies = favoriteList.find(
        (movieObj) => movieObj.id == product.id
      );
      // if the movie is not on the list, save it to favorite list
      if (duplicateMovies == undefined) {
        setFavoriteList([...favoriteList, product]);
      } else {
        let newCart = favoriteList.filter((item) => item.id !== product.id);
        newCart.push(product);
        setFavoriteList(newCart);
      }
      console.log("product:", product);
    } else if (productAmount == 0) {
      removeProductFromFavorite(product.id);
    }
  }
  function findAmount() {
    if (favoriteList.length == 0) return 0;
    let thisPRoduct = favoriteList.filter((item) => item.id == product.id);
    if (thisPRoduct == "") return 0;
    return thisPRoduct[0].amount;
  }
  const addToCart = (amount) => {
    setBuyGif("flex");
    // setProductAmount(0)
    addProductToCart(amount);
    // updateProductAmount(product, productAmount)
    // Alert.alert('הפריט נוסף לעגלה')
  };
  // animation when order
  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
        setBuyGif("none");
      });
    }, []);
    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,
          display: buyGif,
        }}
      >
        {props.children}
      </Animated.View>
    );
  };
  return (
    // <BoxShadow setting={shadowOpt}>
    <ShadowForAndroid>
      <TouchableOpacity
        onPress={() => clickPress(props.movie, props.movie.id)}
        style={styles.card}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 0.75,
              direction: "rtl",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* product image  */}
            <View style={{ width: "30%", height: "95%" }}>
              <Image
                style={styles.image}
                source={productImage}
                resizeMethod="scale"
                // defaultSource={productImage}
                resizeMode="cover"
              />
            </View>
            {/* product name */}
            <View
              style={{
                height: "100%",
                justifyContent: "flex-start",
                paddingTop: 20,
              }}
            >
              <Text numberOfLines={1} style={styles.headerText}>
                {productName}
              </Text>
              <FadeInView style={{ width: "100%" }}>
                <MaterialCommunityIcons
                  name="hand-okay"
                  size={36}
                  color="black"
                />
              </FadeInView>
            </View>
            {/* logo */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 100 / 2,
                backgroundColor: "grey",
                margin: 10,
                borderWidth: 1,
                borderColor: "#f8f8ff",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  transform: [{ rotate: "-30deg" }],
                  borderRadius: 100 / 2,
                }}
                source={require("../assets/background/logo.png")}
              />
            </View>
          </View>
          {/* add/remove */}
          <View
            style={{
              flexDirection: "row",
              flex: 0.25,
              justifyContent: "space-between",
              borderTopWidth: 0.8,
              borderColor: colors.colorCoolGrey,
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            {/* edit */}
            <View>
              <Feather name="edit" size={24} color="black" />
            </View>
            {/* btns */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => addAmount()}
              >
                {/* <AntDesign name="pluscircle" size={27} color="blue" /> */}
                <AntDesign name="pluscircleo" size={27} color={colors.tomato} />
              </TouchableOpacity>
              <View
                style={{
                  width: 40,
                  alignItems: "center",
                  borderWidth: 1,
                  marginHorizontal: 2,
                }}
              >
                <Text>{productAmount}</Text>
              </View>
              <Text style={{ marginRight: 6 }}>יח'</Text>
              <TouchableOpacity onPress={() => lessAmount()}>
                <AntDesign
                  name="minuscircleo"
                  size={27}
                  color={colors.tomato}
                />
                {/* <AntDesign name="minuscircle" size={27} color="red" /> */}
              </TouchableOpacity>
            </View>
            {/* add btn */}
            <TouchableOpacity
              onPress={() => addToCart(productAmount)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                maxHeight: 30,
                padding: 5,
                backgroundColor: "tomato",
              }}
            >
              <Text
                style={{
                  color: "white",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                הוספה
              </Text>
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
    </ShadowForAndroid>
    /* </BoxShadow> */
  );
}

const styles = StyleSheet.create({
  card: {
    width: (screenWidth * 95) / 100,
    marginVertical: 10,
    height: 150,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    shadowColor: "#000",
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },
  image: {
    margin: 5,
    width: "100%",
    height: "100%",
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
    borderWidth: 0.8,
  },
  headerText: {
    fontSize: 17,
  },
});

export default Item;
