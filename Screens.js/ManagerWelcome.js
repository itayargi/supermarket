import React,{useEffect, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  LogBox,
  Platform,
} from "react-native";
import "react-native-gesture-handler";
import colors from "../components/StylesGalery";
import productsList from "../components/ProductsData.json";
import supliersData from "../data/supliersData";
import { serverRequests } from '../data/DataStorage'
import { axiosRequest } from '../components/FunctionsUtils'
import {DataStorage} from '../data/DataStorage'

Platform.OS !== "web" && LogBox.ignoreAllLogs();

function MangerWelcome({ navigation, route }) {
    const [orders, setOrders] = useContext(DataStorage)

  const imageBack =
    "https://heartsell.co.il/wp-content/uploads/2019/09/%D7%9C%D7%94%D7%99%D7%95%D7%AA-%D7%9E%D7%A0%D7%94%D7%9C.jpg";
  const productCategories = supliersData;
  // const productsList =
  const { username } = "קודקוד שושנה";

  // navigate to popular page (props of popular)
  const goToPopular = () => {
    navigation.navigate("Manager");
  };
  // navigate to favorite page (props of favorite)
  const goToFavorite = () => {
    navigation.navigate("CategoriesOptions", {
      productsList,
      productCategories,
    });
  };

  async function getOrdersFromServer() {
    const server = serverRequests.mainUrl + serverRequests.post
    console.log('axios server get', server)
    const dataFromServer = await axiosRequest(server)
    // console.log("dataFromServer", dataFromServer)
    setOrders(dataFromServer.data)
}


useEffect(() => {
    getOrdersFromServer()
}, [])
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundPic}
        source={{ uri: imageBack }}
        resizeMode="contain"
      >
        {/* header welcome */}
        <View style={styles.headerView}>
          <Text style={styles.header}>ברוך הבא {username}</Text>
        </View>
        <View style={styles.btnsBox}>
          {/* Popular btn */}
          <TouchableOpacity
            style={[
              colors.categoryBtn,
              { backgroundColor: colors.popularColor },
            ]}
            onPress={goToPopular}
          >
            <Text style={styles.btnText}>רשימת הזמנות</Text>
          </TouchableOpacity>
          {/* Favority btn */}
          <TouchableOpacity
            style={[
              colors.categoryBtn,
              { backgroundColor: colors.favoriteColor },
            ]}
            onPress={goToFavorite}
          >
            <Text style={styles.btnText}>ספקים</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  headerView: {
    width: "97%",
    backgroundColor: "#022C80",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    marginBottom: 5,
  },
  btnsBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  backgroundPic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor:"white"
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MangerWelcome;
