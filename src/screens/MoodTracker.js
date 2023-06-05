import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { EraserIcon } from 'src/components/svg/EraserIcon';
import { MoodEdit } from 'src/components/MoodEdit';
import { NotePencilIcon } from 'src/components/svg/NotePencilIcon';
import { ReturnIcon } from 'src/components/svg/ReturnIcon';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { goPrevPage, goNextPage,  delMood} from 'src/redux/actions';

export function MoodTracker() {

    const dispatch = useDispatch();

    const curDate = useSelector((store) => store.temporaryData.curDate);
    
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'col', width: '100%', backgroundColor: 'white' }}>
            <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, paddingVertical: 20 }}>
                <TouchableOpacity
                    onPress={() => { dispatch(goPrevPage()) }}>
                    <GoBackArrowIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { 
                        dispatch(delMood(curDate));
                        // dispatch(goNextPage('Home'));
                     }}>
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
                <TouchableOpacity 
                style={{ flex: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: 'black', borderWidth: 1 }}
                onPress={() => dispatch(goNextPage('WriteDiary'))}
                >
                    <NotePencilIcon width='32' height='32' style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 20 }}>Write Diary</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: 'black', borderWidth: 1
                }}
                    onPress={() =>
                        dispatch(goNextPage('Home'))
                    }
                >
                    <ReturnIcon width='32' height='32' style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 20 }}>Exit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
