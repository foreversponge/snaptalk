import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Fire from './Fire';

export default class LogoutButton extends Component {

    handleLogout = () => {
            firebase
                .auth()
                .signOut()
        }

  render() {

  return(
        <Button 
            onPress={() => {Fire.shared.signOut}}
            title="Logout"
        />
    )};
};