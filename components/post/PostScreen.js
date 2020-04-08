import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid } from 'react-native';
import PostController from '../firebase/PostController';
import ImagePicker from 'react-native-image-picker';
import { encode, decode } from 'base-64';
import Styles from '../post/style/PostScreenStyle';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const firebase = require('firebase');
require('firebase/firestore');

export default class PostScreen extends React.Component {

  state = {
    text: '',
    image: null,
    likes: 0,
    user: {}
  };

  componentDidMount() {
    this.requestCameraRollPermission();

    const user = this.props.uid || PostController.shared.uid;

    //Gettimg users from the database
    this.unsubscribe = PostController.shared.firestore
      .collection('users')
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });
  }

  requestCameraRollPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'SnapTalk',
          message: 'SnapTalk needs access to your storage',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the external storage');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  handlePost = () => {
    PostController.shared
      .addPost({ text: this.state.text.trim(), localUri: this.state.image })
      .then(ref => {
        PostController.shared.addPostKey(ref.id);
        this.setState({ text: '', image: null });
        PostController.shared.updatePostList(ref.id);
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    ImagePicker.launchImageLibrary(
      { aspect: [4, 3], mediaType: 'photo' },
      response => {
        console.log('Response =', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };
          this.setState({
            image: response.uri,
          });
        }
      },
    );
  };

  render() {
    return (
      <SafeAreaView style={StyleSheet.container}>
        <View style={Styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={Styles.postButton}> Post </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.captionContainer}>
          <Image
            source={
              this.state.user.profilePicture
                ? { uri: this.state.user.profilePicture }
                : require('../../assets/tempAvatar.jpg')
            }
            style={Styles.profilePic}></Image>
          <TextInput
            autofocus={true}
            multiline={true}
            numberOfLines={4}
            style={Styles.textArea}
            placeholder="Write your caption..."
            maxLength={250}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}></TextInput>
        </View>
        <TouchableOpacity style={Styles.cameraIcon} onPress={this.pickImage}>
          <Icon name="ios-camera" size={30} />
        </TouchableOpacity>

        <View style={Styles.imageContainer}>
          <Image
            source={{ uri: this.state.image }}
            style={Styles.image}></Image>
        </View>
      </SafeAreaView>
    );
  }
}
