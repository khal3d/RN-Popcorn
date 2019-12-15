import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import MoviesScreen from './components/screens/MoviesScreen';
import BookmarkScreen from './components/screens/BookmarkScreen';
import MovieDetails from './components/screens/MovieDetails';
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const TabNavigator = createBottomTabNavigator(
  {
    MoviesScreen,
    BookmarkScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const StackNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  MovieDetails: {
    screen: MovieDetails,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTintColor: '#fff',
    },
  },
});

const AppContainer = createAppContainer(StackNavigator);
