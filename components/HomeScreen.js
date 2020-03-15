import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, SnapshotViewIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import Fire from './Fire';
import firebase from 'firebase';

posts = []

export default class HomeScreen extends React.Component{

  state = {
    posts:[],
  };

  componentDidMount(){

    this.unsubscribe = Fire.shared.firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        snapshot.forEach( doc => {
          posts.push(doc.data())
        })
      });
  };

  renderPost = post => {
    return(
      <View style={styles.feedItem}>
        <Image source = {post.avatar ? {uri: post.avatar} : require('../assets/tempAvatar.jpg')} style={styles.avatar}/>
        <View style = {{flex: 1}}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View>
              <Text style={styles.name}>{(JSON.stringify(post.username)).replace(/\"/g,"")}</Text>
              <Text style= {styles.timestamp}> {moment(post.timestamp).fromNow()} </Text>
            </View>
            <Icon name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{post.text}</Text>

          <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"/>

          <View style={{flexDirection:"row"}}>
            <Icon name="ios-heart-empty" size={24} color="#73788B" style={{marginRight: 16}}/>
            <Icon name="ios-chatboxes" size={24} color="#73788B"/>
          </View>
        </View>
      </View>
    );
  };

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}> Feed </Text>
          </View>

          <FlatList 
            style={styles.feed} 
            data={posts} 
            renderItem={({item}) => this.renderPost(item)} 
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
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
