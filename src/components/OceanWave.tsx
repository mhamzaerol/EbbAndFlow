import React from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
} from "react-native";

import {
  Skia,
  Canvas,
  Path,
  Vertices,
  vec,
  useComputedValue,
  useClockValue,
  useValue,
  useTouchHandler,
  LinearGradient,
  Text,
  useFont,
} from "@shopify/react-native-skia";

import { line, curveBasis } from "d3";
import * as Animatable from 'react-native-animatable';

import Boat from "./Boat";

const dimens = Dimensions.get("screen");
const width = dimens.width;
const frequency = 2;
const verticalShiftConst = 400;
const height = 800;
const minSpeed = 600;
const maxSpeed = 1400;
const minAmplitude = 10;
const maxAmplitude = 40;

export const OceanWave = (props) => {
  const [feeling, intensity] = [props.feeling, props.intensity];
  const speed = minSpeed + (maxSpeed - minSpeed) * (1 - intensity);
  const amplitude = useValue(minAmplitude + (maxAmplitude - minAmplitude) * intensity);
  
  const verticalShift = useValue(verticalShiftConst);
  // const amplitude = useValue(initialAmplitude);
  const clock = useClockValue();

  const createWavePath = (phase = 20) => {
    let points = Array.from({ length: width }, (_, index) => {
      const angle =
        ((index) / width) * (Math.PI * frequency) + phase;
      return [
        index,
        amplitude.current * Math.sin(angle) + verticalShift.current,
      ];
    });

    const shiftedPoints = points.slice(0, 600) as [
      number,
      number
    ][];

    const lineGenerator = line().curve(curveBasis);
    const waveLine = lineGenerator(shiftedPoints);
    const bottomLine = `L${
      width
    },${height} L${0},${height}`;
    const extendedWavePath = `${waveLine} ${bottomLine} Z`;
    return extendedWavePath;
  };

  const animatedPath = useComputedValue(() => {
    const current = (clock.current / speed) % speed;
    const start = Skia.Path.MakeFromSVGString(createWavePath(current))!;
    const end = Skia.Path.MakeFromSVGString(createWavePath(Math.PI * current))!;
    return start.interpolate(end, 0.5)!;
  }, [clock, verticalShift]);

  const gradientStart = useComputedValue(() => {
    return vec(0, verticalShift.current);
  }, [verticalShift]);

  const gradientEnd = useComputedValue(() => {
    return vec(0, verticalShift.current + 150);
  }, [verticalShift]);

  return (
    <View style={{flex:1}}>
      <Canvas style={styles.canvas}>
        <Path path={animatedPath} style="fill">
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={["#80c5de", "#1babdf"]}
          />
        </Path>
      </Canvas>
      <Animatable.View
        animation={waveAnimation}
        duration={1500}
        iterationCount="infinite"
        style={styles.boat}
      >
        <Boat />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  boat: {
    position: "absolute",
    left: width / 2 - 61,
    top: height - 500,
  }
});

const waveAnimation = {
  0: { translateY: 0 },
  0.5: { translateY: -10 },
  1: { translateY: 0 },
};

export default OceanWave;