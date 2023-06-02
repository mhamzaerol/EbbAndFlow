import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constellation from '../components/Constellation';
import HomeBackground from '../components/HomeBackground';
import Boat from '../components/Boat';
import Sun from '../components/Sun'
import Cloud from '../components/Cloud';
import OceanWave from '../components/OceanWave';

function Home() {

    return (
        <View style={styles.container}>
            <Constellation />
            <View style={styles.clear}/>
            <HomeBackground>
                <Sun style={styles.sun}/>
                <OceanWave feeling={0.2} intensity={0}/>
            </HomeBackground>
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