import { StatusBar } from 'expo-status-bar';
import React from 'react';
import DelayInput from './src/DelayInput'
// more comments

const apiKey = 'jHgFW7l3t14wto1THQuUEd9TGMTH2BWZ';
let apiRoute = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`

// These are the prebuilt components we are getting
// from react native
import { StyleSheet, View, Button, Image,  } from 'react-native';

const getRando = (lb, ub) =>
{
  return Math.floor(Math.random() * (ub + 1)) + lb;
}

export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
      imgStyle: {
        width: 50,
        height: 50,
      },
      options: [],
      query: 'coding',
      giphys: [],
    };
  }

  getGifs = async() =>
  {
    return await fetch(`${apiRoute}&q=${this.state.query}`)
    .then((response) =>
    {
      return response.json();
    })
    .then(({data}) =>
    {
      this.setState({
        options: data,
      });
    })
    .catch((err) =>
    {
      console.log("Could not fetch: ", err);
    });
  }
  onSearchText = (text) =>
  {
    this.getGifs()
    .then(() =>
    {
      console.log('we got the gifs');
      this.makePicture();
    })
  }

  makePicture = () =>
  {
    const num = this.state.options[getRando(0, this.state.options.length)];
    console.log('num: ', num);
    const {url, height, width} = num.images.original;
    this.setState({
      uri: url,
      imgStyle: {
        width: Number(width),
        height: Number(height),
      },
    })
  }

  componentDidMount()
  {
    this.getGifs()
    .then(() =>
    {
      this.makePicture();
    })
  }


  render()
  {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <DelayInput
            placeholder={this.state.query}
            onSearchText={this.onSearchText}
          />
        </View>

        <Image 
          style={this.state.imgStyle}
          source={{
            uri: this.state.uri,
          }}
        />
        <View style={styles.inputContainer}>
          <Button
            title="Refresh"
            onPress={this.makePicture}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 5,
  },
});
