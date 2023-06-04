import React, {useEffect} from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { store } from 'src/redux/store';
import WriteDiary from 'src/screens/WriteDiary';
import Home from 'src/screens/Home';
import { MoodTracker } from 'src/screens/MoodTracker';
import MrSeagull from 'src/screens/MrSeagull';
import Calendar from 'src/screens/Calendar';
import Settings from 'src/screens/Settings';

const Stack = createStackNavigator();

const MyStack = () => {

  const currentPage = useSelector(store => store.appPageReducer.temporaryData.AppViewData.pageHistory.slice(-1)[0]);

  useEffect(() => {
    console.log("App.js: appPage = " + currentPage)
    navigationRef.current?.navigate(currentPage);
  }, [currentPage]);

  return (
    // make the view come from above
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="MoodTracker" component={MoodTracker} />
        <Stack.Screen name="WriteDiary" component={WriteDiary} />
        <Stack.Screen name="MrSeagull" component={MrSeagull} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
  );

}

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );

}