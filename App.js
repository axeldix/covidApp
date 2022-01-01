import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './src/screens/LogIn';
import {createStackNavigator} from '@react-navigation/stack';
import CountryList from './src/screens/CountryList';
import ConfirmedCases from './src/screens/ConfirmedCases';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CountryList">
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="CountryList" component={CountryList} />
        <Stack.Screen name="ConfirmedCases" component={ConfirmedCases} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
