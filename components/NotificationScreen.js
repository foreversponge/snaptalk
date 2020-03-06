import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as firebase from "firebase";

export default function NotificationScreen() {


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Notifs </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  button: {
      alignSelf:'stretch',
      paddingTop: 10
  },
  images: {
      alignItems: 'center',
      alignSelf:'stretch',
      height: 300,
  }
})
