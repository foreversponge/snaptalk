import React, { Component } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PostButton extends Component {

  state = {
    photo: null
  };

  chooseImageGallery = () => {
    const options = {
      title: 'Post Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
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
      }
    });
  };

  render() {
    const {photo} = this.state;

    return (
      <View>
        <View style={styles.images}>
          {photo && <Image source={{uri: photo.uri}} style={styles.images}/>}
        </View>
        <View style={styles.button}>
          <Button
            title="POST"
            type="outline"
            onPress={this.chooseImageGallery}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
  },
  images: {
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 300,
  }
});
