import React, { Component } from 'react';
import { Alert, Button, View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {db} from './../config'; //this goes back to the parent directory for the import

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


export default class PostButton extends Component {
  state = {

    photo: null,
  };



  chooseImageGallery = () =>
{
    
    const options = {
        title: 'Post Picture',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        
        noData: true
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            this.setState({
                photo: response,
            });
            this.pushPostToDB(null,"123",null,"100","2");
        }
     });

     
};
  
  pushPostToDB = (commentList,datePosted,listOfLikes,nbOfLikes,userID) =>
  {
    db.ref('Posts/').push({
        commentList,
        datePosted,
        listOfLikes,
        nbOfLikes,
        userID,
    }).then((data) => {

      //success
      console.log('data ',data);

    }).catch((error) => {

      //error
      console.log('error ',error);
    });
  };

  render() {

//this.pushPostToDB(null,"123",null,"100","2")    

    const { photo } = this.state;

    return (

        <View>
            <View style={styles.images}>
                {photo && (
                <Image
                    source={{ uri: photo.uri }}
                    style={styles.images}
                />
                )}
            </View>
            <View style={styles.button}>
                <Button title="POST" type="outline" onPress={this.chooseImageGallery} />
                {/* <Button title="POST" type="outline" onPress={console.log("button pressed")} /> */}
            </View>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    button: {
        alignSelf:'stretch',
        paddingTop: 10
    },
    images: {
        alignItems: 'center',
        alignSelf:'stretch',
        height: 300,
    }
})