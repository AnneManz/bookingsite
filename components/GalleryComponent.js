import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

const IMAGES = {
  image1: require('./images/BabyFinn22.jpeg'),
  image2: require('./images/BGP_0504web.jpeg'),
  image3: require('./images/BGP_2239.jpeg'),
  image4: require('./images/BGP_2703.jpeg'),
  image5: require('./images/BGP_2804.jpeg'),
  image6: require('./images/C&A-4360.jpeg'),
  image7: require('./images/ceasar_senior_04.jpeg')
};

const Gallery = () => {

  const carouselRef= useRef();
  
  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  const [images, setImages] = useState([
    { id: '1', image: IMAGES.image1 },
    { id: '2', image: IMAGES.image2 },
    { id: '3', image: IMAGES.image3 },
    { id: '4', image: IMAGES.image4 },
    { id: '5', image: IMAGES.image5 },
    { id: '6', image: IMAGES.image6 },
    { id: '7', image: IMAGES.image7 }
  ]);

  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = indexSelected => {
      setIndexSelected(indexSelected);

      faltListRef?.current?.scrollToOffset({
          offset: indexSelected * THUMB_SIZE,
          animated: true
      });
  };

  const faltListRef = useRef();

  return (
    <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center' }}>
      <Text
        style={{
          color: 'white',
          fontSize: 32,
          marginTop: 50,
          marginBottom: 25
        }}
      >
        Custom Gallery
      </Text>
      {/* Carousel View */}
      <View style={{ flex: 1 /2, marginTop: 20}}>
          <Carousel
            ref={carouselRef}
            layout='default'
            data={images}
            sliderWidth={width}
            itemWidth={width}
            renderItem={({ itemWidth, index }) => (
                <Image
                    key={index}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='contain'
                    source={itemWidth.image}
                />
            )}
            onSnapToItem={index => onSelect(index)}
        />
        <View
            style={{
                marginTop: 20,
                paddingHorizontal: 32,
                alignSelf: 'fex-end'
            }}
        >
            <Text 
                style={{
                    color: 'white',
                    fontSize: 22
                }}
            >
                {indexSelected + 1}/{images.length}
            </Text>
        </View>
        <Pagination
            inactiveDotColor='gray'
            dotColor={'blue'}
            activeDotIndex={indexSelected}
            dotsLength={images.length}
            animatedDuration={150}
            inactiveDotScale={1}
        />
      </View>
      {/* Thumbnail component using FlatList */}
      <FlatList
        ref={faltListRef}
        horizontal={true}
        data={images}
        style={{ position: 'absolute', bottom: 80 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={item => item.id}
        renderItem={({ item, index}) => (
            <TouchableOpacity
                onPress={() => onTouchThumbnail(index)} 
                activeOpacity={0.9}
            >
                <Image 
                    style={{
                        width: THUMB_SIZE,
                        height: THUMB_SIZE,
                        marginRight: SPACING,
                        borderRadius: 16,
                        borderWidth: index === indexSelected ? 4 : 0.75,
                        borderColor: index === indexSelected ? 'orange' : 'white'
                    }}
                    source={item.image}
                />
            </TouchableOpacity>
        )}
    />
    </View>
  );
};

export default connect (mapStateToProps)(Gallery);