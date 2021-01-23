import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import colors from './StylesGalery'
function ModalScreen(props) {
    const modalStatus = props.modalStatus
    const yesPress = () => {
        props.yesPress()
    }

    const noPress = () => {
        props.setModalStatus(false)
    }
    return (
        <Modal animationType="slide" transparent={true} visible={modalStatus}>
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                <View style={{ width: "60%", direction: "rtl", height: "40%", backgroundColor: colors.colorWhite248RGB, borderColor: "black", borderWidth: 1, borderRadius: 15, alignSelf: "center", justifyContent: "space-around", alignItems: "center" }}>
                    {/* title */}
                    <Text style={{}}>{props.title}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                        {/* yes */}
                        <TouchableOpacity onPress={yesPress}>
                            <View style={{ width: 50, height: 30, backgroundColor: colors.favoriteColor, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white" }}>{props.yes}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* no */}
                        <TouchableOpacity onPress={noPress}>
                            <View style={{ width: 50, height: 30, backgroundColor: colors.light, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white" }}>{props.no}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    container: {}
});

export default ModalScreen;