import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import moment from 'moment';

export default class CommentBox extends Component {
  render() {
    return (
      <View style={styles.profilePic}>
        <Image
          source={
            this.props.uri
              ? {uri: this.props.uri}
              : require('../assets/tempAvatar.jpg')
          }
          style={{width: 64, height: 64}}
        />
        <Text title="userName">Name: {this.props.name}</Text>
        <Text title="commentText">Comment: {this.props.comment}</Text>
        <Text title="commentDate">
          Posted: {moment(this.props.date).fromNow()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePic: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
});
