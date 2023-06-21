import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Button} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {icons} from '../theme/icons';
export default function HomeScreen(props) {
  const [data, setData] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState('');
  const [pressedID, setPressedId] = useState('');
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.extrazone.com/tags/list', {
        headers: {
          ' X-Country-Id': 'TR',
          'X-Language-Id ': 'TR',
        },
      });
      setData(response.data);
      getPromotion(response.data[0].Id);
      setPressedId(response.data[0].Id);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      alert('Markaları alırken hata.');
    }
  };

  const getPromotion = async id => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.extrazone.com/promotions/list?Channel=${id}`,
        {
          headers: {
            ' X-Country-Id': 'TR',
            'X-Language-Id ': 'TR',
          },
        },
      );
      setPromotion(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      alert('Kampanyaları alırken hata.');
    }
  };
  const renderItem = (item, index) => {
    return (
      <Pressable
        onPress={() => {
          setPressedId(item.Id), getPromotion(item.Id);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          marginHorizontal: 5,
          borderRadius: 8,
          padding: 6,
          borderColor: pressedID === item.Id ? 'red' : '#ECEEEF',
        }}>
        <Image
          style={{borderRadius: 10, height: 30, width: 30}}
          source={{uri: item.IconUrl}}
        />
        <Text style={{marginLeft: 5}}>{item.Name} </Text>
      </Pressable>

      // <Button
      //   style={{marginHorizontal: 5}}
      //   icon={({size, color}) => (
      //     <Image
      //       source={{uri: item.IconUrl}}
      //       style={{width: size, height: size, tintColor: color}}
      //     />
      //   )}
      //   mode="contained">
      //   {item.Name}
      // </Button>
    );
  };
  const {width, height} = useWindowDimensions();
  const renderPromotion = (item, id) => {
    console.log(props, 'item');

    return (
      <Pressable
        onPress={() => props.navigation.navigate('DetailScreen', {id: item.Id})}
        style={{
          marginHorizontal: 10,
          marginTop: 30,
          height: 460,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 15,
        }}>
        <View style={{borderRadius: 10, padding: 5}}>
          <View>
            <Image
              style={{
                borderBottomLeftRadius: 95,
                height: 345,
                width: 360,
                borderRadius: 25,
              }}
              source={{uri: item.ImageUrl}}
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
              source={{uri: item.BrandIconUrl}}
            />
          </View>

          <RenderHTML
            enableExperimentalBRCollapsing={false}
            defaultTextProps={{numberOfLines: 2}}
            baseStyle={{
              fontWeight: '600',
              textAlign: 'center',
              marginHorizontal: 30,
              fontSize: 15,
              height: 70,
              width: 280,
            }}
            contentWidth={10}
            source={{html: item?.Title}}></RenderHTML>
          <Pressable
            onPress={() =>
              props.navigation.navigate('DetailScreen', {id: item.Id})
            }
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: item.PromotionCardColor}}>
              Daha Daha
            </Text>
          </Pressable>
        </View>
        {/* <View
          style={{
            height: 40,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
            backgroundColor: 'red',
            transform: [{skewY: '4deg'}],
          }}></View> */}

        {/* <View
          style={{
            backgroundColor: 'red',
            borderRadius: 10,
            height: 274,
            // transform: [{skewY: '2deg'}],
          }}>
          <View
            style={{
              transform: [{skewY: '0deg'}],
            }}>
            <Image
              style={{height: 280, width: 350}}
              source={{uri: item.ImageUrl}}
            />
            <RenderHTML
              contentWidth={width}
              source={{html: item?.Title}}></RenderHTML>
          </View>
          <View
            style={{
              backgroundColor: 'red',
              transform: [{skewY: '2deg'}],
            }}></View>
        </View> */}
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Modal visible={loading}> */}

      {loading === true ? (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            flex: 1,
            position: 'absolute',
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}>
          <ActivityIndicator color={'red'} size={50} />
        </View>
      ) : null}

      {/* </Modal> */}
      {/* <ActivityIndicator
            style={{ position: "absolute" }}
            color={"red"}
            size={328}
          />
  
      {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {loading === true ? (
          // <View style={{justifyContent: 'center', alignItems: 'center'}}>
          //   <ActivityIndicator
          //     color={'red'}
          //     style={{zIndex: -999}}></ActivityIndicator>
          // </View>


          <View
            style={{
              flex: 1,
              width: width,
              height: height,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'red'} size={50} />
            {/* <ActivityIndicator
            style={{ position: "absolute" }}
            color={"red"}
            size={328}
          /> */}
      {/* </View>
        ) : null} */}
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
          keyExtractor={(item, index) => item.Id}
          horizontal={true}
        />
      </View>
      {promotion.length > 0 ? (
        <View>
          <View>
            <Carousel
              ref={isCarousel}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={index => setIndex(index)}
              data={promotion}
              renderItem={({item, index}) => {
                return renderPromotion(item, index);
              }}
              keyExtractor={(item, index) => item.Id}
              horizontal={true}
            />
          </View>
          <Pagination
            dotsLength={promotion.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 30,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'red',
            }}
            tappableDots={true}
            inactiveDotStyle={{
              backgroundColor: 'black',
              width: 10,
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image source={icons.campaignIcon} />
          <Text
            numberOfLines={2}
            style={{fontWeight: '700', width: 350, textAlign: 'center'}}>
            Seçtiğiniz kategoride kampanya bulunmamaktadır. Farklı kategori
            deneyiniz.{' '}
          </Text>
        </View>
      )}
    </View>
  );
}
