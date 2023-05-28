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
}

export function SliderWithDescriptor(props) {

    // prop management
    let finalProps = {
        ...defaultProps,
        ...props,
    }

    // redux
    const sliderValue = useSelector((state) => state.sliderValueReducer.temporaryData.MoodTrackerViewData[finalProps.id]);
    const dispatch = useDispatch();

    // when initialized, set the slider value to the default value
    useState(() => {
        dispatch(setSliderValue(finalProps.id, finalProps.minimumValue));
    }, []);

    if (finalProps.id === 'MoodTrackerVerticalSlider') {
        finalProps.transformAngle = '-90deg'
    }

    // view
    return (
        <View style={{ flex: 0, flexDirection: 'column', width: 250, transform: [{ rotate: finalProps.transformAngle }] }}>
            <Slider {...finalProps} style={{}} onValueChange={(val) => { dispatch(setSliderValue(finalProps.id, val)) }} value={sliderValue} />
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>{finalProps.text}: {sliderValue}</Text>
        </View>
    );
}


const styles = StyleSheet.create({

});
