import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesScreen from './components/screens/MoviesScreen';
import BookmarkScreen from './components/screens/BookmarkScreen';
import AddMovieScreen from './components/screens/AddMovieScreen';
import MovieDetails from './components/screens/MovieDetails';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const HomeStack = createStackNavigator({
  MoviesList: {
    screen: MoviesScreen,
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
  }
}, {
  navigationOptions: {
    tabBarLabel: 'All Movies',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name={'ios-film'} size={25} color={tintColor} />
    ),
  },
});

const MyMoviesStack = createStackNavigator(
  {
    Bookmark: {
      screen: BookmarkScreen,
      navigationOptions: {
        title: 'My Movies',
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerTintColor: '#fff',
      },
    },
    AddMovie: {
      screen: AddMovieScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerTintColor: '#fff',
      },
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'My Movies',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={'ios-videocam'} size={25} color={tintColor} />
      ),
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    MyMoviesStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);