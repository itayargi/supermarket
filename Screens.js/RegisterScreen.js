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
} from "react-native";
import app from "../api/firebase";
import colors from "../components/StylesGalery";
import LoadingShow from "../components/LoadingShow";

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
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [adress, setAdress] = useState("");
    const [floor, setFloor] = useState("");
    const [appartement, setAppartement] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mood, setMood] = useState("Dark");



    const handleRegister = () => {
        if (name == "" || email == "" || phone == "" || adress == "" || floor == "" || appartement == "" || password == "") {
            setErrorMsg('יש למלא את כל השדות כדי להמשיך')
            return;
        }
        setLoading(true);
        app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (result) {
                console.log("Signed up", result);
                app
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set(
                        {
                            // data to send
                            email: result.user.email,
                            fullName: name,
                            phone: phone,
                            adress: adress,
                            floor: floor,
                            appartement: appartement,
                            created: Date.now(),
                            last_logged: Date.now(),
                        },
                        function (error) {
                            if (error) {
                                // The write failed...
                                console.log(error);
                            } else {
                                // Data saved successfully!
                                setLoading(false);
                                console.log("Success post to DB");
                                navigation.push('Home', { username: name });

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
            <KeyboardAvoidingView style={styles(mood).container} behavior="height">
                <View style={{ flex: 1, direction: "rtl", alignContent: "flex-start", alignItems: "flex-start", justifyContent: "space-around" }}>
                    {loading && <LoadingShow />}
                    <View style={styles(mood).errorMessage}>
                        {errorMsg && (
                            <Text style={{ color: colors.danger }}>{errorMsg}</Text>
                        )}
                    </View>

                    <View style={styles(mood).inputSpace}>
                        {/* full name */}
                        <View>
                            <TextInput
                                style={[styles(mood).input, { textAlign: "right" }]}
                                onChangeText={(name) => setName(name)}
                                value={name}
                                placeholder="שם מלא"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        {/* email */}
                        <View>
                            <TextInput
                                style={styles(mood).input}
                                autoCapitalize="none"
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                                keyboardType="email-address"
                                placeholder="כתובת מייל"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        {/* phone */}
                        <View>
                            <TextInput
                                style={styles(mood).input}
                                onChangeText={(phone) => setPhone(phone)}
                                value={phone}
                                keyboardType="phone-pad"
                                placeholder="טלפון ליצירת קשר"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        <View style={{}}>
                            {/* password */}
                            <TextInput
                                style={styles(mood).input}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(pass) => setPassword(pass)}
                                value={password}
                                placeholder="סיסמא - לפחות 6 אותיות/מספרים"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                        </View>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            {/* <Text style={styles(mood).smalltext}>Password: </Text> */}
                            <TextInput
                                style={[styles(mood).input, { width: "65%" }]}
                                autoCapitalize="none"
                                onChangeText={(street) => setAdress(street)}
                                value={adress}
                                placeholder="רחוב ומספר"
                                placeholderTextColor={
                                    mood === "Dark" ? Dark.Button : Light.Button
                                }
                            ></TextInput>
                            <View style={{ width: "30%", marginStart: 13 }}>
                                <TextInput
                                    style={styles(mood).input}
                                    autoCapitalize="none"
                                    onChangeText={(floor) => setFloor(floor)}
                                    keyboardType="numeric"
                                    value={floor}
                                    placeholder="קומה"
                                    placeholderTextColor={
                                        mood === "Dark" ? Dark.Button : Light.Button
                                    }
                                />
                                <TextInput
                                    style={styles(mood).input}
                                    autoCapitalize="none"
                                    onChangeText={(pass) => setAppartement(pass)}
                                    value={appartement}
                                    keyboardType="numeric"
                                    placeholder="דירה"
                                    placeholderTextColor={
                                        mood === "Dark" ? Dark.Button : Light.Button
                                    }
                                />

                            </View>
                        </View>

                    </View>

                    <View style={styles(mood).btnsBox}>
                        <TouchableOpacity
                            style={styles(mood).button}
                            onPress={handleRegister}
                        >
                            <Text style={styles(mood).buttonText}>הרשם</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: "center" }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles(mood).smalltext}>
                                כבר יש לך חשבון?{" "}
                                <Text style={{ fontWeight: "600" }}>התחבר</Text>
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
        },
        button: {
            height: 50,
            padding: 5,
            width: "80%",
            backgroundColor: mood === "Dark" ? Dark.Button : Light.Button,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        btnsBox: {
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
        },
        buttonText: {
            color: mood === "Dark" ? Dark.Base : Light.Base,
            textTransform: "uppercase",
        },
        errorMessage: {
            alignItems: "center",
            justifyContent: "center",
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
            textAlign: "right",
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
        },
    });

export default RegisterScreen;
