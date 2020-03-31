import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import styles from '../authentication/style/LoadingScreenStyle';

export default class LoadingScreen extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

}