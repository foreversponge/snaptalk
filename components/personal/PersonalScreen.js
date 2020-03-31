import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Fire from '../firebase/Fire';
import Post from '../post/Post';
import firebase from 'firebase';
import styles from '../personal/style/PersonalScreenStyle';

export default class PersonalScreen extends React.Component {

  state = {
    posts: [],
    isLoading: false,
    isProfileModalVisible: false,
    postInArray: false,
    followingUser: false,
  };

  componentDidMount() {
    this.getData;
  }

  getData = async () => {
    const post = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get();
    const fieldPathListOfFollowing = new firebase.firestore.FieldPath(
      'listOfFollowing',
    );
    const arrayOfFollowing = await post.get(fieldPathListOfFollowing);
    console.log(arrayOfFollowing);
    this.setState({ isLoading: true });
    this.unsubscribe = Fire.shared.firestore
      .collection('posts')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ postInArray: false });
          this.state.posts.forEach(currentPost => {
            if (currentPost.postKey == doc.data().postKey) {
              this.setState({ postInArray: true });
            }

            if (arrayOfFollowing.includes(currentPost.uid)) {
              this.setState({ followingUser: true });
            }
          });
          if (!this.state.postInArray && this.state.followingUser) {
            this.state.posts.push(doc.data());
          }
        });
        this.state.posts.sort(function (a, b) {
          return parseInt(b.timestamp) - parseInt(a.timestamp);
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  renderPost = post => {
    return <Post post={post} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}> Home </Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isLoading}
          onRefresh={this.getData}
        />
      </View>
    );
  }
}