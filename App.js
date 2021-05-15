import { StatusBar } from 'expo-status-bar';
import React from 'react';

const apiKey = 'jHgFW7l3t14wto1THQuUEd9TGMTH2BWZ';
let apiRoute = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`

// These are the prebuilt components we are getting
// from react native
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight } from 'react-native';

const animals = ['cat', 'fish', 'dog', 'horse', 'emu', 'pig'];
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
      whatever: 'Some String',
    };
  }

  changeWhatever = () =>
  {
    this.setState({
      whatever: "Something New",
    });
  }
  // method accepts a number which
  // represents width and height of our
  // square image
  imageSize = (dim) =>
  {
    console.log('resizing to: ', dim);
    this.setState({
      imgStyle: {
        width: dim,
        height: dim,
      },
    });
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
        <Test
          label="Test 1"
          resize={this.imageSize}
          imgStyle={this.state.imgStyle}
          whatever={this.state.whatever}
        />
                <Test
          label="Test 2"
          resize={this.imageSize}
          imgStyle={this.state.imgStyle}
          changeWhatever={this.changeWhatever}
        />
                <Test
          label="Test 3"
          resize={this.imageSize}
          imgStyle={this.state.imgStyle}
        />
                <Test
          label="Not Test 4...."
          resize={this.imageSize}
          imgStyle={this.state.imgStyle}
        />
        <StatusBar style="auto" />
      </View>

    );
  }
}

const Test = (props) =>
{

  // create a state value called animal
  // have a function called setAnimal that changes the value of animal
  // the initial value of animal is the first element of my global
  // animals array
  const [animal, setAnimal] = React.useState(animals[0]);

  const refresh = () =>
  {
    // i want to set animal to a random animal from my 
    // global animals array
    setAnimal(animals[getRando(0, animals.length -1)]);
    console.log(typeof props.whatever);
    if (typeof props.changeWhatever !== 'undefined')
    {
      props.changeWhatever();
    }

  }

  console.log('image style: ', props.imgStyle);
  return (
    <View>
      <Text>{props.label}</Text>
      <Text>Animal: {animal}</Text>
      <Text>{props.whatever}</Text>
      <MyButton label="Press Me" onPress={refresh} />
    </View>
  )
}

const MyButton = (props) =>
{
  return(
    <TouchableHighlight 
      style={styles.myButton}
      onPress={props.onPress}
    >
      <Text>{props.label}</Text>
    </TouchableHighlight>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myButton: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  person: {
    borderWidth: 1,

  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  small: {
    width: 60,
    height: 60,
  },
  medium: {
    width: 150,
    height: 150,
  },
});
