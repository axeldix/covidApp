import 'react-native-gesture-handler';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './src/screens/logIn';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, ScrollView, FlatList} from 'react-native';
import axios from 'react-native-axios';
import {TestResult} from '@jest/types';
// import {list, shortList} from './list';

const Stack = createStackNavigator();

const ConfirmedCases = () => {
  return <Text>"ConfirmedCases Screen"</Text>;
};

const CountryList = () => {
  const [list, setList] = useState(false);

  const getList = () => {
    return fetch('https://api.covid19api.com/countries')
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log('json', json);
        setList(json);
        return json;
      })
      .catch(err => {
        console.log('getList', err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View>
      {console.log('------list------', list)}
      <FlatList
        data={list}
        renderItem={({item}) => (
          <View>
            <Text>{item.Country}</Text>
          </View>
        )}
      />
      {/* <ScrollView>
        {list
          ? list.map((item, index) => (
              <View key={index}>
                <Text>{item.Country}</Text>
              </View>
            ))
          : (<View>asdasdad</View>)}
      </ScrollView> */}
    </View>
  );
};

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
