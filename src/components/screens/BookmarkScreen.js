import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class BookmarkScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddMovie')}
          title="Add"
          type="clear"
          titleStyle={styles.headerAddButton}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      MyMovies: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadMyMovies();
  }

  loadMyMovies = async () => {
    AsyncStorage.getItem('@MyMovies:list').then(data =>
      this.setState({MyMovies: JSON.parse(data)}),
    );
  };

  renderItem = ({item}) => (
    <ListItem
      title={item.title}
      subtitle={item.overview}
      leftAvatar={{source: {uri: item.poster}}}
    />
  );

  emptyList = () => (
    <View style={styles.emptyList}>
      <Text style={{fontWeight: 'bold', marginBottom: 10}}>
        There's nothing to show here!
      </Text>
      <Text>Add Movies to your library first...</Text>
    </View>
  );

  render() {
    return (
      <SafeAreaView>
        <View>
          <FlatList
            data={this.state.MyMovies}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.emptyList}
            onRefresh={this.loadMyMovies}
            refreshing={this.state.refreshing}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  emptyList: {
    alignItems: 'center',
  },
  headerAddButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
