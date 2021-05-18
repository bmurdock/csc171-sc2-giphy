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
      globalProperty: 'https://www.google.com',
    };
  }

  setGlobalProperty = (myValue) => 
  {
    // in the absense of strongly typed language
    // we can verify that myValue is the correct
    // data type before we set it

    if (typeof myValue !== 'string') {
      return "You are a bad person.";
    }
      this.setState({
        globalProperty: myValue,
      });
  }

  // download links to several images
  // based on the current search query (stored in this.state.query);
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
  // when the user enters text
  // set this.state.query to that text
  // then we probably call the getGifs function again
  // which will
  // download links to several images
  // based on the current search query (stored in this.state.query);
  onSearchText = (text) =>
  {
    this.setState({
      query: text,
    }, () => {{
      this.getGifs()
      .then(() =>
      {
        console.log('we got the gifs');
        this.makePicture();
      })
    }})
  }

  makePicture = () =>
  {
    const oneGif = this.state.options[getRando(0, this.state.options.length)];
    console.log('oneGif: ', oneGif);
    const {url, height, width} = oneGif.images.original;
    this.setState({
      uri: url,
      imgStyle: {
        width: Number(width),
        height: Number(height),
      },
    })
  }

  // this function is only for stuff
  // that you want to do the first time
  // the component loads
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
        <MyComponent />
        <StatusBar style="auto" />
      </View>
    );
  }
}

function MyComponent(props) {
  const yourOwnFunction = () => {
    fetch(`https://www.google.com`)
    .then(() =>{})
    .then((data) => {{
      props.pressyThing(data);
    }})
  }
  return (
    <View>
      <Image
        src={{uri: props.uri}}
      />
      <Button 
      label="Press Me" 
      onPress={yourOwnFunction} 
      />
  </View>

  )
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
