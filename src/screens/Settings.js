import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Switch } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { GoBackArrowIcon } from "src/components/svg/GoBackArrowIcon";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { goPrevPage } from "src/redux/actions";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetApp } from "src/redux/actions";
import { useSelector } from "react-redux";
import { setAuth, setFontSize } from "src/redux/actions";

const Settings = () => {
    const requireAuthentication = useSelector(store => store.persistentData.requireAuthentication);
    const fontSize = useSelector(store => store.persistentData.fontSize);

    const fonts = ["Small", "Normal", "Large"];
    const dispatch = useDispatch();

    const handleFontSizeChange = (value) => {
        dispatch(setFontSize(value));
    };

    const handleRequireAuthToggle = () => {
        dispatch(setAuth(!requireAuthentication));
    };

    const handleBack = () => {
        dispatch(goPrevPage());
    };

    const resetTheApp = () =>
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
                    onPress: () => {
                        dispatch(resetApp());
                        console.log("Reset pressed");
                    },
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
                        thumbColor={requireAuthentication ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleRequireAuthToggle}
                        value={requireAuthentication}
                    />
                </View>

                <View style={styles.fontSizeSection}>
                    <Text style={styles.fontSizeLabel}>Font Size:</Text>
                    <SelectDropdown
                        data={fonts}
                        onSelect={(selectedItem, index) => {
                            handleFontSizeChange(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem) => getDropdownText(selectedItem)}
                        rowTextForSelection={(item) => {
                            return item;
                        }}
                        defaultButtonText={getDropdownText(fontSize)}
                        buttonStyle={{backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, maxWidth: '45%', flex: 1, flexDirection: 'row', alignItems: 'center'}}
                        rowTextStyle={{fontSize: 16}}
                        selectedRowTextStyle={{fontSize: 16}}
                    />
                </View>
            </View>

            <View style={styles.resetSection}>
                <Text style={styles.resetSizesection} onPress={resetTheApp}>
                    Reset App
                </Text>
            </View>

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
        width: "100%",
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
    },
    requireAuthSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    toggle: {
        flex: 1,
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
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: 'flex-end',
        width: '100%',
        marginBottom: 20,
    },
    resetSizesection: {
        color: "red",
        fontSize: 24,
    },
});
export default Settings;
