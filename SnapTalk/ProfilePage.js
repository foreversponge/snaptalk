import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FollowButton from './FollowButton';
import PostButton from './PostButton';
import HomeButton from './HomeButton';
import ProfilePicture from './ProfilePicture';

export default class ProfilePage extends Component {
   render() {
     return (
        <>
            <View style = {containerStyle.container}>
                <ProfilePicture />
                <Text> Username </Text>
                <HomeButton />
            </View>
            <View style={{ width: "20%", margin: 10 }}>
                <PostButton style/>
            </View>
        </>
     );
   }
}

const containerStyle = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row'
  }
});

