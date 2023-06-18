import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg";
import React, { useState, Component } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Button } from 'react-native';
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { SettingsIcon } from 'src/components/svg/SettingsIcon';
import { useDispatch } from 'react-redux';
import { goNextPage, goPrevPage } from 'src/redux/actions';
import { useSelector } from 'react-redux'; 
import { setCurDate } from 'src/redux/actions';
import { useNavigation } from '@react-navigation/native';

// Calendar
export function AppCalendar() {
  const [selected, setSelected] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(diaryRecords);
  const diaryRecords = useSelector(state => state.persistentData.diaryRecords);
  const markedDates = diaryRecords.reduce((acc, record) => {
    const dateString = record.get('date').toISOString().split('T')[0];
    return { ...acc, [dateString]: { marked: true, dotColor: 'orange' }};
  }, {});
  const handleDayPress = (day) => {
    setSelected(day.dateString);
    dispatch(setCurDate(new Date(day.dateString))); 
    // const date = useSelector(state => state.temporaryData.curDate);
    // console.log(date)
    const record = diaryRecords.find(
      record => record.get('date').toISOString().split('T')[0] === day.dateString
    );
    setSelectedRecord(record);
  };

  // console.log(markedDates)
  // console.log(diaryRecords.length);
  // console.log(diaryRecords);
  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          marginTop: 75,
        }}
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selected]: { ...markedDates[selected], selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      />
      {selected && (
  <View style={{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white'
  }}>
    <View> 
      <Text style={{ marginBottom: 10 , fontSize: 16}}>Date: {selected}</Text>
      {selectedRecord
        ? <Text style={{ marginBottom: 10 , fontSize: 16}}>{selectedRecord.get('diaryTitle')}</Text>
        : <Text style={{ marginBottom: 10 , fontSize: 16}}>No diary yet.</Text>
      }
    </View>
    <TouchableOpacity
      style={{ backgroundColor: 'black', padding: 10, borderRadius: 5 }}
      onPress={() => dispatch(selectedRecord ? goNextPage('WriteDiary') : goNextPage('WriteDiary'))}
    >
      <Text style={{ color: 'white', fontSize: 20}}>
        {selectedRecord ? 'View Diary' : 'Write Diary'}
      </Text>
    </TouchableOpacity>
  </View>
)}

    </View>
  );
}

function MainApp() {

  const dispatch = useDispatch();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'white', }}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => { dispatch(goPrevPage()) }}>
          <GoBackArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => dispatch(goNextPage('Settings'))}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </View>
      <AppCalendar />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
});
export default MainApp;

