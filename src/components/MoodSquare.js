import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg, Circle, Path, G } from 'react-native-svg';
import { useSelector } from 'react-redux';

const defaultProps = {
    style: {
        width: 250,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    maxFaceRadius: 40,
    minFaceRadius: 10,
};

export function MoodSquare(props) {
    const finalProps = {
        ...defaultProps,
        ...props,
        style: {
            ...defaultProps.style,
            ...props.style,
        }
    };

    // TODO: Implement adaptive shaping for the face

    const cx = useSelector(
        (state) => state.sliderValueReducer.temporaryData.MoodTrackerViewData.MoodTrackerHorizontalSlider
    );
    const cy = useSelector(
        (state) => state.sliderValueReducer.temporaryData.MoodTrackerViewData.MoodTrackerVerticalSlider
    );

    const [faceRadius, setFaceRadius] = useState( (cx / 100.0 * (finalProps.maxFaceRadius - finalProps.minFaceRadius) + finalProps.minFaceRadius) );
    const [faceX, setFaceX] = useState( (100 - faceRadius) * (cx / 100.0) );
    const [faceY, setFaceY] = useState( (100 - faceRadius) * (cy / 100.0) );

    useEffect(() => {
        setFaceRadius( (cx / 100.0 * (finalProps.maxFaceRadius - finalProps.minFaceRadius) + finalProps.minFaceRadius) );
        setFaceX( (100 - faceRadius) * (cx / 100.0) );
        setFaceY( (100 - faceRadius) * (cy / 100.0) );
    }, [cx, cy]);

    const emotions = [
        "M50 8.333c23.013 0 41.667 18.654 41.667 41.667 0 3.03-.325 5.98-.938 8.825l-7.425-7.43A33.333 33.333 0 1065.08 79.734a16.659 16.659 0 006.48 5.93A41.48 41.48 0 0150 91.666C26.988 91.667 8.334 73.012 8.334 50 8.334 26.987 26.988 8.333 50 8.333zM79.167 59.05l5.891 5.892a8.333 8.333 0 11-12.208.458l.425-.458 5.892-5.892zM50 62.5a20.78 20.78 0 0115.417 6.82l-3.938 3.584c-3.291-1.312-7.237-2.07-11.479-2.07-4.242 0-8.187.762-11.479 2.066l-3.938-3.583A20.78 20.78 0 0150 62.5zM35.417 41.667a6.25 6.25 0 110 12.5 6.25 6.25 0 010-12.5zm29.166 0a6.25 6.25 0 110 12.5 6.25 6.25 0 010-12.5z",
        "M50 91.667C26.988 91.667 8.334 73.012 8.334 50 8.334 26.987 26.988 8.333 50 8.333c23.013 0 41.667 18.654 41.667 41.667 0 23.012-18.654 41.667-41.667 41.667zm0-8.334a33.333 33.333 0 100-66.666 33.333 33.333 0 000 66.666zm-20.833-12.5a20.833 20.833 0 0141.666 0H62.5a12.5 12.5 0 00-25 0h-8.333zm4.166-25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zm33.334 0a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z",
        "M50 91.667C26.988 91.667 8.334 73.012 8.334 50 8.334 26.987 26.988 8.333 50 8.333c23.013 0 41.667 18.654 41.667 41.667 0 23.012-18.654 41.667-41.667 41.667zm0-8.334a33.333 33.333 0 100-66.666 33.333 33.333 0 000 66.666zm-16.666-25h33.333v8.334H33.333v-8.334zm0-12.5a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zm33.333 0a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z",
        "M50 91.667C26.988 91.667 8.334 73.012 8.334 50 8.334 26.987 26.988 8.333 50 8.333c23.013 0 41.667 18.654 41.667 41.667 0 23.012-18.654 41.667-41.667 41.667zm0-8.334a33.333 33.333 0 100-66.666 33.333 33.333 0 000 66.666zM29.167 54.167H37.5a12.5 12.5 0 1025 0h8.334a20.833 20.833 0 11-41.667 0zm4.166-8.334a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zm33.334 0a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z",
        "M50 91.667C26.988 91.667 8.334 73.012 8.334 50 8.334 26.987 26.988 8.333 50 8.333c23.013 0 41.667 18.654 41.667 41.667 0 23.012-18.654 41.667-41.667 41.667zm0-8.334a33.333 33.333 0 100-66.666 33.333 33.333 0 000 66.666zM33.334 54.167h33.333a16.667 16.667 0 11-33.334 0zm0-8.334a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zm33.333 0a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"
    ];

    return (
        <View {...finalProps}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <G x={faceX} y={100 - faceY - faceRadius}>
                    <Svg
                        height={faceRadius}
                        width={faceRadius}
                        viewBox="0 0 100 100"
                    >
                        <Path
                            d={emotions[Math.min(Math.floor(cy / 20), emotions.length - 1)]}
                            fill="#000"
                        />
                    </Svg>
                </G>
            </Svg>
        </View>

    );
}

const styles = StyleSheet.create({});
