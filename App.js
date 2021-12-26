import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './src/screens/logIn';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import axios from 'react-native-axios';

const Stack = createStackNavigator();

const ConfirmedCases = () => {
  return <Text>"ConfirmedCases Screen"</Text>;
};

const CountryList = () => {
  //  const prettyJson = (value: any) => {
  //    return JSON.stringify(value, null, 2);
  //  };

  const getList = () => {
    return fetch('https://api.covid19api.com/countries')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        console.log('json', json);
        return json;
      })
      .catch(err => {
        console.log('getList', err);
      });
  };

  // const getMoviesFromApiAsync = async () => {
  //   try {
  //     const response = await fetch('https://api.covid19api.com/countries');
  //     console.log('response', response);
  //     const json = await response.json();
  //     return json.movies;
  //   } catch (error) {
  //     console.error('getMoviesFromApiAsync', error);
  //   }
  // };
  // const getList = () => {
  //   const url = 'https://api.covid19api.com/countries';
  //   axios
  //     .get(url)
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // };
  // const getList = () => {
  //   const authURL = 'https://www.google.com.ar';
  //   // const authURL = 'http://api.covid19api.com/countries';
  //   return fetch(authURL, {method: 'GET'})
  //     .then(
  //       response => {
  //         const statusCode = response.status;
  //         console.warn('status Code', statusCode);
  //         if (statusCode == 200) {
  //           //success code
  //         } else {
  //           //handle other error code
  //         }
  //       },
  //       err => {
  //         console.warn('error', err);
  //       },
  //     )
  //     .catch(error => {
  //       console.error(error);
  //       return error;
  //     });
  // };
  useEffect(() => {
    const result = getList();
    console.log('res', result);
  }, []);

  const list = [
    {title: 'titulo 1'},
    {title: 'titulo 2'},
    {title: 'titulo 3'},
    {title: 'titulo 1'},
    {title: 'titulo 2'},
    {title: 'titulo 3'},
  ];
  return (
    <View>
      {list.map(item => (
        <Text>{item.title}</Text>
      ))}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="CountryList" component={CountryList} />
        <Stack.Screen name="ConfirmedCases" component={ConfirmedCases} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
