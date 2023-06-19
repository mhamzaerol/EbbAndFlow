import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, Component } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Button } from 'react-native';
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { SettingsIcon } from 'src/components/svg/SettingsIcon';
import { useDispatch } from 'react-redux';
import { goNextPage, goPrevPage } from 'src/redux/actions';
import { useSelector } from 'react-redux';
import { setCurDate } from 'src/redux/actions';
import { MoodRecord } from 'src/redux/datatypes';
import { emotions } from 'src/components/MoodSquare';
import { Svg, Path } from "react-native-svg";


// Calendar
export function AppCalendar() {

  const [selected, setSelected] = useState('');
  const [selectedMoodRecord, setselectedMoodRecord] = useState(null);
  const [selectedDiaryRecord, setselectedDiaryRecord] = useState(null);

  const dispatch = useDispatch();
  const diaryRecords = useSelector(state => state.persistentData.diaryRecords);
  const moodRecords = useSelector(state => state.persistentData.moodRecords);

  const markedDates = moodRecords.reduce((acc, record) => {
    const dateString = record.get('date').toISOString().split('T')[0];
    return { ...acc, [dateString]: { marked: true, dotColor: 'orange' } };
  }, {});

  const handleDayPress = (day) => {
    const dayDate = new Date(day.dateString);
    setSelected(day.dateString);
    dispatch(setCurDate(dayDate));
    
    const mood = moodRecords.find(
      mood => mood.check('date', dayDate)
    );
    const diary = diaryRecords.find(
      diary => diary.check('date', dayDate)
    );
    
    setselectedMoodRecord(mood);
    setselectedDiaryRecord(diary);
  };

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
          backgroundColor: 'white',


        }}>
          <View>
            <Text style={{ marginBottom: 10, fontSize: 16 }}>Date: {selected}</Text>
            <View style={{ flexDirection: 'row'}}>
              {selectedMoodRecord &&
                <Svg
                  height={30}
                  width={30}
                  viewBox="0 0 100 100"
                >
                  <Path
                    d={emotions[Math.min(Math.floor(selectedMoodRecord.get('valence') / 20), emotions.length - 1)]}
                    fill="#000"
                  />
                </Svg>
              }
              {selectedDiaryRecord
                ? <Text style={{ marginBottom: 10, fontSize: 16, marginLeft: 4, marginTop: 6}}>{selectedDiaryRecord.get('diaryTitle')}</Text>
                : <Text style={{ marginBottom: 10, fontSize: 16, marginLeft: 4, marginTop: 6}}>No diary yet.</Text>
              }
            </View>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 5 }}
            onPress={() => dispatch(goNextPage('MoodTracker'))}
          >
            <Text style={{ color: 'black', fontSize: 20 }}>
              {selectedMoodRecord ? 'View Mood' : 'Track Mood'}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
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
