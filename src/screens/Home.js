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

function Home() {

    const dispatch = useDispatch();
    const curDate = useSelector((store) => store.temporaryData.curDate);
    const moodInfo = useSelector((store) => {
        let moodRecords = store.persistentData.moodRecords;
        moodRecords = moodRecords.filter((moodRecord) => moodRecord.check('date', curDate));
        if (moodRecords.length > 0) {
            return [moodRecords[0].get('valence') / 100.0, moodRecords[0].get('intensity') / 100.0];
        }
        return [0.5, 0.5];
    });

    const handleSelectedDay = (feeling, intensity) => {
        if (feeling === -1 || intensity === -1) {
            setFeeling(0.5);
            setIntensity(0.5);
        }
        else {
            setFeeling(feeling);
            setIntensity(intensity);
        }
    };

    const [feeling, setFeeling] = useState(0.5);
    const [intensity, setIntensity] = useState(0.5);

    useEffect(() => {
        setFeeling(moodInfo[0]);
        setIntensity(moodInfo[1]);
        
        const today = new Date();
        dispatch(setCurDate(today));
    }, [])

    return (
        <View style={styles.container}>
          <Constellation onSelectedDayChange={handleSelectedDay}/>
          {feeling < 0.5 ? (
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
            {feeling < 0.5 ? (
              <>
                <Cloud style={styles.cloud} fill='gray'/>
                <OceanWave intensity={intensity} />
              </>
            ) : (
              <>
                <Sun style={styles.sun} />
                <OceanWave intensity={intensity} />
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