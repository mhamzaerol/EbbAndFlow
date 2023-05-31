import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { MoodTracker } from 'src/screens/MoodTracker';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import {MoodEdit} from 'src/components/MoodEdit';

export default function App() {
  
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <MoodTracker />
      </SafeAreaView>
    </Provider>
  );
}