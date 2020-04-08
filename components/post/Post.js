import React, { Component } from 'react';
import PostController from '../firebase/PostController';
import { Text, View, Image } from 'react-native';
require("firebase/firestore");
import Moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';
import CommentList from '../comment/CommentList';
import OtherUserProfile from '../profile/OtherUserProfile';
import Firebase from 'firebase';
import Styles from '../post/style/PostStyle';

export default class Post extends Component {

  state = {
    post: this.props.post,
    likeIconName: "ios-heart-empty",
    numOfLikes: 0,
    profilePagePost: this.props.profilePagePost,
    nbOfComments: this.props.post.nbOfComments
  }

  componentDidMount() {
    this.updateLikeIcon(this.state.post.postKey);
  }

  updateLikeIcon = async (postId) => {
    //Getting post from database
    const post = await Firebase.firestore().collection("posts").doc(postId).get();

    //Creating pointer to the list of likes fields in the database
    const fieldPathListOfLikes = new Firebase.firestore.FieldPath('listOfLikes');

    //Getting the array of likes
    const arrayOfLikes = await post.get(fieldPathListOfLikes)

    if (arrayOfLikes.includes(Firebase.auth().currentUser.uid)) {
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
      <View style={Styles.feedItem}>
        <Image source={this.state.post.avatar ? { uri: this.state.post.avatar } : require('../../assets/tempAvatar.jpg')} style={Styles.avatar} />
        <View style={Styles.container}>
          <View style={Styles.postHeader}>
            <View >
              {
                this.state.profilePagePost ?
                  (<Text style={Styles.name}>{JSON.stringify(this.state.post.username).replace(/\"/g, '')}</Text>) :
                  (<OtherUserProfile postUserId={this.state.post.uid} username={(JSON.stringify(this.state.post.username)).replace(/\"/g, "")} />)
              }
              <Text style={Styles.timestamp}> {Moment(this.state.post.timestamp).fromNow()} </Text>
            </View>
          </View>
          <Text style={Styles.post}>{this.state.post.text}</Text>
          <Image source={{ uri: this.state.post.image }} style={Styles.postImage} resizeMode="cover" />
          <View style={Styles.postFooter}>
            <View>
              <Icon name={this.state.likeIconName} size={24} onPress={async () => {
                await PostController.shared.updateUserLikedList(this.state.post.postKey);
                this.updateLikeIcon(this.state.post.postKey);
              }
              }
                color="#73788B" style={Styles.likeIcon} />
              <Text> {this.state.numOfLikes} </Text>
            </View>
            <CommentList name="comment-list" postKey={this.state.post.postKey} postUserId={this.state.post.uid} nbOfComments={this.state.nbOfComments}></CommentList>
          </View>
        </View>
      </View>
    )
  };
};