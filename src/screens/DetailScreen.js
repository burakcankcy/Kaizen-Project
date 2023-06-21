import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

export default function DetailScreen(props) {
  const {id} = props.route.params;
  console.log(id, 'da');
  const [data, setData] = useState([]);
  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    try {
      const response = await axios.get(
        `https://api.extrazone.com/promotions?Id=${id}`,
        {
          headers: {
            ' X-Country-Id': 'TR',
            'X-Language-Id ': 'TR',
          },
        },
      );
      setData(response.data);
    } catch (error) {
      alert('Detaylar alırken hata.');
    }
  };
  console.log(data);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Image
            style={{borderBottomLeftRadius: 95, height: 300, width: '100%'}}
            source={{uri: data.ImageUrl}}
          />
          <Image
            style={{
              position: 'absolute',
              height: 70,
              width: 70,
              bottom: -5,
              borderWidth: 4,
              borderColor: 'white',
              borderRadius: 35,
              left: 5,
            }}
            source={{uri: data.BrandIconUrl}}
          />
        </View>

        <RenderHTML
          enableExperimentalBRCollapsing={false}
          baseStyle={{
            fontWeight: '700',
            textAlign: 'left',
            marginLeft: 30,
            fontSize: 24,
          }}
          contentWidth={10}
          source={{html: data?.Title}}></RenderHTML>
        <RenderHTML
          enableExperimentalBRCollapsing={false}
          baseStyle={{
            fontWeight: '400',
            textAlign: 'left',
            marginLeft: 30,
            width: '90%',
            fontSize: 14,
          }}
          contentWidth={10}
          source={{html: data?.Description}}></RenderHTML>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button
          style={{
            bottom: 20,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '85%',
          }}
          buttonColor="red"
          mode="contained">
          Hemen Katıl
        </Button>
      </View>
    </View>
  );
}
