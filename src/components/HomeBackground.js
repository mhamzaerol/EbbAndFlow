import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

const FROM_COLOR = '#9FE3FF';
const TO_COLOR = '#E4F7FF';

const HomeBackground = ({ children }) => {
    return (
        <View style={{flex:1}}>
            <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0" stopColor={ FROM_COLOR }/>
                        <Stop offset="1" stopColor={ TO_COLOR }/>
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)"/>
            </Svg>
            { children }
        </View>
    );
};

export default HomeBackground;