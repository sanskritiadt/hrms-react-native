import img from "./logo.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";


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

export default function Setpassword({ navigation }) {

  const [temp, setTemp] = useState({
    newpass: null,
    confirmpass: null
  });
  const [check,setcheck]=useState(true);
  useEffect(() => {
    if (temp.newpass !== null || temp.confirmpass !== null) {
      if (temp.newpass === temp.confirmpass) {
        setcheck(false);
      } else {
        setcheck(true);
      }
    }
  }, [temp.newpass, temp.confirmpass]);


  //   function handleData() {
  //     fetch("https://65c3148bf7e6ea59682bed24.mockapi.io/empData", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(temp),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Login failed");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("Login successful:", data);
  //         Alert.alert("Employee Details", "Data Submitted successfully");
  //         setTemp({
  //           name: "",
  //           empID: "",
  //           workingHours: "",
  //           date: "",
  //         });
  //         navigation.navigate("EmpAttendence");
  //       })
  //       .catch((error) => {
  //         console.error("Login error:", error);
  //         Alert.alert("Getting error in Submitting", "error");
  //       });
  //   }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <StatusBar style="auto" />
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
          <Image source={img} style={styles.img}></Image>
        </View>
        <Text style={styles.empt}>Enter new password</Text>

        <View style={styles.inputbox}>
          <View style={styles.inputView}>
            <TextInput
              value={temp.empID}
              style={styles.TextInput}
              placeholder="New password"
              keyboardType="default"
              secureTextEntry={true}
              placeholderTextColor="#003f5c"
              onChangeText={(passn) => setTemp({ ...temp, newpass: passn })}
            />
          </View>
          {/* <Text style={styles.empt}>Enter new password</Text> */}
          <View style={styles.inputView}>
            <TextInput
              value={temp.empID}
              style={styles.TextInput}
              placeholder="Confirm password"
              keyboardType="default"
              secureTextEntry={true}
              placeholderTextColor="#003f5c"
              onChangeText={(passc) => setTemp({ ...temp, confirmpass: passc })}
            />
          </View>
          {check &&
            
          <Text style={styles.passtext}>passwords do not match</Text>
          }


        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.submitBtn}>
            <Pressable>
              <Text style={{ color: "white" }}>Submit</Text>
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
    marginBottom: 10,
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
    height: 370,
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

    textAlign: 'center',
    marginVertical: 1,
    fontSize: 17,

  },
  passtext: {
    fontFamily: "serif",
    color:'red',
    marginHorizontal:40,
    marginVertical: 1,
    fontSize: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
