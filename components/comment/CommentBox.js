import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import moment from "moment";

export default class CommentBox extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.uri }} style={styles.avatar} />
        <Text title="userName">Name: {this.props.name}</Text>
        <Text title="commentText">Comment: {this.props.comment}</Text>
        <Text title="commentDate">Posted: {moment(this.props.date).fromNow()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20
  },
  avatar:
  {
    width: 64,
    height: 64
  }
})
