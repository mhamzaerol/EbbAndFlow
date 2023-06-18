import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, Image, TouchableHighlight } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { GoBackArrowIcon } from "src/components/svg/GoBackArrowIcon";
import { useDispatch } from "react-redux";
import { goPrevPage } from "src/redux/actions";
import { TouchableOpacity } from "react-native";
import { EraserIcon } from "src/components/svg/EraserIcon";
import { goNextPage } from "src/redux/actions";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { addDiaryRecord, delDiaryRecord } from 'src/redux/actions';
import { useRoute } from '@react-navigation/native';
import { DiaryRecord } from "src/redux/datatypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const JournalPage = () => {
  const curDate = useSelector(state => state.temporaryData.curDate);
  const [title, setTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [date, setDate] = useState(curDate ? new Date(curDate) : new Date()); // Use useState to set the date
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDiaryData = async () => {
      const storedDate = await AsyncStorage.getItem('@curDate');
      if (storedDate) {
        const diaryRecord = await AsyncStorage.getItem(`@diary_${storedDate}`);
        if (diaryRecord) {
          const { title, entryText } = JSON.parse(diaryRecord);
          setTitle(title);
          setEntryText(entryText);
        }
      }
    };
    fetchDiaryData();
  }, []);
  
  const handleSaveEntry = async () => {
    const newRecord = new DiaryRecord(date, title, entryText);
    dispatch(addDiaryRecord(newRecord));
    await AsyncStorage.setItem('@curDate', date.toISOString());
    await AsyncStorage.setItem(`@diary_${date.toISOString()}`, JSON.stringify(newRecord));
  };

  useEffect(() => {
    const getDateFromStorage = async () => {
      const storedDate = await AsyncStorage.getItem('@curDate');
      if (storedDate) {
        setDate(new Date(storedDate));
      }
    };
    getDateFromStorage();
  }, []);

  const handleBack = () => {
    dispatch(goPrevPage());
  };
  // console.log(AsyncStorage.getItem('@curDate'));
  const handleErase = async () => {
    try {
      await AsyncStorage.removeItem(`@diary_${date.toISOString()}`);
      dispatch(delDiaryRecord(date.toISOString()));
      setTitle("");
      setEntryText("");
    } catch (error) {
      console.log("Error deleting diary record: ", error);
    }
  };

  const handleChat = () => {
    dispatch(goNextPage('MrSeagull'));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={{ marginBottom: 20, top: 40, marginHorizontal: -10 }}>
          <View style={styles.back}>
            <TouchableOpacity onPress={handleBack}>
              <GoBackArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleErase}>
              <EraserIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', marginBottom: 15 }}> 
          <View style={{ marginRight: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Title:</Text>
          </View>

          <View style={styles.title}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Write the title here"
              value={title}
              onChangeText={(title) => setTitle(title)}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your journal entry here"
          value={entryText}
          onChangeText={(text) => setEntryText(text)}
        />

        <View style={styles.button}>
          <TouchableOpacity onPress={handleSaveEntry} style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={styles.saveImg1}
              source={require("images/icons8-boat-96.png")}
            />
            <View style={styles.save}>
              <Text style={{ fontSize: 20 }}>Save & Exit</Text>
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
    width: 220,
    borderColor: "gray",
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
