

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import img from "./logo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {

  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Button,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid
} from "react-native";

const { width: windowWidth } = Dimensions.get('window');
import { Row } from "react-native-table-component";

export default function Login({ navigation }) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [checkcancel, setCheckCancel] = useState(true);
  const [Visible, setVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleView = () => {
    setIsFocused((value) => !value);
  };
  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Do you really want to proceed further?",
      [
        {
          text: "Cancel",
          onPress: () => setCheckCancel(false),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setCheckCancel(true);
            navigation.navigate("Forgotpassword");
          },
        },
      ]
    );
  };

  const handleLogin = async (values) => {
    try {
      const response = await fetch('https://sit.hrms.alphadot.co.in/apigateway/api/auth/login', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            email: values.email,
            password: values.password,
            // email: 'anantshah.adt@gmail.com',
            // password: 'Anant@123',
            deviceInfo: {
              deviceId: 'D1',
              deviceType: 'DEVICE_TYPE_ANDROID'
            }
          }
        ),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      await AsyncStorage.setItem('response-token', data.jwtAuthenticationResponse.accessToken);
      await AsyncStorage.setItem('refresh-token', data.jwtAuthenticationResponse.refreshToken);
      await AsyncStorage.setItem('EmpID',String( data.employeeId));

      console.log(data.jwtAuthenticationResponse.accessToken);
      ToastAndroid.show('Login-Successfull !', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("EmployeeDetails");
    } catch (error) {
      console.error('There was an error!', error.message);
      ToastAndroid.show('Server Error try again !', ToastAndroid.SHORT, ToastAndroid.TOP);
    }
  };


 



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-100}
      style={styles.container}
    >
      <View style={styles.box}>
        <StatusBar style="auto" />
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
          <Image source={img} style={styles.img}></Image>
        </View>
        <View></View>
        <View style={styles.inputbox}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setLogin({ ...login, email: text })}
              value={login.email}
            />
          </View>

          <View style={styles.inputView}>


            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={Visible}
              onChangeText={(text) => setLogin({ ...login, password: text })}
              value={login.password}
              onFocus={handleView}
              onBlur={handleView}

            />
            {isFocused && (<Pressable style={{ zIndex: 1, opacity: 0.7, height: 40, width: 35, position: 'absolute', justifyContent: 'center', alignItems: 'center', margin: 5, right: 75 }} onPress={() => setVisible(!Visible)}>


              {Visible ? <Icon name="eye-off" size={20} color="brown" /> : <Icon name="eye" size={20} color="brown" />}

            </Pressable>)}



          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgot_button}>Forgot Password ?</Text>

          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin(login)}>
            <Pressable style={styles.loginText}>
              <Text style={{ color: "white", fontWeight: 'bold' }}>Login</Text>
            </Pressable>
          </TouchableOpacity>
        </View>

      </View>
      <View style={[styles.bot]}>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => navigation.navigate("Alphadot Chatbot")}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.buttonText}>
              Hello there !
            </Text>
            <Text style={{}}>
              <Icon name="robot" size={20} color="white" />
            </Text>
          </View>

        </TouchableOpacity>
      </View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "brown",
    alignItems: "center",
    // justifyContent: "center",
  },
  inputView: {
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  inputbox: {
    marginVertical: 10,
  },
  TextInput: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f2f5f6",
    width: 240,

  },
  box: {
    // bottom:-100,

    marginTop: 'auto', // puts the div to the bottom.
    paddingTop: 30,
    width: windowWidth,
    height: 560,
    position: 'fixed',
    backgroundColor: "#fff",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 6,
    fontFamily: 'serif'
  },
  loginBtn: {
    width: "65%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "brown",
  },
  icon: {
    padding: 10,
  },
  empl: {
    fontSize: 29,
    fontWeight: "500",
    fontFamily: "serif",
  },
  empt: {
    fontWeight: "500",
    fontFamily: "serif",
    marginVertical: 10,
  },
  img: {
    width: 255,
    height: 60,
  },
  bot: {
    position: "absolute",
    alignSelf: "flex-end",
    // justifyContent:'center',
    // padding:30,
    bottom: 0,
    // flex:1,
    // height:50,
    padding: 30,

  },
  circularButton: {
    backgroundColor: "#211C6A",
    // alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    height: 40,
    width: 154,


  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    marginRight: 4

  },
});

