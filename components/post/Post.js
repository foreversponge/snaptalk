import React, { Component } from 'react';
import Fire from '../firebase/Fire';
import { Text, View, Image, StyleSheet } from 'react-native';
require("firebase/firestore");
import moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';
import CommentList from '../comment/CommentList';
import OtherUserProfile from '../profile/OtherUserProfile';
import firebase from 'firebase';

export default class Post extends Component {

  state = {
    post: this.props.post,
    likeIconName: "ios-heart-empty",
    numOfLikes: 0,
    profilePagePost: this.props.profilePagePost
  }

  componentDidMount() {
    this.updateLikeIcon(this.state.post.postKey);
  }

  updateLikeIcon = async (postId) => {
    //Getting post from database
    const post = await firebase.firestore().collection("posts").doc(postId).get();

    //Creating pointer to the list of likes fields in the database
    const fieldPathListOfLikes = new firebase.firestore.FieldPath('listOfLikes');

    //Getting the array of likes
    const arrayOfLikes = await post.get(fieldPathListOfLikes)

    if (arrayOfLikes.includes(firebase.auth().currentUser.uid)) {
      this.setState({ likeIconName: "ios-heart" });
      this.setState(prevState => {
        return { numOfLikes: arrayOfLikes.length }
      })
    }
    else {
      this.setState({ likeIconName: "ios-heart-empty" })
      this.setState(prevState => {
        return { numOfLikes: arrayOfLikes.length }
      })
    }
  }

  render() {
    return (
      <View style={styles.feedItem}>
        <Image source={this.state.post.avatar ? { uri: this.state.post.avatar } : require('../../assets/tempAvatar.jpg')} style={styles.avatar} />
        <View style={styles.container}>
          <View style={styles.postHeader}>
            <View >
              {
                this.state.profilePagePost ? 
                (<Text style={styles.name}>{JSON.stringify(this.state.post.username).replace(/\"/g, '')}</Text>) : 
                (<OtherUserProfile postUserId={this.state.post.uid} username={(JSON.stringify(this.state.post.username)).replace(/\"/g, "")}/>)
              }
              <Text style={styles.timestamp}> {moment(this.state.post.timestamp).fromNow()} </Text>
            </View>
          </View>
          <Text style={styles.post}>{this.state.post.text}</Text>
          <Image source={{ uri: this.state.post.image }} style={styles.postImage} resizeMode="cover" />
          <View style={styles.postFooter}>
            <View>
              <Icon name={this.state.likeIconName} size={24} onPress={async () => {
                await Fire.shared.updateUserLikedList(this.state.post.postKey);
                this.updateLikeIcon(this.state.post.postKey);
              }
              }
                color="#73788B" style={styles.likeIcon} />
              <Text> {this.state.numOfLikes} </Text>
            </View>
            <CommentList name="comment-list" postKey={this.state.post.postKey}></CommentList>
          </View>
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  postHeader:
  {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  postFooter:
  {
    flexDirection: "row"
  },
  likeIcon:
  {
    marginRight: 16
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 1,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});