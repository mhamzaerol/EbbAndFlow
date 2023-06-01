import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const OceanWave = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={waveAnimation}
        iterationCount="infinite"
        style={styles.wave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
  },
});

const waveAnimation = {
  0: { translateY: 0 },
  0.5: { translateY: -10 },
  1: { translateY: 0 },
};

export default OceanWave;
