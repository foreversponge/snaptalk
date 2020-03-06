import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class CommentBox extends Component {    
    
    render() {
      return (
        <View style={{flex: 1, alignItems: 'flex-start', padding: 20}}>
            <Image source={{uri: this.props.uri, width: 64, height: 64}} />
            <Text title="userName">Commenter's name: {this.props.name}</Text>
            <Text title="commentText">Comment: {this.props.message}</Text>
            <Text title="commentDate">Date posted: {this.props.date}</Text>
        </View>
      );
    }
  }