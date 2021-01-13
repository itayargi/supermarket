import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Screens.js/Welcome'
import ListOfProducts from '../Screens.js/ListOfProducts';
import item from '../components/item';
import ItemDetails from '../Screens.js/ItemDetails';
import { MyProvider } from '../data/DataStorage'
import Cart from '../Screens.js/Cart';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../Screens.js/LoginScreen';
import RegisterScreen from '../Screens.js/RegisterScreen';
import CategoriesOptions from '../Screens.js/CategoriesOptions';

const Stack = createStackNavigator();

function AppNavigator(props) {
    return (
        <MyProvider>
            <NavigationContainer>
                <Stack.Navigator headerMode="screen" screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                }} initialRouteName="CategoriesOptions">
                    <Stack.Screen name="Home" options={{ headerShown: false, }}>
                        {(props) => <Welcome {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="ListOfProducts" options={{
                        title: "רשימת מוצרים"
                    }}>
                        {(props) => <ListOfProducts {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Item" options={{ headerShown: false }}>
                        {(props) => <item {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="LogginScreen" options={{ title: "התחברות" }}>
                        {(props) => <LoginScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="RegisterScreen" options={{ headerShown: false }}>
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
                        title: "בחר קטגוריה"
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