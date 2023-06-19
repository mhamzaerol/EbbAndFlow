import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import Star from './svg/Star';
import DashedLine from '../components/DashedLine'
import { goNextPage } from 'src/redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCurDate } from 'src/redux/actions';

var selectedIndex = 14;
const numDaysToDisplay = 14;
const minstarSize = 20;
const maxstarSize = 50;
const minVerticalPosition = 25;
const maxVerticalPosition = 75;

function getRecordsWithinTwoWeeks(moodRecords, curDate) {
  // Get the current date and time (excluding hours, minutes, and seconds)
  const currentDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate());

  // Create a new array to store the dates within the last two weeks
  const numDaysToDisplay = 14;
  const feelings = [];
  const intensities = [];

  for(let i = 0; i < numDaysToDisplay; i++) {
    feelings.push(-1.0);
    intensities.push(-1.0);
  }

  moodRecords.forEach(moodRecord => {
    const date = moodRecord.get('date');
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = Math.abs(currentDate.getTime() - dateOnly.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // if within the range
    if (diffDays < numDaysToDisplay) {
      let i = currentDate.getDate() - date.getDate();
      feelings[numDaysToDisplay - i - 1] = moodRecord.get('valence') / 100.0;
      intensities[numDaysToDisplay - i - 1] = moodRecord.get('intensity') / 100.0;
    }
  });

  

  // Iterate through the dates array
  // for (let i = 13; i >= 0; i--) {
  //   // Calculate the date to compare against (subtracting days from the current date)
  //   const compareDate = new Date(currentDate);
  //   compareDate.setDate(compareDate.getDate() - i);

  //   // Check if the compareDate exists in the datesArray
  //   const foundRecord = moodRecords.find(moodRecord => {
  //     const date = moodRecord.get('date');
  //     const arrayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  //     return arrayDate.getTime() === compareDate.getTime();
  //   });

  //   // Add the foundDate to the datesWithinTwoWeeks array, or add a default value if not found
  //   feelings.push(foundRecord?.get("valence"));
  //   if (feelings.slice(-1)[0] === undefined)
  //     feelings[feelings.length - 1] = -1.0;
  //   else 
  //     feelings[feelings.length - 1] /= 100.0
      
  //   intensities.push(foundRecord?.get("intensity"));
  //   if (intensities.slice(-1)[0] === undefined)
  //     intensities[intensities.length - 1] = -1.0;
  //   else
  //     intensities[intensities.length - 1] /= 100.0
  // }

  return [feelings, intensities];
}

const Constellation = () => {
  const curDate = useSelector((store) => store.temporaryData.curDate);
  const todayFullDate = new Date();
  const today = new Date(todayFullDate.getFullYear(), todayFullDate.getMonth(), todayFullDate.getDate());
  // const records = useSelector((store) => store.persistentData.moodRecords);

  // const [lastRecords, setLastRecords] = useState(getRecordsWithinTwoWeeks(records, curDate));

  const scrollViewRef = useRef(null);
  // const [stars, setstars] = useState([]);

  const dispatch = useDispatch();

  const generateStars = (feelings, intensities) => {
    const sizes = [];
    const positions = [];
    const colors = [];
    for(let i = 0; i < numDaysToDisplay; i++) {
      if (feelings[i] == -1.0) {
        sizes.push(-1.0);
        continue;
      }
      sizes.push(minstarSize + (maxstarSize - minstarSize) * intensities[i]);
    }
    for(let i = 0; i < numDaysToDisplay; i++) {
      if (feelings[i] == -1.0) {
        positions.push(-1.0);
        continue;
      }
      const pos = minVerticalPosition + (maxVerticalPosition - minVerticalPosition) * (1.0 - feelings[i]);
      positions.push(pos - sizes[i] / 2);
    }
    for(let i = 0; i < numDaysToDisplay; i++)
      colors.push(convertToHexColor(feelings[i], intensities[i]));

    const starsAttrs = [];
    for (let i = 0; i < numDaysToDisplay; i++) {
      const size = sizes[i];
      const position = positions[i];
      const color = colors[i];
      if(i < numDaysToDisplay - 1) {
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
    return starsAttrs;
  };

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

  const scrollToRight = () => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  };  

  const selectCurrentRectangle = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / styles.rectSize.width);
    // 7 is for number of days of a week
    const delta = numDaysToDisplay - (index + 6) - 1;
    const dateSet = new Date(today.getFullYear(), today.getMonth(), today.getDate() - delta);
    dispatch(
      setCurDate(
        dateSet
      )
    );
    // onSelectedDayChange(lastRecords[0][selectedIndex], lastRecords[1][selectedIndex])

  };

  // useEffect(() => {
  //   setLastRecords(getRecordsWithinTwoWeeks(records, curDate));
  //   onSelectedDayChange(lastRecords[0][selectedIndex], lastRecords[1][selectedIndex])
  // }, [records, curDate]);


  const [lastRecords, stars] = useSelector((store) => {
    let lastRecords = getRecordsWithinTwoWeeks(store.persistentData.moodRecords, today)
    return [lastRecords, generateStars(lastRecords[0], lastRecords[1])];
  });
  const CurrentPage = useSelector(store => store.temporaryData.pageHistory.slice(-1)[0]);

  useEffect(() => {
    // setstars(generateStars(lastRecords[0], lastRecords[1]));
    // setstars(generateStars([0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4], [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5, 0.5]));
    scrollToRight();
    // onSelectedDayChange(lastRecords[0][selectedIndex], lastRecords[1][selectedIndex])
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          if(event.nativeEvent.contentOffset.y < -10) {
            if(CurrentPage !== 'Calendar') {
              dispatch(goNextPage('Calendar'));
            }
          }
        }}
        scrollEventThrottle={256}
      >
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
              {attrs.prevPos != -1 && attrs.size != -1.0 &&
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
              {attrs.nextPos != -1 && attrs.size != -1.0 &&
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
