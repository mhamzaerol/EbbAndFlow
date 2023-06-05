import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { setMood } from 'src/redux/actions';
import {MoodRecord} from 'src/redux/datatypes';

const defaultProps = {
    minimumValue: 0,
    maximumValue: 100,
    step: 1,
    minimumTrackTintColor: '#FC2865',
    maximumTrackTintColor: '#AAAAAA',
    thumbTintColor: '#000000',
    text: 'SliderWithDescriptor',
    transformAngle: '0deg',
    id: 'intensity',
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
    const curDate = useSelector((store) => store.curDateReducer.temporaryData.curDate);
    const moodInfo = useSelector((store) => {
        let moodRecords = store.moodRecordsReducer.persistentData.moodRecords;
        moodRecords = moodRecords.filter((moodRecord) => moodRecord.check('date', curDate));
        if (moodRecords.length > 0) {
            console.log('Found!!');
            return moodRecords[0];
        }
        return new MoodRecord(curDate, finalProps.minimumValue, finalProps.minimumValue);
    });

    const dispatch = useDispatch();

    const updateMood = (val) => {
        let newMoodInfo = moodInfo.clone();
        newMoodInfo.set(finalProps.id, val);
        dispatch(
            setMood(        
                newMoodInfo
            )   
        )
    };

    if (finalProps.id === 'valence') {
        finalProps.transformAngle = '270deg'
    }

    // view
    return (
        <View style={{width: finalProps.width, transform: [{ rotate: finalProps.transformAngle }], position: finalProps.id === 'valence' ? 'absolute' : 'relative', bottom: finalProps.id === 'valence' ? '40%' : 0, right: finalProps.id === 'valence' ? '-22.5%' : 0, marginRight: finalProps.marginRight}}>
            <View style={{ flex: 0, flexDirection: 'column'}}>
                <Slider {...finalProps} style={{width: '100%'}} onValueChange={(val) => { updateMood(val) }} value={moodInfo.get(finalProps.id)} />
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>{finalProps.text}: {moodInfo.get(finalProps.id)}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

});
