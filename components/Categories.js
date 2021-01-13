import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Categories(props) {
    const listOfCategories = [
        "מוצרי חלב",
        "בשר",
        "גבינות",
        "ירקות"
    ]
    const renderCategories = (categories) => {
        if (categories) {
            categories.map((category, index) => {
                return (
                    <TouchableOpacity key={index} onPress={console.log('category')}>
                        <Text>{category}</Text>
                    </TouchableOpacity>
                )
            })
        }

    }
    return (
        <View style={styles.container}>
            {renderCategories(listOfCategories)}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",

    },
    categoryBox: {
        width: 120,
        height: "100%",
    }
});

export default Categories;