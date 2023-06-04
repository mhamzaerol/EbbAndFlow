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

// Calendar
export function AppCalendar() {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();

  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          marginTop: 75,
        }}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      />
      {selected && (
        <View style={{
          alignItems: 'flex-start',
          padding: 20,
          borderWidth: 1,
          borderColor: 'gray',
          backgroundColor: 'white'
        }}>
          <Text style={{ marginBottom: 10 , fontSize: 16}}>Date: {selected}</Text>
          <Text style={{ marginBottom: 10 , fontSize: 16}}>No diary yet.</Text>
          <TouchableOpacity
            style={{ alignSelf: 'center', backgroundColor: 'black', padding: 10, borderRadius: 5 }}
            onPress={() => dispatch(goNextPage('WriteDiary'))}
          >
            <Text style={{ color: 'white', fontSize: 20}}>Write Diary</Text>
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
