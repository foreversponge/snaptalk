import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import ProfilePicture from './ProfilePicture';

export default class CommentBox extends Component {    
    
    render() {
      return (
        <View style={{flex: 1, alignItems: 'flex-start', padding: 20}}>
            <ProfilePicture />
            {/* <Image source={{uri: this.props.uri, width: 64, height: 64}} /> */}
            <Text title="userName">Name: {this.props.name}</Text>
            <Text title="commentText">Comment: {this.props.comment}</Text>
            <Text title="commentDate">Date posted: {this.props.date}</Text>
        </View>
      );
    }
  }