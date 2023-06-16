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
import { goNextPage } from 'src/redux/actions'

function Home() {

    const dispatch = useDispatch();

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

    return (
        <View style={styles.container}>
            <Constellation onSelectedDayChange={handleSelectedDay}/>
            { feeling < 0.5 &&
            <TouchableWithoutFeedback onPress={() =>
                dispatch(
                    goNextPage('MoodTracker')
                )
            }>
                <View style={styles.gloomy}/>
            </TouchableWithoutFeedback> }
            { feeling >= 0.5 &&
            <TouchableWithoutFeedback onPress={() =>
                dispatch(
                    goNextPage('MoodTracker')
                )
            }>
                <View style={styles.clear}/>
            </TouchableWithoutFeedback> }
            { feeling < 0.5 &&
            <HomeBackground>
                <Cloud style={styles.cloud} fill='gray'/>
                <OceanWave feeling={feeling} intensity={intensity} />
            </HomeBackground> }
            { feeling >= 0.5 &&
            <HomeBackground>
                <Sun style={styles.sun} />
                <OceanWave feeling={feeling} intensity={intensity} />
            </HomeBackground> }
        </View>
        // <View style={styles.container}>
        //     <Constellation />
        //     <View style={styles.gloomy}/>
        //     <HomeBackground>
        //         <Cloud style={styles.cloud} fill='gray'/>
        //         <OceanWave feeling={0.2} intensity={1}/>
        //     </HomeBackground>
        // </View>
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