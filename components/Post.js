import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Button } from 'native-base';
import GoToButton from './GoToButton';


// const Bla = () => {
//     const But = GoToButton("CommentList");

//     return But;
// }





export default class Post extends Component {

    // componentDidMount()
    // {
    //     firebase.auth().onAuthStateChanged(user =>
    //      {
    //          this.props.navigation.navigate(user ? "App" : "Auth");
    //      });
    // }

    

    render() {
      return (
    <View style={{flex: 1, alignItems: 'center', padding: 20}}>


        <Image source={{uri: "https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/dogs_1280p_0.jpg?itok=6jQzdNB8", width: 200, height: 200}} />

        <Text title="Post caption">Post caption</Text>
        
        <Button>

            <Text>See comments</Text>

        </Button>

    </View>
      );
    }
  }