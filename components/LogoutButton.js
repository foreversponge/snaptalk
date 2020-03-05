import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class LogoutButton extends Component {

    handleLogout = () => {

            firebase
                .auth()
                .signOut()
                .then(function() {
                    console.log('User Logged Out!');
                })
                .catch(function(error)
                {
                console.log(error);
                });
        }

  render() {

  return(
        <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
            <Text style={{color:"#FFF", fontWeight: "500"}}>Logout </Text>
        </TouchableOpacity>
    )};
}


const styles = StyleSheet.create(
    {
        button:
        {
            marginHorizontal: 30,
            borderRadius: 4,
            height: 52,
            alignItems: "center",
            justifyContent: "center"
        }
    }) 