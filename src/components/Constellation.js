import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import Star from '../components/Star';
import DashedLine from '../components/DashedLine'

const getRandomArray = (n) => {
  const arr = [];
  for(let i = 0; i < n; i++) {
    arr.push(Math.random());
  }
  return arr;
}

var selectedIndex = 14;

const Constellation = () => {
  const numRectangles = 14;
  const minstarSize = 20;
  const maxstarSize = 50;
  const minVerticalPosition = 25;
  const maxVerticalPosition = 75;

  const feelings = getRandomArray(numRectangles);
  const intensities = getRandomArray(numRectangles);

  const scrollViewRef = useRef(null);
  const [stars, setstars] = useState([]);

  useEffect(() => {
    generatestars();
    scrollToRight();
  }, []);

  const convertToHexColor = (arousal, valence) => {
    const angle = Math.atan2(valence - 0.5, arousal - 0.5) + Math.PI;
    const degrees = (angle * 180) / Math.PI;
    const hue = degrees;
    const saturation = 100;
    const lightness = 50;

    function hslToHex(h, s, l) {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
  
    return hslToHex(hue, saturation, lightness);
  };

  const generatestars = () => {
    const sizes = [];
    const positions = [];
    const colors = [];
    for(let i = 0; i < numRectangles; i++)
      sizes.push(minstarSize + (maxstarSize - minstarSize) * intensities[i]);
    for(let i = 0; i < numRectangles; i++) {
      const pos = minVerticalPosition + (maxVerticalPosition - minVerticalPosition) * feelings[i];
      positions.push(pos - sizes[i] / 2);
    }
    for(let i = 0; i < numRectangles; i++)
      colors.push(convertToHexColor(feelings[i], intensities[i]));

    const starsAttrs = [];
    for (let i = 0; i < numRectangles; i++) {
      const size = sizes[i];
      const position = positions[i];
      const color = colors[i];
      if(i < numRectangles - 1) {
        var nextPos = positions[i + 1];
        var nextSize = sizes[i + 1];
      } else {
        var nextPos = -1;
        var nextSize = -1;
      }
      if(i > 0) {
        var prevPos = positions[i - 1];
        var prevSize = sizes[i - 1];
      } else {
        var prevPos = -1;
        var prevSize = -1;
      }

      const starAttrs = {
        size,
        position,
        nextPos,
        nextSize,
        prevPos,
        prevSize,
        color,
      };
      starsAttrs.push(starAttrs);
    }
    setstars(starsAttrs);
  };

  const scrollToRight = () => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  };  

  const selectCurrentRectangle = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / styles.rectSize.width);
    // 7 is for number of days of a week
    selectedIndex = index + 7;
    console.log(selectedIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={scrollToRight}
        onLayout={scrollToRight}
        onMomentumScrollEnd={selectCurrentRectangle}
        decelerationRate={0}
        snapToInterval={styles.rectSize.width}
        snapToAlignment={"right"}
      >
        <View style={styles.rectangleRow}>
          {stars.map((attrs, index) => (
            <View key={index} style={styles.rectangle}>
              {attrs.prevPos != -1 && 
                <View style={{position: 'absolute'}}>
                  <DashedLine 
                    startX={styles.rectSize.width / 2}
                    startY={attrs.position + attrs.size / 2}
                    endX={0}
                    endY={((attrs.position + attrs.size / 2) + (attrs.prevPos + attrs.prevSize / 2)) / 2}
                    width={styles.rectSize.width} 
                    height={styles.rectSize.height} 
                    style={styles.rectSize}/>
                </View>
              }
              <View style={{position: 'absolute', top: attrs.position, zIndex:1}}>
                <Star width={attrs.size} height={attrs.size} color={attrs.color} />
              </View>
              {attrs.nextPos != -1 && 
                <View style={{position: 'absolute'}}>
                  <DashedLine 
                    startX={styles.rectSize.width / 2}
                    startY={attrs.position + attrs.size / 2}
                    endX={styles.rectSize.width}
                    endY={((attrs.position + attrs.size / 2) + (attrs.nextPos + attrs.nextSize / 2)) / 2}
                    width={styles.rectSize.width} 
                    height={styles.rectSize.height} 
                    style={styles.rectSize}/>
                </View>
              }
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
    zIndex: 2,
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
  rectSize: {
    width: Dimensions.get('window').width / 7,
    height: 90,
    left: -Dimensions.get('window').width / 14,
    top: -45,
  },
  circle: {
    borderRadius: 100,
    borderWidth: 1,
    position: 'absolute',
  },
});

export default Constellation;
