import React, { Component } from 'react';
import {StyleSheet,View,Text, FlatList, Image, Button, TouchableHighlightBase, ScrollView} from 'react-native';
import Fire from './Fire';
import LogoutButton from './LogoutButton';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import CommentList from './CommentList'
import firebase from "firebase"

export default class ProfilePageScreen extends Component {

    state = {
        user: {},
        posts:[],
        isLoading: false,
        postInArray: false,
        result: ''
    }

    unsubscribe = null

    componentDidMount(){

        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({user: doc.data()});
            });
        this.getData
    }

    getData = () =>
    {
        this.setState({isLoading:true})
        Fire.shared.firestore
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

                if(firebase.auth().currentUser.uid == doc.data().uid)
                {
                    if (!this.state.postInArray) {
                        this.state.posts.push(doc.data())
                    }
                }
            })
            this.state.posts.sort(function(a,b){return parseInt(b.timestamp) - parseInt(a.timestamp)})
          }).finally(()=> this.setState({isLoading:false}))
    }


    componentWillUnmount(){
        this.unsubscribe();
    }

    renderPost = post => {
        return(
          <View style={styles.postContainer}>
            <Image source = {post.avatar ? {uri: post.avatar} : require('../assets/tempAvatar.jpg')} style={styles.postAvatar}/>
            <View style = {{flex: 1}}>
              <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View>
                  <Text style={styles.postName}>{(JSON.stringify(post.username)).replace(/\"/g,"")}</Text>
                  <Text style= {styles.postTimestamp}> {moment(post.timestamp).fromNow()} </Text>
                </View>
                <Icon name="ios-more" size={24} color="#73788B" />
              </View>
              <Text style={styles.post}>{post.text}</Text>
              <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"/>
              <View style={{flexDirection:"row"}}>
                <Icon name="ios-heart-empty" size={24} color="#73788B" style={{marginRight: 16}}/>
                <CommentList name="comment-list" postKey={post.postKey}></CommentList>
              </View>
            </View>
          </View>
        );
    };

    renderHeader = () =>
    {
        return(
            <View styles = {styles.container}>
                <View style={{marginTop : 32, alignItems: "center"}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={this.state.user.profilePicture ? {uri: this.state.user.profilePicture} : require('../assets/tempAvatar.jpg')}></Image>
                    </View>
                    <Text style={styles.name}> {this.state.user.name} </Text>
                </View>
                <View style = {styles.info}>
                    <View style={styles.state}>
                        <Text style = {styles.amount}> {this.state.user.nbOfPosts} </Text>
                        <Text style={styles.title}> Posts </Text>
                    </View>
                    <View style={styles.state}>
                        <Text style = {styles.amount}> 21 </Text>
                        <Text style={styles.title}> Followers </Text>
                    </View>
                    <View style={styles.state}>
                        <Text style = {styles.amount}> 21 </Text>
                        <Text style={styles.title}> Following </Text>
                    </View>
                </View>
                <LogoutButton/>
            </View>
        )
    }

   render() {
     return (
        <>
                <View style={styles.postFlatContainer}>
                    <FlatList 
                        style={styles.feed} 
                        data={this.state.posts} 
                        renderItem={({item}) => this.renderPost(item)} 
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={this.renderHeader}
                        refreshing={this.state.isLoading}
                        onRefresh={this.getData}
                        /> 
                </View>
        </>
     );
   }
}

const styles = StyleSheet.create({
     container: {
        flex:1,
     },
     name: {
         marginTop: 24,
         fontSize: 16,
         fontWeight: "bold"
     },
     info: {
         flexDirection: "row",
         justifyContent: "space-between",
         margin: 32,
     },
     state: {
         alignItems: "center",
         flex: 1
     },
     amount: {
         fontSize: 18,
         fontWeight: "bold"
     },
     title: {
         fontSize: 12,
         fontWeight: "bold",
         marginTop: 4,
     },
     avatarContainer:{
         shadowColor: "#151734",
         shadowRadius: 30,
         shadowOpacity: 0.4
     },
     avatar:
     {
         width: 100,
         height: 100,
         borderRadius: 68,
     },
     postContainer:
     {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
     },
     postAvatar:
     {
        width: 36,
        height: 36,
        borderRadius: 1,
        marginRight: 16   
     },
     postName:
     {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
     },
     postTimestamp:
     {
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
      },
      postFlatContainer:
      {
        flex: 1,
        backgroundColor: "#EFECF4"
      }
});