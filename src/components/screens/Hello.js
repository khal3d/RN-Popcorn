import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Hello = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello, world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
  },
  hello: {
    color: '#FFFFFF',
  },
});

export default Hello;
