import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { GoBackArrowIcon } from 'assets/svg/GoBackArrowIcon';
import { EraserIcon } from 'assets/svg/EraserIcon';
import { MoodEdit } from 'src/components/MoodEdit';
import { NotePencilIcon } from 'assets/svg/NotePencilIcon';
import { ReturnIcon } from 'assets/svg/ReturnIcon';
import { useDispatch } from 'react-redux';
import { setAppPage } from 'src/redux/actions';

export function MoodTracker() {

    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, flexDirection: 'col', width: '100%', backgroundColor: 'white' }}>
            <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, paddingVertical: 20 }}>
                <TouchableOpacity>
                    <GoBackArrowIcon height='48' width='48' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EraserIcon height='48' width='48' />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                    How was your day?
                </Text>
            </View>
            <MoodEdit />
            <View style={{ flex: 0.12, flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal: 10, paddingVertical: 20 }}>
                <TouchableOpacity style={{ flex: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: 'black', borderWidth: 1 }}>
                    <NotePencilIcon width='32' height='32' style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 20 }}>Write Diary</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: 'black', borderWidth: 1
                }}
                onPress={() => 
                    dispatch(setAppPage('Home'))
                }
                >
                    <ReturnIcon width='32' height='32' style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 20 }}>Exit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
