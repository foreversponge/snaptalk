import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class FollowButton extends Component {
  render() {
    let picFollow = {
            uri:'https://i.imgur.com/ungJhD2.png'
    };
    return (
        <Image source={picFollow} style={{width: 300, height: 110}}/>
    );
  }
}
