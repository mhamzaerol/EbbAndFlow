import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import Svg, { Path } from "react-native-svg";
import React, {useState, Component} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Button } from 'react-native';

// BackIcon
export function BackIcon(props) {
  return (
    <SafeAreaView>
      <Svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onPress={() => console.log("Back Clicked")}
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.707 5.293a1 1 0 010 1.414L11.414 16l9.293 9.293a1 1 0 01-1.414 1.414l-10-10a1 1 0 010-1.414l10-10a1 1 0 011.414 0z"
          fill="#002"
        />
      </Svg>
    </SafeAreaView>
  )
}

// Setting
export function Setting(props) {
  return (
    <SafeAreaView>
      <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onPress={() => console.log("Setting Clicked")}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.718 2.66a1 1 0 01.822.095l2.923 1.754c.358-.016.717-.016 1.075 0l2.911-1.742a1 1 0 01.815-.096 13.825 13.825 0 015.147 2.965 1 1 0 01.326.756L25.68 9.79c.198.303.379.616.543.939l2.963 1.647a1 1 0 01.49.656c.436 1.953.44 3.977.014 5.931a1 1 0 01-.493.662l-2.975 1.647c-.164.322-.345.636-.542.938l.057 3.398a1 1 0 01-.326.756 14 14 0 01-5.129 2.975 1 1 0 01-.822-.094l-2.923-1.754c-.358.016-.717.016-1.075 0l-2.911 1.742a1 1 0 01-.815.095 13.825 13.825 0 01-5.147-2.964 1 1 0 01-.326-.756l.057-3.39a11.029 11.029 0 01-.542-.946l-2.964-1.648a1 1 0 01-.49-.656 13.75 13.75 0 01-.013-5.931 1 1 0 01.492-.662l2.975-1.647a10.2 10.2 0 01.542-.938l-.057-3.398a1 1 0 01.326-.756 14 14 0 015.129-2.975zM8.27 6.82l.055 3.25a1 1 0 01-.18.59 8.2 8.2 0 00-.702 1.214 1 1 0 01-.421.45L4.178 13.9a11.75 11.75 0 00.01 4.2l2.835 1.576a1 1 0 01.419.447c.203.43.44.845.709 1.238a1 1 0 01.174.58L8.27 25.18a11.826 11.826 0 003.65 2.101l2.779-1.663a1 1 0 01.585-.14c.477.035.955.035 1.432 0a1 1 0 01.586.14l2.789 1.674a12.002 12.002 0 003.639-2.112l-.055-3.25a1 1 0 01.18-.59c.268-.383.503-.79.702-1.213a1 1 0 01.421-.45l2.844-1.576a11.749 11.749 0 00-.01-4.2l-2.835-1.576a1 1 0 01-.42-.45 8.206 8.206 0 00-.702-1.214 1 1 0 01-.18-.59l.055-3.249a11.826 11.826 0 00-3.65-2.101l-2.779 1.663a1 1 0 01-.585.14 10.037 10.037 0 00-1.432 0 1 1 0 01-.586-.14l-2.789-1.674A12 12 0 008.27 6.821zM16 11a5 5 0 100 10 5 5 0 000-10zm-7 5a7 7 0 1114 0 7 7 0 01-14 0z"
        fill="#002"
      />
    </Svg>
    </SafeAreaView> 
  )
}

// Calendar
export function AppCalendar() {
  const [selected, setSelected] = useState('');

  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          marginTop: 100
        }}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
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
          <Text style={{ marginBottom: 10 }}>Date: {selected}</Text>
          <Text style={{ marginBottom: 10 }}>No diary yet.</Text>
          <TouchableOpacity
            style={{ alignSelf: 'center', backgroundColor: 'black', padding: 10, borderRadius: 5 }}
            onPress={() => console.log('Button Pressed')}
          >
            <Text style={{ color: 'white' }}>Write Diary</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function MainApp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.iconsContainer}>
        <BackIcon />
        <Setting />
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
