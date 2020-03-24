import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, SnapshotViewIOS } from 'react-native';
import Fire from './Fire';
import _ from "underscore";
import Post from './Post';

export default class HomeScreen extends React.Component{

  state = {
    posts:[],
    isLoading: false,
    postInArray: false,
    result: '',
  };

  componentDidMount(){
    this.getData
  };

  getData = () =>
  {
    this.setState({isLoading:true})
    this.unsubscribe = Fire.shared.firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        
        snapshot.forEach( doc => {
            this.setState({postInArray:false})
            this.state.posts.forEach(currentPost => {

              if (currentPost.postKey == doc.data().postKey) {
                this.setState({postInArray:true})
              }
            })

            if (!this.state.postInArray) {
              this.state.posts.push(doc.data())
            }
        })
      }).finally(()=> this.setState({isLoading:false}))
  }

  renderPost = post => {
    return(
      <Post post = {post}/>
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
            renderItem={({item}) => this.renderPost(item)} 
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
    shadowOffset: {height: 5},
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
})