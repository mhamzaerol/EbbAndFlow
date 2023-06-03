import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { MoodSquare } from 'src/components/MoodSquare';
import { SliderWithDescriptor } from 'src/components/SliderWithDescriptor';


export function MoodEdit() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <View style={{flex: 0, flexDirection: 'row', width: '100%', justifyContent: 'center', position: 'relative'}}>
                <MoodSquare style={{width:'70%', marginRight: '10%'}}/>
                <SliderWithDescriptor
                    text='Feeling'
                    id='MoodTrackerVerticalSlider'
                    width='70%'
                />    
            </View>
            <SliderWithDescriptor 
                text='Intensity'
                id='MoodTrackerHorizontalSlider'
                width='70%'
                marginRight='10%'
            />
        </View>
    );
}


const styles = StyleSheet.create({

});
