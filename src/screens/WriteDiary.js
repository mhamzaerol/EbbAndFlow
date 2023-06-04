import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Image, TouchableHighlight } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { GoBackArrowIcon } from "src/components/svg/GoBackArrowIcon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { goPrevPage } from "src/redux/actions";
import { TouchableOpacity } from "react-native";
import {EraserIcon} from "src/components/svg/EraserIcon";
import { goNextPage } from "src/redux/actions";

const JournalPage = () => {
  const [title, setTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  
  const dispatch = useDispatch();
  
  const handleSaveEntry = () => {
    dispatch(goNextPage('Home'));
  };

  const handleBack = () => {
    dispatch(goPrevPage());
  };

  const handleErase = () => {
    
  };

  const handleChat = () => {
    dispatch(goNextPage('MrSeagull'));
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom:20, top:40}}>
        <View style={styles.back}>
          <TouchableOpacity onPress={handleBack}>
            <GoBackArrowIcon/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleErase}>
            <EraserIcon
        />
          </TouchableOpacity>
        </View>
      </View>
    
      <View style={{ flexDirection: "row", marginTop: 30}}>
        <View style={{bottom:10, marginRight: 20}}>
          <Text style={{ fontSize: 20, }}>Title:</Text>
        </View>

        <View style={styles.title}>
          <TextInput
            style={{ fontSize: 18, right:10 }}
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

      <View style={styles.images}>
        <Image
          style={styles.saveImg1}
          source={require("images/icons8-boat-96.png")}
        />
        <Image
          style={styles.saveImg2}
          source={require("images/icons8-seagull-100.png")}
        />
      </View>

      <View style={styles.button}>
       
        <TouchableOpacity onPress={handleSaveEntry}>
          <View style={styles.save}>
            <Text style={{ fontSize: 14, top:6, left:3 }}>
              Save & Exit
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleChat}>
          <View style={styles.talk}>
            <Text style={{ fontSize: 14, top:6, left:3 }}>Talk with</Text>
            <Text style={{ fontSize: 14, top:6, left:3 }}>Mr.Seagull</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    height: 50,
  },
  title: {
    // height: 30,
    marginBottom: 10,
    width: 220,
    borderColor: "gray",
    bottom:8,
  
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    bottom:0,
    marginBottom: 55,
    padding: 5,
    flexDirection: "row",
    fontSize: 18,
  },
  button: {
    fontSize: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  back: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  save: {
    height: 46,
    width: 108,
    borderWidth: 1,
    borderColor: "gray",
    paddingTop: 7,
    paddingLeft: 13,
    paddingRight: 5,
    paddingBottom: 5,
  },
  images: {
    height: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveImg1: {
    bottom:20,
    width: "20%",
    height: "160%",
    marginLeft: "3%",
  },
  saveImg2: {
    bottom:20,
    width: "20%",
    height: "160%",
    marginRight: "5%",
  },
  talk: {
    borderWidth: 1,
    borderColor: "gray",
    textAlign: "center",
    paddingLeft: 18,
    fontSize: 14,
    height: 46,
    width: 108,
  },
});

export default JournalPage;
