import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { setSliderValue } from 'src/redux/actions';

const defaultProps = {
    minimumValue: 0,
    maximumValue: 100,
    step: 1,
    minimumTrackTintColor: '#FC2865',
    maximumTrackTintColor: '#AAAAAA',
    thumbTintColor: '#000000',
    text: 'SliderWithDescriptor',
    transformAngle: '0deg',
    id: 'MoodTrackerHorizontalSlider',
    width: 250,
    marginRight: 0,
}

export function SliderWithDescriptor(props) {

    // prop management
    let finalProps = {
        ...defaultProps,
        ...props,
    }

    // redux
    const sliderValue = useSelector((store) => store.sliderValueReducer.temporaryData.MoodTrackerViewData[finalProps.id]);
    const dispatch = useDispatch();

    // when initialized, set the slider value to the default value
    useState(() => {
        dispatch(setSliderValue(finalProps.id, finalProps.minimumValue));
    }, []);

    if (finalProps.id === 'MoodTrackerVerticalSlider') {
        finalProps.transformAngle = '270deg'
    }

    // view
    return (
        <View style={{width: finalProps.width, transform: [{ rotate: finalProps.transformAngle }], position: finalProps.id === 'MoodTrackerVerticalSlider' ? 'absolute' : 'relative', bottom: finalProps.id === 'MoodTrackerVerticalSlider' ? '40%' : 0, right: finalProps.id === 'MoodTrackerVerticalSlider' ? '-22.5%' : 0, marginRight: finalProps.marginRight}}>
            <View style={{ flex: 0, flexDirection: 'column'}}>
                <Slider {...finalProps} style={{width: '100%'}} onValueChange={(val) => { dispatch(setSliderValue(finalProps.id, val)) }} value={sliderValue} />
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>{finalProps.text}: {sliderValue}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

});
