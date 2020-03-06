import React, { Component } from 'react';
import { ScrollView, Text, View, Image, Button } from 'react-native';
import Post from './Post';

export default class ScrollFeed extends Component {
    render() {
      return (
        <ScrollView>

            <Button title="asd" onPress={() => this.props.navigation.navigate("Register")}></Button>


            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
      </ScrollView>
      );
    }
  }



//   <ScrollView>
//         <Text style={{fontSize:96}}>Scroll me plz</Text>
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Text style={{fontSize:96}}>If you like</Text>
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Text style={{fontSize:96}}>Scrolling down</Text>
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Text style={{fontSize:96}}>What's the best</Text>
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Text style={{fontSize:96}}>Framework around?</Text>
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png", width: 64, height: 64}} />
//         <Text style={{fontSize:80}}>React Native</Text>
//       </ScrollView>