import React, { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constellation from '../components/Constellation';
import HomeBackground from '../components/HomeBackground';
import Boat from '../components/svg/Boat';
import Sun from '../components/svg/Sun'
import Cloud from '../components/svg/Cloud';
import OceanWave from '../components/OceanWave';
import { useDispatch } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { goNextPage, setCurDate } from 'src/redux/actions'
import { useSelector } from 'react-redux';
import { MoodRecord } from 'src/redux/datatypes';

function Home() {

    const dispatch = useDispatch();
    const curDate = useSelector((store) => store.temporaryData.curDate);
    const moodRecord = useSelector((store) => {
        let moodRecords = store.persistentData.moodRecords.filter((moodRecord) => moodRecord.check('date', curDate));
        if (moodRecords.length > 0) {
            return moodRecords[0];
        }
        return new MoodRecord(curDate, 50, 50);
    });

    useEffect(() => {
        const today = new Date();
        dispatch(setCurDate(today));
    }, [])

    return (
        <View style={styles.container}>
          <Constellation/>
          {moodRecord.get('valence') / 100.0 < 0.5 ? (
            <TouchableWithoutFeedback onPress={() =>
              dispatch(
                goNextPage('MoodTracker')
              )
            }>
              <View style={styles.gloomy}/>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() =>
              dispatch(
                goNextPage('MoodTracker')
              )
            }>
              <View style={styles.clear}/>
            </TouchableWithoutFeedback>
          )}
          <HomeBackground>
            {moodRecord.get('valence') / 100.0 < 0.5 ? (
              <>
                <Cloud style={styles.cloud} fill='gray'/>
                <OceanWave intensity={moodRecord.get('intensity') / 100.0} />
              </>
            ) : (
              <>
                <Sun style={styles.sun} />
                <OceanWave intensity={moodRecord.get('intensity') / 100.0} />
              </>
            )}
          </HomeBackground>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
        flexDirection: 'column'
    },
    clear: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 1
    },
    gloomy: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1
    },
    sun: {
        position: 'absolute',
        top: 50,
        left: "50%",
        transform: [{ translateX: -32 }],
    },
    cloud: {
        position: 'absolute',
        top: 50,
        left: "50%",
        transform: [{ translateX: -64 }],
    }
});

export default Home;