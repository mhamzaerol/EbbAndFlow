import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store, persistor } from 'src/redux/store';
import WriteDiary from 'src/screens/WriteDiary';
import Home from 'src/screens/Home';
import { MoodTracker } from 'src/screens/MoodTracker';
import MrSeagull from 'src/screens/MrSeagull';
import Calendar from 'src/screens/Calendar';
import Settings from 'src/screens/Settings';
import Authentication from 'src/screens/Authentication';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

const MyStack = () => {

  const currentPage = useSelector(store => store.temporaryData.pageHistory.slice(-1)[0]);

  useEffect(() => {
    navigationRef.current?.navigate(currentPage);
  }, [currentPage]);

  return (
    // make the view come from above
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
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

const FullApp = () => {

  const isAuthenticated = useSelector(store => store.temporaryData.isAuthenticated);
  const requireAuthentication = useSelector(store => store.persistentData.requireAuthentication);
  
  return (
    (!requireAuthentication || isAuthenticated) ?
      (
        <NavigationContainer ref={navigationRef}>
          <MyStack />
        </NavigationContainer>
      ) :
      (
        <Authentication />
      )
  );
}

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FullApp />
      </PersistGate>
    </Provider>
  );

}