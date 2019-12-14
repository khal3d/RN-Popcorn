import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesScreen from './src/components/screens/MoviesScreen';
import BookmarkScreen from './src/components/screens/BookmarkScreen';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const TabNavigator = createBottomTabNavigator(
  {
    Movies: MoviesScreen,
    Bookmark: BookmarkScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        if (routeName === 'Movies') {
          iconName = 'ios-film';
        } else if (routeName === 'Bookmark') {
          iconName = 'ios-bookmark';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);
