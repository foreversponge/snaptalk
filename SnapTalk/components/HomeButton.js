import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class HomeButton extends Component {
  render() {
    return (
       <Avatar
         size="large"
         rounded
         icon={{name: 'home', type: 'font-awesome'}}
         onPress={() => console.log("Works!")}
         activeOpacity={0.7}
         containerStyle={{flex: 5, marginRight: 60}}
       />
    );
  }
}