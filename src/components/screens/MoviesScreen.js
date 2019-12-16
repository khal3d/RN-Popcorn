import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {MOVIEDB_API_KEY} from 'react-native-dotenv';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviePosterList from '../MoviePosterList';

export default class MoviesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
    };
  }

  static navigationOptions = {
    tabBarLabel: 'All Movies',
    tabBarIcon: ({tintColor}) => (
      <Ionicons name={'ios-film'} size={25} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const page = this.state.page;
    const url = `http://api.themoviedb.org/3/discover/movie?api_key=${MOVIEDB_API_KEY}&page=${page}`;
    this.setState({loading: true});

    console.log(`Load Page #${page}`);
    console.log(`${url}`);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.status_message || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
        console.log('Error');
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = ({item}) => (
    <MoviePosterList item={item} navigation={this.props.navigation} />
  );

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text>{this.state.error}</Text>
        </View>
      );
    }

    return (
      <View>
        <StatusBar backgroundColor="tomato" barStyle="light-content" />
        <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
          bounces={false}
        />
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
