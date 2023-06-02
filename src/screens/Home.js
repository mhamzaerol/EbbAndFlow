import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constellation from '../components/Constellation';
import HomeBackground from '../components/HomeBackground';
import Boat from '../components/Boat';
import Sun from '../components/Sun'
import OceanWave from '../components/OceanWave';

function Home() {
    return (
        <View style={styles.container}>
            <Constellation />
            <HomeBackground>
                <Sun style={styles.sun}/>
                <OceanWave />
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
    sun: {
        position: 'absolute',
        top: 20,
        left: 20,
    }
});

export default Home;