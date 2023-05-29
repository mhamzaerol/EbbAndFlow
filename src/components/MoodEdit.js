import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { MoodSquare } from 'src/components/MoodSquare';
import { SliderWithDescriptor } from 'src/components/SliderWithDescriptor';


export function MoodEdit() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <MoodSquare/>
                    <SliderWithDescriptor
                        text='Feeling'
                        id='MoodTrackerVerticalSlider'
                    />    
                </View>
            </View>
            <SliderWithDescriptor 
                text='Intensity'
                id='MoodTrackerHorizontalSlider'
            />
        </View>
    );
}


const styles = StyleSheet.create({

});
