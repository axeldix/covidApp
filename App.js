import 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './src/screens/logIn';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, FlatList, Button, TouchableOpacity} from 'react-native';
// import {list, shortList} from './list';
import styled from 'styled-components';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const ConfirmedCases = ({route}) => {
  const {country} = route.params;
  console.log(country)
  return (
    <View>
      {country ? (
        <Text>`ConfirmedCases Screen {country.Country}`</Text>
      ) : (
        <Text>`ConfirmedCases Screen`</Text>
      )}
    </View>
  );
};

const CountryList = ({navigation}) => {
  const [list, setList] = useState(false);

  const getList = useCallback(() => {
    return fetch('https://api.covid19api.com/countries')
      .then(res => {
        return res.json();
      })
      .then(json => {
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

  const pressed = country => {
    console.log('pressed', country);
    return navigation.navigate('ConfirmedCases', {country});
  };

  return (
    <View>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <Row>
            <Title onPress={() => pressed(item)}>{item.Country}</Title>
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
