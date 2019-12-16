import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {Button, Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AddMovieScreen extends Component {
  static navigationOptions = {
    title: 'Add a Movie',
  };

  constructor(props) {
    super(props);

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

    this.state = {
      movieTitle: '',
      movie: {
        title: 'The Movie Title',
        overview: 'An over view about the movie and the cast.',
        poster: null,
      },
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          movie: {
            ...this.state.movie,
            poster: 'data:image/jpeg;base64,' + response.data,
          },
        });
      }
    });
  }

  saveMovie = async () => {
    try {
      const MyMoviesData = await AsyncStorage.getItem('@MyMovies:list');
      const MyMovies =
        MyMoviesData !== null
          ? [...JSON.parse(MyMoviesData), ...[this.state.movie]]
          : [this.state.movie];
      await AsyncStorage.setItem('@MyMovies:list', JSON.stringify(MyMovies));
      await AsyncStorage.setItem(
        '@MyMovies:list',
        JSON.stringify([this.state.movie]),
      );

      this.setState(prevState => {
        return {MyMovies: MyMovies};
      });

      this.props.navigation.goBack();
    } catch (error) {
      // Error retrieving data
      console.log('Something went wrong while saving the movie!');
    }
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.widget}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.posterBlock}
                onPress={this.selectPhotoTapped.bind(this)}>
                {this.state.movie.poster === null ? (
                  <>
                    <Ionicons name={'ios-image'} size={100} color="#AAA" />
                    <Text style={{ color: '#A0B0A0' }}>Click to add a Poster</Text>
                  </>
                ) : (
                  <Image
                    style={styles.poster}
                    source={{uri: this.state.movie.poster}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Input
              label="Title"
              placeholder="Movie Title"
              value={this.state.movie.title}
              onChange={event =>
                this.setState({
                  movie: {...this.state.movie, title: event.nativeEvent.text},
                })
              }
              returnKeyType={'next'}
              onSubmitEditing={() => this.secondInput.focus()}
              containerStyle={styles.widget}
            />
            <Input
              label="Overview"
              placeholder="Overview about the movie"
              value={this.state.movie.overview}
              multiline={true}
              onChange={event =>
                this.setState({
                  movie: {
                    ...this.state.movie,
                    overview: event.nativeEvent.text,
                  },
                })
              }
              ref={ref => {
                this.secondInput = ref;
              }}
              containerStyle={styles.widget}
            />
            <Button
              onPress={() => this.saveMovie()}
              title="Add The Movie"
              buttonStyle={styles.saveButton}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  posterBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    backgroundColor: '#ddd',
  },
  poster: {
    height: 400,
    width: '100%',
  },
  widget: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'tomato',
  },
});
