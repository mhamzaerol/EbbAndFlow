import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import MoodSquare from 'src/components/MoodSquare';
import SliderWithDescriptor from 'src/components/SliderWithDescriptor';


export default function MoodEdit(props) {
    return (
        <View {...props}>
            <View style={{flexDirection: 'row'}}>
                <MoodSquare/>
                <SliderWithDescriptor
                    text='Feeling'
                    id='MoodTrackerVerticalSlider'
                />
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
