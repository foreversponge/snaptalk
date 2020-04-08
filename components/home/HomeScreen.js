import React from 'react';
import { Text, View, FlatList } from 'react-native';
import PostController from '../firebase/PostController';
import Post from '../post/Post';
import Firebase from 'firebase';
import styles from '../home/style/HomeScreenStyle';

export default class HomeScreen extends React.Component {

  state = {
    posts: [],
    isLoading: false,
    isProfileModalVisible: false,
    isDiscoveryTab: this.props.isDiscoveryTab
  };

  componentDidMount() {
    if (this.state.isDiscoveryTab) {
      this.getDiscoveryData
    }
    else {
      this.getHomeData;
    }
  };

  //get the data for the home screen
  getHomeData = async () => {
    const post = await Firebase
      .firestore()
      .collection('users')
      .doc(Firebase.auth().currentUser.uid)
      .get();
    const fieldPathListOfFollowing = new Firebase.firestore.FieldPath(
      'listOfFollowing',
    );
    const arrayOfFollowing = await post.get(fieldPathListOfFollowing);
    this.setState({ posts: [] })
    this.setState({ isLoading: true });
    PostController.shared.firestore
      .collection('posts')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (arrayOfFollowing.includes(doc.data().uid)) {
            this.state.posts.push(doc.data());
          }
        });
        this.state.posts.sort(function (a, b) {
          return parseInt(b.timestamp) - parseInt(a.timestamp);
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  //get the data from the discovery screen
  getDiscoveryData = () => {
    this.setState({ isLoading: true })
    this.setState({ posts: [] })
    this.unsubscribe = PostController.shared.firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        //Fetching posts from database
        snapshot.forEach(doc => {
          this.state.posts.push(doc.data())
        })
        this.setState({ posts: this.state.posts.sort(function (a, b) { return (parseInt(b.timestamp) - parseInt(a.timestamp)) }) })
      }).finally(() => this.setState({ isLoading: false }))
  }

  renderPost = post => {
    return (
      <Post post={post} profilePagePost={false} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.state.isDiscoveryTab ? <Text style={styles.headerTitle}> Discovery </Text> : <Text style={styles.headerTitle}> Home </Text>}
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isLoading}
          onRefresh={this.state.isDiscoveryTab ? this.getDiscoveryData : this.getHomeData}
        />
      </View>
    );
  }
}
