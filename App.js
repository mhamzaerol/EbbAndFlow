import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';

export default function App() {
  return (
    <Home/>
  );
}