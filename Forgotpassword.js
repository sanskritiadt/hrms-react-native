import img from "./logo.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";


import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Pressable,
    Alert,
    ScrollView,
    Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function Forgotpassword({ navigation }) {
    const [temp, setTemp] = useState({
        empEmail: ''
    });


    // function handleData() {
    //     fetch("", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(temp),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Login failed");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log("Login successful:", data);
    //             Alert.alert("Employee Details", "Data Submitted successfully");
    //             setTemp({
    //                 empEmail: ''
    //             });
    //             navigation.navigate("EmpAttendence");
    //         })
    //         .catch((error) => {
    //             console.error("Login error:", error);
    //             Alert.alert("Getting error in Submitting", "error");
    //         });
    // }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <StatusBar style="auto" />
                <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
                    <Image source={img} style={styles.img}></Image>
                </View>

                <Text style={styles.empt}>Enter your registered email</Text>
                <View style={{ marginTop: 5 }}>
                    <View style={styles.inputView}>
                        <TextInput
                            value={temp.empEmail}
                            style={styles.TextInput}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor="#003f5c"
                            onChangeText={(empEmail) => setTemp({ ...temp, empEmail: empEmail })}
                        />
                    </View>


                </View>

                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        Alert.alert("Demo Evaluation", "Query Successful");
                        navigation.navigate("Setpassword");
                    }}>
                        <Pressable>
                            <Text style={{ color: "white", fontWeight: 'bold' }}>Submit</Text>
                        </Pressable>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        borderRadius: 10,
        marginBottom: 0,
        alignItems: "center",
    },
    inputbox: {
        marginVertical: 10,
    },
    TextInput: {
        padding: 14,

        opacity: 1,
        color: "#013e5a",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f2f5f6",
        width: 240,
    }, img: {
        width: 240,
        height: 55,
    },
    box: {
        width: 320,
        height: 310,
        backgroundColor: "#fff",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    submitBtn: {
        width: "75%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "brown",

    },
    icon: {
        padding: 10,
    },
    empt: {
        fontWeight: "500",
        fontFamily: "serif",
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 17,

    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
});
