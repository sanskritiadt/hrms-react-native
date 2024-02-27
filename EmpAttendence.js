


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Table, Row} from 'react-native-table-component';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LogBox, ignoreLogs } from 'react-native';
LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
export default function EmpAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch("https://65c3148bf7e6ea59682bed24.mockapi.io/empData");
      const data = await response.json();
      setAttendance(data);
      setFilteredAttendance(data); // Initially set both to full data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff', }}>
        <Row 
        data={[
          <Text style={{ color: 'white', textAlign:'center',fontWeight: 'bold' }}>employee Id</Text>,
          <Text style={{ color: 'white', textAlign:'center',fontWeight: 'bold'}}>Start date</Text>,
          <Text style={{ color: 'white', textAlign:'center',fontWeight: 'bold' }}>End date</Text>,
          <Text style={{ color: 'white', textAlign:'center',fontWeight: 'bold' }}>Working Hours</Text>,
        ]}
        style={styles.head} textStyle={styles.text} />
        {filteredAttendance.map((item, index) => (
          <Row
            key={index}
            data={[item.empID,  item.Startdate, item.Enddate,item.workingHours]}
            style={[styles.row, index % 2 && { backgroundColor: '#f2f2f2' }]}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 15, backgroundColor: '#fff' },
  head: { height: 60, backgroundColor: 'darkblue'},
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  datePickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});


