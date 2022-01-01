import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {Row, Title} from './styles';

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

  const pressed = country => navigation.navigate('ConfirmedCases', {country});

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

export default CountryList;
