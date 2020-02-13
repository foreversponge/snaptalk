import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class ProfilePicture extends Component {
  render() {
    return (
        <Avatar
          rounded
          size = "large"
          source={{
            uri:
              'https://pbs.twimg.com/media/CKxnJzsWwAAcmym.png',
          }}
          onPress={() => Alert.alert('PROFILE PIC pressed')}
        />
    );
  }
}