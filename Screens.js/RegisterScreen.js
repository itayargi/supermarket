import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
} from "react-native";
import { CustomPicker } from "react-native-custom-picker";
import app from "../api/firebase";

import colors from "../components/StylesGalery";

const Light = {
    Background: "#F2F2F2",
    Button: "#E0E0E0",
    Design: "#FF037C",
    Base: "black",
}

const Dark = {
    Background: "#333333",
    Button: "#4F4F4F",
    Design: "#ce0050",
    Base: "white",
}
function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adress, setAdress] = useState("");
    const [floor, setFloor] = useState("");
    const [appatement, setAppartement] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mood, setMood] = useState("Dark");

    const handleRegister = () => {
        setLoading(true);
        app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (result) {
                console.log("Signed up");
                app
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set(
                        {
                            // data to send
                            gmail: result.user.email,
                            fullName: name,
                            adress: adress,
                            floor: floor,
                            appatement: appatement,
                            created: Date.now(),
                            last_logged: Date.now(),
                        },
                        function (error) {
                            if (error) {
                                // The write failed...
                                console.log(error);
                            } else {
                                // Data saved successfully!
                                console.log("Success post to DB");
                            }
                        }
                    );
            })
            .then((userCredentials) => {
                return userCredentials.user.updateProfile({
                    displayName: name,
                });
            })
            .catch((err) => {
                setErrorMsg(err.message);
                setLoading(false);
            });
    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles(mood).container} behavior="padding">
                <View style={{ flex: 1 }}>
                    {/* <Logo width={100} height={100} /> */}
                    {/* <LoadingScreen visible={loading} /> */}
                    <View style={styles(mood).errorMessage}>
                        {errorMsg && (
                            <Text style={{ color: colors.danger }}>{errorMsg}</Text>
                        )}
                    </View>

                    <View style={styles(mood).inputSpace}>
                        <View>
                            {/* <Text style={styles(mood).smalltext}>: </Text> */}
                            <TextInput
                                style={styles(mood).input}
                                onChangeText={(name) => setName(name)}
                                value={name}
                                placeholder="Full Name"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        <View>
                            {/* <Text style={styles(mood).smalltext}>: </Text> */}
                            <TextInput
                                style={styles(mood).input}
                                autoCapitalize="none"
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                                placeholder="Email Address"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        <View style={{}}>
                            {/* <Text style={styles(mood).smalltext}>Password: </Text> */}
                            <TextInput
                                style={styles(mood).input}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(pass) => setPassword(pass)}
                                value={password}
                                placeholder="Password"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        <View style={{}}>
                            {/* <Text style={styles(mood).smalltext}>Password: </Text> */}
                            <TextInput
                                style={styles(mood).input}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(pass) => setPassword(pass)}
                                value={password}
                                placeholder="Password"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>

                    </View>

                    <View style={styles(mood).btnsBox}>
                        <TouchableOpacity
                            style={styles(mood).button}
                            onPress={handleRegister}
                        >
                            <Text style={styles(mood).buttonText}>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: "center" }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles(mood).smalltext}>
                                Already have an account?{" "}
                                <Text style={{ fontWeight: "600" }}>Sign in</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = (mood) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: mood === "Dark" ? Dark.Background : Light.Background,
            paddingTop: 85,
        },
        button: {
            height: 50,
            padding: 5,
            width: "80%",
            backgroundColor: mood === "Dark" ? Dark.Button : Light.Button,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
        },
        btnsBox: {
            width: "100%",
            alignItems: "center",
            flex: 0.1,
            justifyContent: "space-between",
            marginTop: 30,
            // paddingBottom: 15,
        },
        buttonText: {
            color: mood === "Dark" ? Dark.Base : Light.Base,
            textTransform: "uppercase",
        },
        errorMessage: {
            alignItems: "center",
            justifyContent: "center",
        },
        form: {
            // marginHorizontal: 20
        },
        greeting: {
            textAlign: "center",
        },
        inputTitle: {
            textTransform: "uppercase",
            color: mood === "Dark" ? Dark.Base : Light.Base,
            fontSize: 10,
        },
        input: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: mood === "Dark" ? Dark.Base : Light.Base,
            height: 40,
            fontSize: 15,
            color: mood === "Dark" ? Dark.Base : Light.Base,
            paddingBottom: 5,
        },
        smalltext: {
            color: mood === "Dark" ? Dark.Base : Light.Base,
            fontSize: 15,
            fontWeight: "100",
        },
        inputSpace: {
            width: "100%",
            flex: 0.6,
            justifyContent: "space-between",
            paddingTop: 50,
            marginBottom: 40,
        },
    });

export default RegisterScreen;
