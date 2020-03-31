import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Fire from '../firebase/Fire';
import Post from '../post/Post';
import styles from '../discovery/style/DiscoveryScreenStyle';

export default class HomeScreen extends React.Component {

  state = {
    posts: [],
    isLoading: false,
    isProfileModalVisible: false
  };

  componentDidMount() {
    this.getData
  };

  getData = () => {
    this.setState({ isLoading: true })
    this.setState({ posts: [] })
    this.unsubscribe = Fire.shared.firestore
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
          <Text style={styles.headerTitle}> Feed </Text>
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