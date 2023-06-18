import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { authSuccessful } from 'src/redux/actions';
import { MaterialIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

function Authentication() {
    const dispatch = useDispatch();

    const onSuccessfulAuth = () => {
        dispatch(authSuccessful())
    };

    useEffect(() => {
        checkBiometricSupport();
        authenticate();
    }, []);
    
    const checkBiometricSupport = async () => {
        const { available } = await LocalAuthentication.hasHardwareAsync();
    
        if (!available) {
          console.log('No biometric support');
        }
    };

    const authenticate = async () => {
        const { success } = await LocalAuthentication.authenticateAsync();

        if (success) {
            console.log('Authentication succeeded');
            onSuccessfulAuth();
        } else {
            console.log('Authentication failed');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.authenticationText}>Authentication</Text>
            <MaterialIcons style={styles.lockIcon} name="lock-outline" size={64} color="black" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authenticationText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: '33%',
        marginBottom: 'auto',
    },
    lockIcon: {
        marginBottom: '75%',
    },
});

export default Authentication;
