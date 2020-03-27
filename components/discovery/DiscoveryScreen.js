import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Fire from '../firebase/Fire';
import _ from "underscore";
import Post from '../post/Post';

export default class HomeScreen extends React.Component {

  state = {
    posts: [],
    isLoading: false,
    isProfileModalVisible: false,
    postInArray: false,
    result: ''
  };

  componentDidMount() {
    this.getData
  };

  getData = () => {
    this.setState({ isLoading: true })
    this.setState({posts:[]})
    this.unsubscribe = Fire.shared.firestore
      .collection("posts")
      .get()
      .then(snapshot => {

        snapshot.forEach(doc => {
            this.state.posts.push(doc.data())
        })
        this.setState({ posts: this.state.posts.sort(function (a, b) { return (parseInt(b.timestamp) - parseInt(a.timestamp)) })})
      }).finally(() => this.setState({ isLoading: false }))
  }

  renderPost = post => {
    return (
       <Post post={post} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"

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

