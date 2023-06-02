import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import Star from '../components/Star';
import DashedLine from '../components/DashedLine'

const Constellation = () => {
  const numRectangles = 14;
  const minstarSize = 20;
  const maxstarSize = 50;
  const minVerticalPosition = 10;
  const maxVerticalPosition = 50;

  const scrollViewRef = useRef(null);
  const [stars, setstars] = useState([]);

  useEffect(() => {
    generatestars();
    scrollToRight();
  }, []);

  const generatestars = () => {
    const sizes = [20, 20, 40, 20, 20, 20, 40, 20, 20, 20, 30, 40, 20, 50];
    const positions = [10, 20, 30, 50, 20, 10, 20, 30, 50, 20, 10, 20, 40, 40];
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

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={scrollToRight}
        onLayout={scrollToRight}
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
              <View style={{position: 'absolute', top: attrs.position}}>
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
