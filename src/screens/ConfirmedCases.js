import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Row, Title} from './styles';

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

export default ConfirmedCases;
