import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import moment from "moment";
import styles from '../comment/style/CommentBoxStyle';

export default class CommentBox extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.comment}>
          <View style={styles.nameAndPicture}>
            <Image source={{ uri: this.props.uri }} style={styles.avatar} />
            <Text title="userName" style={styles.username}>{this.props.name}</Text>
          </View>
          <Text title="commentText" style={styles.commentText}>{this.props.comment}</Text>
          <Text title="commentDate" style={styles.timestamp}>{moment(this.props.date).fromNow()}</Text>
        </View>
      </View>
    );
  }
}