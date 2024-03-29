import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Image, TouchableHighlight } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { GoBackArrowIcon } from "src/components/svg/GoBackArrowIcon";
import { useDispatch} from "react-redux";
import { goPrevPage } from "src/redux/actions";
import { TouchableOpacity } from "react-native";
import { EraserIcon } from "src/components/svg/EraserIcon";
import { goNextPage } from "src/redux/actions";
import { useEffect } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { saveDiary, delDiary, delSeagullChat } from "src/redux/actions";
import { DiaryRecord } from "src/redux/datatypes";
import { useSelector } from "react-redux";


const JournalPage = () => {

  const dispatch = useDispatch();

  const curDate = useSelector((store) => store.temporaryData.curDate);
  const diaryInfo = useSelector((store) => {
    let diaryRecords = store.persistentData.diaryRecords;
    diaryRecords = diaryRecords.filter((diaryRecord) => diaryRecord.check('date', curDate));
    if (diaryRecords.length > 0) {
      return diaryRecords[0];
    }
    return new DiaryRecord(curDate, '', '');
  });

  const handleBack = () => {
    dispatch(goPrevPage());
  };

  const handleErase = () => {
    dispatch(
      delDiary(
        curDate
      )
    )
    dispatch(
      delSeagullChat(
          curDate
      )
    )
  };

  const handleChat = () => {
    dispatch(goNextPage('MrSeagull'));
  };

  const handleSetDiaryTitle = (title) => {
    const hasChanged = diaryInfo.get('diaryTitle') !== title;
    if (!hasChanged) {
      return;
    }
    const diaryInfoClone = diaryInfo.clone();
    diaryInfoClone.set('diaryTitle', title);
    dispatch(
      saveDiary(
        diaryInfoClone
      )
    )
    dispatch(
        delSeagullChat(
            curDate
        )
    )
  };

  const handleSetDiaryStr = (str) => {
    const hasChanged = diaryInfo.get('diaryStr') !== str;
    if (!hasChanged) {
      return;
    }
    const diaryInfoClone = diaryInfo.clone();
    diaryInfoClone.set('diaryStr', str);
    dispatch(
      saveDiary(
        diaryInfoClone
      )
    )
    dispatch(
      delSeagullChat(
          curDate
      )
    )
  };

  const handleGoHome = () => {
    dispatch(goNextPage('Home'));
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={{ marginBottom: 25, top: 40, marginHorizontal: -10 }}>
          <View style={styles.back}>
            <TouchableOpacity onPress={handleBack}>
              <GoBackArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleErase}>
              <EraserIcon
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', marginBottom: 15 }}> 
          <View style={{ marginRight: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Title:</Text>
          </View>

          <View style={styles.title}>
            <TextInput
              style={{ fontSize: 20,}}
              placeholder="Write the title here"
              value={diaryInfo.get('diaryTitle')}
              onChangeText={(title) => handleSetDiaryTitle(title)}
              // onEndEditing={(e) => handleSetDiaryTitle(e.nativeEvent.text)}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your journal entry here"
          value={diaryInfo.get('diaryStr')}
          onChangeText={(text) => handleSetDiaryStr(text)}
          // onEndEditing={(e) => handleSetDiaryStr(e.nativeEvent.text)}
        />

        {/* <View style={styles.images}>
        
        
      </View> */}

        <View style={styles.button}>

          <TouchableOpacity onPress={handleGoHome} style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={styles.saveImg1}
              source={require("images/icons8-boat-96.png")}
            />
            <View style={styles.save}>
              <Text style={{ fontSize: 20 }}>
                Return Home
              </Text>
              {/* <Text style={{ fontSize: 20 }}>Exit</Text> */}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChat} style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={styles.saveImg2}
              source={require("images/icons8-seagull-100.png")}
            />
            <View style={styles.talk}>
              <Text style={{ fontSize: 20 }}>Talk with Mr.</Text>
              <Text style={{ fontSize: 20 }}>Seagull</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    height: 50,
    backgroundColor: "white",
  },
  title: {
    // height: 30,
    // marginBottom: 10,
    width: '80%',
    borderColor: "gray",
    // bottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    bottom: 0,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    fontSize: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  save: {
    // height: 46,
    // width: 108,
    // paddingTop: 7,
    // paddingLeft: 13,
    // paddingRight: 5,
    // paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  images: {
    height: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveImg1: {
    // bottom: 20,
    // width: "100%",
    // height: "160%",
    // marginLeft: "3%",
  },
  saveImg2: {
    // bottom: 20,
    // width: "100%",
    // height: "160%",
    // marginRight: "5%",
  },
  talk: {
    // textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    // paddingLeft: 18,
    // height: 46,
    // width: 108,
  },
});

export default JournalPage;
