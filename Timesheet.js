// import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import img from "./logo.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  ToastAndroid,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Timesheet({ navigation }) {


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  
  const empId = AsyncStorage.getItem("EmpID");
  const token = AsyncStorage.getItem("response-token");


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);



  const handleLogout = async () => {
    try {
      const response = await fetch('https://sit.hrms.alphadot.co.in/apigateway/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          deviceInfo: {
            deviceId: 'D1',
            deviceType: 'DEVICE_TYPE_ANDROID',
            notificationToken: null
          }
        })
      });
      AsyncStorage.clear();
      const deletedToken = await AsyncStorage.getItem("response-token");
      console.log("Deleted token:", deletedToken);
      ToastAndroid.show('Log Out Successful !', ToastAndroid.SHORT, ToastAndroid.TOP);

    } catch (error) {
      AsyncStorage.clear();
      console.log("Server Error Cannot Log out", error);
      ToastAndroid.show(' Server ErrorCannot logout !', ToastAndroid.SHORT, ToastAndroid.TOP);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    navigation.navigate("Login");
  };


  const CheckInHandler = async () => {
    const latitude = (location.coords.latitude);
    const longitude = (location.coords.longitude);
    console.log(empId._j, token._j);
    try {
      const response = await fetch(`https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/checkIn/${empId._j}?Latitude=${latitude}&Longitude=${longitude}`, 
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token._j}`,
          },
        },
        {},
      )

      if (!response.ok) {
        console.log("No response from Api");
      } else {
        const responseData = await response.text();
        console.log(responseData);
        ToastAndroid.show(responseData, ToastAndroid.SHORT, ToastAndroid.TOP);

      }

    }
    catch (error) {
      console.log(error);
    }
  }

  const CheckOutHandler = async () => {
    const latitude = (location.coords.latitude);
    const longitude = (location.coords.longitude);
    console.log(empId._j, token._j);
    try {
      const response = await fetch(`https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/checkOut/${empId._j}?Latitude=${latitude}&Longitude=${longitude}`, 
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token._j}`,
          },
        },
        {},
      )

      if (!response.ok) {
        console.log("No response from Api");
      } else {
        const responseData = await response.text();
        console.log(responseData);
        ToastAndroid.show(responseData, ToastAndroid.SHORT, ToastAndroid.TOP);

      }

    }
    catch (error) {
      console.log(error);
    }
  }


  return (


    <View style={styles.container}>
      <View style={styles.header}>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <View>
            <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
          </View>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "80%" }}>
          <Text style={styles.maintext}>Timesheet</Text>
          <View >
            <TouchableOpacity onPress={handleLogout} >

              <View style={styles.logout}>
                <Text style={{ fontSize: 17, color: 'white', fontWeight: 500 }}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: "80%", justifyContent: 'center' }}>
        <View style={styles.box}>
          <StatusBar style="auto" />
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Image source={img} style={styles.img}></Image>
          </View>


          <View style={{ marginVertical: 22 }}>
            <View style={{ alignItems: "center" }}>
              {/* <TouchableOpacity style={styles.submitBtn} onPress={handleData}> */}
              <TouchableOpacity style={styles.subBtn} onPress={CheckInHandler}>
                <Pressable>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>Check In</Text>
                </Pressable>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              {/* <TouchableOpacity style={styles.submitBtn} onPress={handleData}> */}
              <TouchableOpacity style={styles.subBtn} onPress={CheckOutHandler} >
                <Pressable>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>Check Out</Text>
                </Pressable>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              {/* <TouchableOpacity style={styles.submitBtn} onPress={handleData}> */}
              <TouchableOpacity style={styles.subBtn} onPress={()=>ToastAndroid.show('Under Production', ToastAndroid.BOTTOM)}>
                <Pressable>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>Leave Request</Text>
                </Pressable>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: "flex-start",
  },
  logout: {
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: 'brown',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,

  },
  inputView: {
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  inputbox: {
    marginVertical: 10,
  },
  header: {
    // backgroundColor: "green",
    width: "100%",
    height: 65,
    marginVertical: 30,
    // justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    width: 240,
    height: 55,
  },
  box: {
    width: 320,
    height: 'auto',
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
      color: 'black'
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subBtn: {
    width: "75%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "brown",
    marginVertical: 6
  },
  icon: {
    padding: 10,
  },
  circle: {
    backgroundColor: "rgba(128, 128, 128, 0.4)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    borderRadius: 100,
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
  buttonText: {
    color: "white",
    fontSize: 15,

  },
  maintext: {
    fontWeight: "400",
    fontSize: 20
  }
});
