import React from 'react';
import { View, Image, StyleSheet, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Screens.js/Welcome'
import ListOfProducts from '../Screens.js/ListOfProducts';
import Item from '../components/Item';
import ItemDetails from '../Screens.js/ItemDetails';
import { MyProvider } from '../data/DataStorage'
import Cart from '../Screens.js/Cart';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../Screens.js/LoginScreen';
import RegisterScreen from '../Screens.js/RegisterScreen';
import CategoriesOptions from '../Screens.js/CategoriesOptions';
import LoadingPage from '../Screens.js/LoadingPage';
import Manager from '../Screens.js/Manager';
import OrderDetail from '../Screens.js/OrderDetail';
import ManagerWelcome from '../Screens.js/ManagerWelcome'
const Stack = createStackNavigator();

function AppNavigator(props) {
    return (
        <MyProvider>
            <NavigationContainer>
                <Stack.Navigator headerMode="screen" screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                    // cardStyle: { paddingTop: Platform.OS == "ios" ? 15 : 0, direction: "rtl" }
                    cardStyle: { direction: "rtl" }

                }} initialRouteName="LoadingPage">
                    <Stack.Screen name="LoadingPage" options={{ headerShown: false, }}>
                        {(props) => <LoadingPage {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Home" options={{ headerShown: false, title: "עמוד הבית" }}>
                        {(props) => <Welcome {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="ManagerWelcome" options={{ headerShown: false, title: "עמוד הבית" }}>
                        {(props) => <ManagerWelcome {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="OrderDetail" options={{ title: "פרטי הזמנה" }}>
                        {(props) => <OrderDetail {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="ListOfProducts" options={{
                        title: "רשימת מוצרים"
                    }}>
                        {(props) => <ListOfProducts {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Manager" options={{
                        title: "עמוד מנהל"
                    }}>
                        {(props) => <Manager {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Item" options={{ headerShown: false }}>
                        {(props) => <Item {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="LogginScreen" options={{ title: "התחברות", headerLeft: null }}>
                        {(props) => <LoginScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="RegisterScreen" options={{ title: "הרשמה", headerLeft: null }}>
                        {(props) => <RegisterScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="ItemDetails" options={{ headerShown: false }}>
                        {(props) => <ItemDetails {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Cart" options={{

                        headerRight: () => (<View><Image style={{ width: 35, height: 35 }} source={require('../assets/super/icon.png')} /></View>),
                        title: "עגלת קניות"
                    }}>
                        {(props) => <Cart {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="CategoriesOptions" options={{

                        headerRight: () => (<View><Image style={{ width: 35, height: 35 }} source={require('../assets/super/icon.png')} /></View>),
                        title: "בחר/י קטגוריה"
                    }}>
                        {(props) => <CategoriesOptions {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </MyProvider>
    );

}

const styles = StyleSheet.create({
    container: {}
});

export default AppNavigator;