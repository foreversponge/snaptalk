import React, { Component } from 'react';
import { Button } from 'react-native';
import * as firebase from 'firebase';

export default class LogoutButton extends Component {
  
  handleLogout = () => {
    firebase.auth().signOut();
  };

  render() {
    return <Button onPress={this.handleLogout} title="Logout" color="purple"/>;
  }

}
