import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from './StylesGalery'
function Header(props) {
    return (
        <View>
            <TouchableOpacity onPress={() => props.navigation.push('Cart')}>
                <View style={styles.btnBox}>
                    <Text style={{ color: "white" }}>
                        {props.title}
                    </Text>
                    <Image style={{ width: 35, height: 35 }} source={require('../assets/super/icon.png')} />
                </View>

            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
    },
    btnBox: {
        flexDirection: "row",
        alignItems: "center"
    }
});

export default Header;