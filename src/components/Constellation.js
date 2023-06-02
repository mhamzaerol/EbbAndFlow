import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import Star from '../components/Star';

const RectangleRow = () => {
  const numRectangles = 14;
  const minCircleSize = 10;
  const maxCircleSize = 30;
  const minVerticalPosition = 10;
  const maxVerticalPosition = 50;

  const scrollViewRef = useRef(null);
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    generateCircles();
    scrollToRight();
  }, []);

  const generateCircles = () => {
    const sizes = [10, 20, 30, 10, 10, 20, 30, 10, 10, 20, 30, 10, 10, 20];
    const positions = [10, 20, 30, 50, 20, 10, 20, 30, 50, 20, 10, 20, 30, 0];
    const colors = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#00FFFF',
      '#FF00FF',
      '#C0C0C0',
      '#808080',
      '#800000',
      '#808000',
      '#008000',
      '#800080',
      '#008080',
      '#000080',
    ];
    const circlesAttrs = [];
    for (let i = 0; i < numRectangles; i++) {
      const size = sizes[i];
      const position = positions[i];
      const color = colors[i];
      const circleAttrs = {
        size,
        position,
        color,
      };
      circlesAttrs.push(circleAttrs);
    }
    setCircles(circlesAttrs);
  };

  const scrollToRight = () => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  };  

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={scrollToRight}
        onLayout={scrollToRight}
      >
        <View style={styles.rectangleRow}>
          {circles.map((attrs, index) => (
            <View key={index} style={styles.rectangle}>
              <View style={{position: 'absolute', top: attrs.position}}>
                <Star width={attrs.size} height={attrs.size} color={attrs.color} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
  },
  rectangleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rectangle: {
    width: Dimensions.get('window').width / 7,
    height: 90,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 100,
    borderWidth: 1,
    position: 'absolute',
  },
});

export default RectangleRow;
