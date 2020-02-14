import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class FollowButton extends Component {
  render() {
    let picFollow = {
            uri:'https://i.imgur.com/ungJhD2.png'
    };
    return (
        <Image
            source={picFollow} style={{width: 300, height: 110}}
            onPress={() => Alert.alert('POST button pressed')}
        />
    );
  }
}

