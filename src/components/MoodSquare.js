import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import { useSelector } from 'react-redux';

const defaultProps = {
    style: {
        width: 250,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    faceRadius: 20,
};

export function MoodSquare(props) {
    const finalProps = {
        ...defaultProps,
        ...props,
    };

    const horizontalSliderValue = useSelector(
        (state) => state.sliderValueReducer.temporaryData.MoodTrackerViewData.MoodTrackerHorizontalSlider
    );
    const verticalSliderValue = useSelector(
        (state) => state.sliderValueReducer.temporaryData.MoodTrackerViewData.MoodTrackerVerticalSlider
    );

    const [cx, setCx] = useState(0);
    const [cy, setCy] = useState(0);

    useEffect(() => {
        const interpolate = (v, l1, r1, l2, r2) =>
            l2 + ((v - l1) / (r1 - l1)) * (r2 - l2);

        const newCx = interpolate(
            horizontalSliderValue,
            0,
            100,
            0,
            finalProps.style.width
        );
        const newCy = interpolate(
            verticalSliderValue,
            0,
            100,
            finalProps.style.width,
            0,
        );

        setCx(newCx);
        setCy(newCy);
    }, [horizontalSliderValue, verticalSliderValue, finalProps.style.width]);

    return (
        <View {...finalProps}>
            <Svg>
                <Circle cx={cx} cy={cy} r={finalProps.faceRadius} fill="white" stroke="black" />
                <Path
                d={`M${cx - 9} ${cy + 5} Q ${cx} ${cy + 15} ${cx + 9} ${cy + 5}`}
                fill="red"
                />
                <Circle cx={cx - 3} cy={cy - 4} r={2} fill="black" />
                <Circle cx={cx + 3} cy={cy - 4} r={2} fill="black" />
            </Svg>
        </View>

    );
}

const styles = StyleSheet.create({});
