import React, { Component } from 'react';
import {StyleSheet,View,Text, Image, ImageBackground, FlatList} from 'react-native';
import Fire from './Fire';
import LogoutButton from './LogoutButton';
import firebase from "firebase";
import CustomPost from "./CustomPost";

export default class ProfilePageScreen extends Component {

    state = {
        user: {},
        nbOfFollowers:0,
        nbOfFollowing:0,
        nbOfPosts:0,
        posts:[],
        isLoading: false,
        postInArray: false,
        result: ''
    }

    unsubscribe = null

    componentDidMount(){
        this.getData();
    }

    getData = async () =>
    {
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({user: doc.data()});
        });

        this.getListSize();
        this.getCurrentUserPost();
    }

    getListSize = async () => {

        const user = await firebase.firestore().collection("users").doc(Fire.shared.uid).get();

        const listOfPosts = new firebase.firestore.FieldPath('listOfPosts');

        this.setState({nbOfPosts:await user.get(listOfPosts).length});

        const listOfFollowers = new firebase.firestore.FieldPath('listOfFollowers');

        this.setState({nbOfFollowers:await user.get(listOfFollowers).length});

        const listOfFollowing = new firebase.firestore.FieldPath('listOfFollowing');

        this.setState({nbOfFollowing:await user.get(listOfFollowing).length});

    };

    getCurrentUserPost = async() =>
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

    renderPost = post => {
        return(
          <CustomPost post = {post}/>
        )
    };

    profileHeaderRender = () => {
        return (
            <View style={{backgroundColor: "#EFECF4"}} >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignSelf: 'flex-end'}}>
                <LogoutButton/>
                </View>
                <View>
                    <View styles = {styles.container}>
                        <View style={{paddingBottom: 10}}>
                            <ImageBackground source={require('../assets/Default-profile-bg.jpg')} style={{alignItems: "center", borderTopWidth:1, borderColor:"#52575D"}}>
                                <View style={styles.avatarContainer}>
                                    <Image style={styles.avatar} source={this.state.user.profilePicture ? {uri: this.state.user.profilePicture} : require('../assets/tempAvatar.jpg')}></Image>
                                </View>
                                <Text style={styles.name}> {this.state.user.name} </Text>
                            </ImageBackground>

                        </View>
                        <View style = {styles.info}>
                            <View style={styles.state}>
                                <Text style = {styles.amount}> {this.state.nbOfPosts} </Text>
                                <Text style={styles.title}> Posts </Text>
                            </View>
                            <View style={[styles.state, {borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
                                <Text style = {styles.amount}> {this.state.nbOfFollowers} </Text>
                                <Text style={styles.title}> Followers </Text>
                            </View>
                            <View style={styles.state}>
                                <Text style = {styles.amount}> {this.state.nbOfFollowing} </Text>
                                <Text style={styles.title}> Following </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
          <View style={styles.container}>
            <FlatList 
              style={styles.feed} 
              data={this.state.posts} 
              renderItem={({item}) => this.renderPost(item)} 
              ListHeaderComponent={this.profileHeaderRender}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              refreshing={this.state.isLoading}
              onRefresh={this.getData}
              /> 
          </View>
        );
    }
};


const styles = StyleSheet.create({
    modalProfile:{
        paddingBottom:2
    },
    container: {
        flex:1,
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom:10
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32,
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
    },
    state: {
        alignItems: "center",
        flex: 1
    },
    amount: {
        fontSize: 18,
        color: "#52575D",
        fontFamily: "HelveticaNeue",
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 4,
        color:"#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4,
        paddingTop:10

    },
    avatar:
    {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth:5,
        borderColor: "#6495ED",
    },
    returnButton:
    {
        color:"#6495ED",
        paddingLeft:10,
        paddingTop: 5,
        paddingBottom:10,
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
    },
    logout:{
        alignSelf: 'flex-end'
    }
});