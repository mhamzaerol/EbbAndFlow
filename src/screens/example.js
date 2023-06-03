import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';


export default function MoodTracker() {
 const handleFeelingSliderChange = (value) => {
   // Handle feeling slider value change
 };


 const handleIntensitySliderChange = (value) => {
   // Handle intensity slider value change
 };


 return (
   <View style={styles.container}>
     <View style={styles.externalButtonsContainer}>
       <TouchableOpacity style={styles.button}>
         <Text>Back</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
         <Text>Delete</Text>
       </TouchableOpacity>
     </View>
     <Text style={styles.title}>How was your day?</Text>
     <View style={styles.moodReportingContainer}>
       <View style={styles.topPart}>
         <View style={styles.square}>
           <Text>😊</Text>
         </View>
         <Slider
           style={styles.verticalSlider}
           minimumValue={0}
           maximumValue={100}
           onValueChange={handleFeelingSliderChange}
           thumbTintColor="white"
           minimumTrackTintColor="red"
           orientation="vertical"
         />
       </View>
       <View style={styles.bottomPart}>
         <Slider
           style={styles.horizontalSlider}
           minimumValue={0}
           maximumValue={100}
           onValueChange={handleIntensitySliderChange}
           thumbTintColor="white"
           minimumTrackTintColor="red"
         />
       </View>
     </View>
     <View style={styles.internalButtonsContainer}>
       <TouchableOpacity style={styles.button}>
         <Text>Write Diary</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
         <Text>Exit</Text>
       </TouchableOpacity>
     </View>
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 externalButtonsContainer: {
   flexDirection: 'row',
   width: '100%',
   marginVertical: 20,
   paddingHorizontal: 20,
   justifyContent: 'space-between',
 },
 button: {
   backgroundColor: '#ccc',
   padding: 10,
   borderRadius: 5,
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   fontFamily: 'satoshi',
   marginBottom: 20,
 },
 moodReportingContainer: {
   alignItems: 'center',
   justifyContent: 'center',
 },
 topPart: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 bottomPart: {},
 square: {
   width: 100,
   height: 100,
   borderWidth: 1,
   borderColor: 'black',
   alignItems: 'center',
   justifyContent: 'center',
 },
 verticalSlider: {
   width: 40,
   height: 200,
   marginLeft: 20,
 },
 horizontalSlider: {
   width: 200,
   height: 40,
   marginTop: 20,
 },
 internalButtonsContainer: {
   flexDirection: 'row',
   justifyContent: 'center',
   marginTop: 20,
 },
});
