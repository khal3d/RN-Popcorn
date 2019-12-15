import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Rating from './Rating';

const MoviePosterList = ({item, navigation}) => (
  <View style={styles.item}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        return navigation.navigate('MovieDetails', item);
      }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
            item.poster_path
          }`,
        }}
        style={styles.poster}
      />
      <Rating value={item.vote_average} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 300,
  },
  poster: {
    height: 300,
  },
});

export default MoviePosterList;
