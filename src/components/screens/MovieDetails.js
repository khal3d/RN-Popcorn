import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Rating from '../Rating';

export default class BookmarkScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Movie Details'),
    };
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${navigation.getParam(
                  'poster_path',
                )}`,
              }}
              style={{height: 600, width: null}}
            />
            <Rating value={navigation.getParam('vote_average')} />
          </View>
          <Text style={styles.headline}>
            {navigation.getParam('original_title')}
            <Text style={styles.release_date}>
              {navigation.getParam('release_date')}
            </Text>
          </Text>
          <Text style={styles.content}>{navigation.getParam('overview')}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 24,
    marginTop: 10,
    padding: 10,
  },
  release_date: {
    fontSize: 13,
    color: '#A9A9A9',
  },
  content: {
    paddingBottom: 20,
    padding: 10,
  },
});
