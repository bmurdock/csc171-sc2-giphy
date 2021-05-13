import { StatusBar } from 'expo-status-bar';
import React from 'react';

const apiKey = 'jHgFW7l3t14wto1THQuUEd9TGMTH2BWZ';
let apiRoute = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`

// These are the prebuilt components we are getting
// from react native
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

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
    }
  }

  componentDidMount()
  {
    fetch(`${apiRoute}&q=coding`)
    .then((response) =>
    {
      return response.json();
    })
    .then(({data}) =>
    {
      console.log(data);
      const obj = data[0];

      this.setState({
        uri: obj.images.fixed_width.url,
        imgStyle: {
          width: 200,
          height: 200,
        },
      });
    })
    .catch((err) =>
    {
      console.log("What an amateur: ", err);
    })
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Image
          style={this.state.imgStyle}
          source={{uri: this.state.uri}}
        />
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
  person: {
    borderWidth: 1,

  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
