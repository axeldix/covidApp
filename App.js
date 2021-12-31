// import 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './src/screens/logIn';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components';

const Stack = createStackNavigator();

const ConfirmedCases = ({route}) => {
  const [data, setData] = useState([]);
  const {country} = route.params;

  const url = `https://api.covid19api.com/total/dayone/country/${country.Slug}/status/confirmed`;

  useEffect(() => {
    const getData = () => {
      fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    };
    getData();
  }, [url]);

  const sort = field => {
    const list = [...data].sort(field => field <= 0);
    setData([...list]);
  };

  return (
    <View>
      {country ? (
        <View>
          <Text>{`ConfirmedCases Screen {country.Country}`}</Text>
          <Title onPress={() => sort('Cases')}>{'Sort Cases'}</Title>
          <Title onPress={() => sort('Date')}>{'Sort Date'}</Title>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Row>
                <Text>{`Date: ${item.Date}`}</Text>
                <Text>{`Cases: ${item.Cases}`}</Text>
              </Row>
            )}
          />
        </View>
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
