import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { DataStorage } from "../data/DataStorage";
import { serverRequests } from "../data/DataStorage";
import { updateOrder } from "../components/FunctionsUtils";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function OrderDetail({ route, navigation }) {
  const { order } = route.params;
  const [orders, setOrders] = useContext(DataStorage);

  console.log("orderID", order._id);

  const tableHeads = ["שם פריט", "כמות", "ברקוד"];

  const productsToTable =
    order &&
    order.description.map((product) => {
      return [product.name, product.amount, product.barcode];
    });
  const fullAdress =
    order &&
    order.adress + ", קומה:" + order.floor + ", דירה:" + order.appartement;

  const updateOrderRequest = (orderId) => {
    let url = serverRequests.mainUrl + serverRequests.post + `/${orderId}`;
    console.log(("update order", url));
    let res = updateOrder(url,{isDone:true});
    res.then(() => console.log("response", res));
  };

  function changeStatusToOrder(id) {
    for (var i in orders) {
      if (orders[i]._id == id) {
        orders[i].isDone = !orders[i].isDone;
        console.log("done");
        break; //Stop this loop, we found it!
      }
    }
    updateOrderRequest(order._id);
    Alert.alert("סטטוס הזמנה שונה");
    navigation.push("Manager");
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container}>
        {/* padding ScrollView */}
        <ScrollView
          contentContainerStyle={{
            height: deviceHeight,
            justifyContent: "space-between",
            padding: 10,
          }}
          style={{ flex: 1 }}
        >
          <View>
            {/* name & adress */}
            <View style={styles.nameAndAdress}>
              {/* name */}
              <View style={styles.detailBox}>
                <Text style={styles.boldText}>שם:</Text>
                <Text style={styles.boldText}>כתובת:</Text>
                <Text style={styles.boldText}>טלפון:</Text>
              </View>
              {/* adress */}
              <View style={styles.detailBox}>
                <Text style={styles.orderText}>{order.title}</Text>
                <Text style={styles.orderText}>{fullAdress}</Text>
                <Text style={styles.orderText}>{order.phone}</Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              רשימת הזמנה
            </Text>
            {/* table */}
            <View>
              <Table
                style={{ width: "100%" }}
                borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
              >
                <Row
                  data={tableHeads}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                <Rows data={productsToTable} textStyle={styles.text} />
              </Table>
            </View>
          </View>

          {/* btn */}
          <View style={styles.sendBtn}>
            <Button
              onPress={() => changeStatusToOrder(order._id)}
              title="שלח הזמנה"
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  nameAndAdress: {
    flexDirection: "row",
    paddingStart: 15,
  },
  detailBox: {
    // direction: "rtl"
    alignItems: "flex-start",
    paddingEnd: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    // marginRight: 20,
  },
  orderText: {
    fontSize: 16,
  },
  head: { height: 40, backgroundColor: "#f1f8ff", alignItems: "center" },
  headText: { fontWeight: "bold", textAlign: "center", height: 30 },
  text: { margin: 6, textAlign: "center" },
  sendBtn: { marginBottom: 50 },
  // sendBtn:{position:"absolute",width:deviceWidth , height:deviceHeight * 85/100, justifyContent:"flex-end" },
});

export default OrderDetail;
