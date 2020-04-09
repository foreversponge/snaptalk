import React, {Component} from 'react';
import {TouchableHighlight, Text} from 'react-native';
import firebase from 'firebase';
import styles from '../profile/style/FollowButtonStyle';
require('firebase/firestore');

export default class FollowButton extends Component {
  state = {
    followClick: false,
    isFollowing: false,
    user: {},
    targetUser: {},
    toFollowedUserId: {},
  };

  componentDidMount() {
    //Getting user from database
    this.unsubscribe = firebase
      .firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == this.props.loggedUserUID) {
            this.setState({user: doc.data()});
          }
          if (doc.data().uid == this.props.userToFollow) {
            this.setState({toFollowedUserId: doc.id});
            this.setState({targetUser: doc.data()});
          }
        });
      });

    this.unsubscribe = firebase
      .firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == this.props.loggedUserUID) {
            doc.data().listOfFollowing.forEach(followerName => {
              if (this.state.targetUser.uid == followerName) {
                this.setState({followClick: true});
                this.setState({isFollowing: true});
              }
            });
          }
        });
      });
  }

  followAction = () => {
    let followingRef = firebase
      .firestore()
      .collection('users')
      .doc(this.props.loggedUserUID);

    let followerRef = firebase
      .firestore()
      .collection('users')
      .doc(this.state.toFollowedUserId);

    if (this.state.followClick == false || this.state.isFollowing == false) {
      this.setState({
        followClick: !this.state.followClick,
        isFollowing: !this.state.isFollowing,
      });

      // add a new Following to the "listOfFollwing" array of the current user
      followingRef.update({
        listOfFollowing: firebase.firestore.FieldValue.arrayUnion(
          this.props.userToFollow,
        ),
      });

      // add a new Follower to the "listOfFollowing" array of the other user
      followerRef.update({
        listOfFollowers: firebase.firestore.FieldValue.arrayUnion(
          this.state.user.uid,
        ),
      });

      followerRef.update({
        listOfNotif: firebase.firestore.FieldValue.arrayUnion(
          this.state.user.name + ' is following you!',
        ),
      });
    }

    if (this.state.followClick == true || this.state.isFollowing == true) {
      this.setState({
        followClick: !this.state.followClick,
        isFollowing: !this.state.isFollowing,
      });

      followingRef.update({
        listOfFollowing: firebase.firestore.FieldValue.arrayRemove(
          this.props.userToFollow,
        ),
      });

      followerRef.update({
        listOfFollowers: firebase.firestore.FieldValue.arrayRemove(
          this.state.user.uid,
        ),
      });
    }
  };

  render() {
    const buttonColor = this.state.followClick ? '#68a0cf' : 'white';
    const followState = this.state.isFollowing ? 'Unfollow' : 'Follow';

    return (
      <TouchableHighlight
        style={[styles.followButton, {backgroundColor: buttonColor}]}
        onPress={this.followAction}>
        <Text style={styles.followText}>{followState}</Text>
      </TouchableHighlight>
    );
  }
}
