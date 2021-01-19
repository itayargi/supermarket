import React, { useState, useContext } from "react";
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
import app from "../api/firebase";
import colors from "../components/StylesGalery";
// import Logo from "../components/Logo";
import AuthContext from '../data/AuthContext'
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

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mood, setMood] = useState("Dark");

    const authContext = useContext(AuthContext);

    const handleLogin = () => {
        // manager page
        if (email == 'baji@gmail.com' && password == 'king') {
            navigation.navigate('Manager');
            return;
        }
        setLoading(true);
        app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (result) {
                authContext.setUser(result.user);
                app.database().ref('/users/' + result.user.uid).once('value').then(async (snapshot) => {
                    var username = await (snapshot.val() && snapshot.val().fullName) || 'Anonymous';
                    console.log('userName', username)

                    navigation.push('Home', { username });
                    // ...
                });
                // navigation.push('Home');

            })
            .catch((error) => {
                setErrorMsg(error.message);
                setLoading(false);
                console.log("error sign in with email", error);
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });

    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles(mood).container} behavior="height">
                <View style={[styles(mood).screenStyles, { flex: 1 }]}>
                    {loading && <LoadingShow />}
                    {/* <LoadingScreen visible={loading} /> */}
                    {/* <Logo width={100} height={100} /> */}
                    <View style={styles(mood).errorMessage}>
                        {errorMsg && (
                            <Text style={{ color: colors.danger }}>{errorMsg}</Text>
                        )}
                    </View>

                    <View style={styles(mood).inputMarg}>
                        {/* <Text style={styles(mood).smalltext}>Email Address: </Text> */}
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

                    <View style={styles(mood).inputMarg}>
                        {/* <Text style={styles(mood).smalltext}>Password: </Text> */}
                        <TextInput
                            style={styles(mood).input}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={(pass) => setPassword(pass)}
                            value={password}
                            placeholder="סיסמא"
                            placeholderTextColor={
                                mood === "Dark" ? Dark.Button : Light.Button
                            }
                        ></TextInput>
                    </View>
                    <View style={styles(mood).btnsBox}>
                        <TouchableOpacity style={styles(mood).button} onPress={handleLogin}>
                            <Text style={styles(mood).buttonText}>התחבר</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: "center" }}
                            onPress={() => navigation.navigate("RegisterScreen")}
                        >
                            <Text style={styles(mood).smalltext}>
                                לקוח חדש{" "}
                                <Text style={{ fontWeight: "600" }}>-הרשמה</Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                borderColor: mood === "Dark" ? Dark.Design : Light.Design,
                                borderWidth: 1,
                                borderRadius: 10,
                                width: "80%",
                                padding: 10,
                            }}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={styles(mood).smalltext}>
                                התחבר דרך גוגל
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
            backgroundColor: mood === "Dark" ? Dark.Background : Light.Background,
            justifyContent: "center",
        },
        screenStyles: {
            justifyContent: "space-around",
            paddingHorizontal: 10,
        },
        inputMarg: {
            marginLeft: 20,
            marginRight: 20,
        },
        btnsBox: {
            width: "100%",
            alignItems: "center",
            flex: 0.3,
            justifyContent: "space-between",
            paddingBottom: 15,
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

        buttonText: {
            color: mood === "Dark" ? Dark.Base : Light.Base,
            textTransform: "uppercase",
        },
        errorMessage: {
            alignItems: "center",
            justifyContent: "center",
            height: 20,
            // marginHorizontal: 10
        },
        greeting: {
            textAlign: "center",
        },
        inputTitle: {
            textTransform: "uppercase",
            color: mood === "Dark" ? Dark.Base : Light.Base,
            fontSize: 15,
        },
        input: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: mood === "Dark" ? Dark.Base : Light.Base,
            height: 40,
            fontSize: 15,
            color: mood === "Dark" ? Dark.Base : Light.Base,
            paddingBottom: 5,
            textAlign: "right"
            // placeholder: mood === "Dark" ? Dark.Base : Light.Base,
        },
        smalltext: {
            color: mood === "Dark" ? Dark.Base : Light.Base,
            fontSize: 15,
            fontWeight: "100",
        },
    });

export default LoginScreen;
