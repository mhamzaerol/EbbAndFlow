import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Switch } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { GoBackArrowIcon } from "src/components/svg/GoBackArrowIcon";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { goPrevPage } from "src/redux/actions";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = ({ requireAuth }) => {
    // const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const fonts = ["Small", "Normal", "Large"];
    const dispatch = useDispatch();

    const handleFontSizeChange = (value) => {
        setNewFontSize(value);
    };

    const handleRequireAuthToggle = () => {
        requireAuth = !requireAuth;
    };

    const handleBack = () => {
        dispatch(goPrevPage());
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

    const getDropdownText = (str) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%', paddingTop: 6}}>
                <Text style={{fontSize: 16}}>{str}</Text>
                <GoBackArrowIcon width='28' heigh='28' style={{transform: [{ rotate: '270deg'}]}} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* <AntDesign name="left" size={30} onPress={handleBack} /> */}
                <TouchableOpacity onPress={handleBack}>
                    <GoBackArrowIcon />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Settings
                </Text>
                <TouchableOpacity style={{ width: 48, height: 48 }}>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 20 }}>
                <View style={styles.requireAuthSection}>
                    <Text style={styles.requireAuthLabel}>Require Authentication:</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <View style={styles.fontSizeSection}>
                    <Text style={styles.fontSizeLabel}>Font Size:</Text>
                    <SelectDropdown
                        data={fonts}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                        }}
                        buttonTextAfterSelection={(selectedItem) => getDropdownText(selectedItem)}
                        rowTextForSelection={(item) => {
                            return item;
                        }}
                        defaultButtonText={getDropdownText("Select Size")}
                        buttonStyle={{backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, maxWidth: '45%', flex: 1, flexDirection: 'row', alignItems: 'center'}}
                        rowTextStyle={{fontSize: 16}}
                        selectedRowTextStyle={{fontSize: 16}}
                    />
                        {/* <AntDesign size={30} style={{ left: 60, top: 1 }} /> */}
                </View>
            </View>

            <View style={styles.resetSection}>
                <Text style={styles.resetSizesection} onPress={resetApp}>
                    Reset App
                </Text>
            </View>

            {/* Other content goes here */}
        </SafeAreaView>
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
        flex: 0,
        // position: "absolute",
        // top: 70,
        width: "100%",
        // height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
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
        // height: 40,
    },
    requireAuthSection: {
        // width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    toggle: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    requireAuthLabel: {
        flex: 1,
        fontSize: 20,
    },
    fontSizeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    fontSizeLabel: {
        flex: 1,
        fontSize: 20,
    },
    resetSection: {
        // position: "absolute",
        // width: 375,
        // top: 550,
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: 'flex-end',
        width: '100%',
        marginBottom: 20,
        // paddingBottom: 20,
        // paddingTop: 20,
        // paddingLeft: 0,
    },
    resetSizesection: {
        color: "red",
        fontSize: 24,
    },
});
export default Settings;
