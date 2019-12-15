import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BookmarkScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Movies',
    tabBarIcon: ({tintColor}) => (
      <Ionicons name={'ios-bookmark'} size={25} color={tintColor} />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>
          There's nothing to show here!
        </Text>
        <Text>Add Movies to your bookmark first...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
