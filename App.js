import 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './src/screens/logIn';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, FlatList} from 'react-native';
// import {list, shortList} from './list';
import styled from 'styled-components';

const Stack = createStackNavigator();

const ConfirmedCases = () => {
  return <Text>"ConfirmedCases Screen"</Text>;
};

const CountryList = () => {
  const [list, setList] = useState(false);

  const getList = useCallback(() => {
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
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <View>
      {console.log('------list------', list)}
      <FlatList
        data={list}
        renderItem={({item}) => (
          <Row>
            <Title>{item.Country}</Title>
          </Row>
        )}
      />
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

const Row = styled.View`
  text-align: left;
  color: white;
  background-color: white;
  padding: 2px;
  margin: 1px;
  padding-left: 18px;
  height: 60px;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 26px;
`;

export default App;
