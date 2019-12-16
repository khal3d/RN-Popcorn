import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BookmarkScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddMovie')}
          title="Add"
          color="#fff"
        />
      ),
    };
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
