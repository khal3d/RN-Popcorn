import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Rating = ({value}) => {
  if (!value) {
    return null;
  }
  return (
    <View style={styles.ratingLabel}>
      <Ionicons name={'ios-star'} style={styles.starIcon} />
      <Text style={styles.starText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingLabel: {
    flexDirection: 'row',
    position: 'absolute',
    fontSize: 10,
    backgroundColor: 'tomato',
    opacity: 0.8,
    padding: 5,
    bottom: 0,
    minWidth: 40,
    justifyContent: 'center',
  },
  starIcon: {
    marginRight: 3,
    color: 'yellow',
  },
  starText: {
    color: 'yellow',
  },
});

export default Rating;
