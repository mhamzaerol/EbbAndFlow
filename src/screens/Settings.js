import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Switch } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";

const SettingPage = ({ requireAuth }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const fonts = ["Small", "Normal", "Large"];

  const handleFontSizeChange = (value) => {
    setNewFontSize(value);
  };

  const handleRequireAuthToggle = () => {
    requireAuth = !requireAuth;
  };

  const handleBack = () => {
    // Go back to the previous screen
  };

  const resetApp = () =>
    Alert.alert(
      "Notification",
      "Are you sure you want to reset?",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "default",
        },
        {
          text: "Reset",
          onPress: () => console.log("Reset pressed"),
          style: "capcel",
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="left" size={30} onPress={handleBack} />
        <Text style={{ right: 140, fontSize: 25, fontWeight: "bold" }}>
          Settings
        </Text>
      </View>

      <View style={styles.requireAuthSection}>
        <Text style={styles.requireAuthLabel}>Require Authentication</Text>
        <View style={styles.toggle}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.fontSizeSection}>
        <Text style={styles.fontSizeLabel}>Font Size</Text>
        <View style={{ right: 80, padding: 6, flexDirection: "row" }}>
          <View
            style={{
              left: 20,
              bottom: 10,
              width: 130,
              backgroundColor: "white",
            }}
          >
            <SelectDropdown
              data={fonts}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item;
              }}
            />
          </View>
          <AntDesign name="right" size={30} style={{ left: 60, top: 1 }} />
        </View>
      </View>

      <View style={styles.resetSection}>
        <Text style={styles.resetSizesection} onPress={resetApp}>
          Reset App
        </Text>
      </View>

      {/* Other content goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 70,
    width: "200%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  popUp: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  settingSection: {
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fontSizeInput: {
    height: 40,
  },
  requireAuthSection: {
    position: "absolute",
    width: 430,
    height: 80,
    top: 160,
    alignSelf: "left",
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection:'row'
  },
  toggle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left:50
  },
  requireAuthLabel: {
    fontSize: 18,
    top: 9,
  },
  requireAuthButton: {
    width: 100,
  },
  fontSizeSection: {
    position: "absolute",
    width: 430,
    borderWidth: 0.5,
    top: 240,
    alignSelf: "left",
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    alignItems: "stretch",
    flexDirection: "row",
    height: 80,
    justifyContent: "space-between",
  },
  fontSizeLabel: {
    fontSize: 18,
    top: 6,
  },
  resetSection: {
    position: "absolute",
    width: 375,
    top: 550,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 0,
  },
  resetSizesection: {
    color: "red",
    fontSize: 25,
    top: 215,
  },
});
export default SettingPage;
