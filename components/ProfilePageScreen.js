import React, { Component } from 'react';
import {StyleSheet,View,Text, Image, Button, TouchableHighlightBase} from 'react-native';
import {Icon, Container, Content, Left, Right, Body} from 'native-base';
import Fire from './Fire';

import ProfilePicture from './ProfilePicture';
import NumbFollowers from './NumbFollowers';
import NumbPosts from './NumbPosts';
import NumbFollowing from './NumbFollowing';
import LogoutButton from './LogoutButton';

export default class ProfilePageScreen extends Component {


    state = {
        user: {}
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
    }


    componentWillUnmount(){
        this.unsubscribe();
    }

   render() {
     return (
        <>
            <View styles = {styles.container}>
                <View style={{marginTop : 64, alignItems: "center"}}>
                    <View>
                        <ProfilePicture></ProfilePicture>
                    </View>
                    <Text style={styles.name}> {this.state.user.name} </Text>
                </View>
                <View style = {styles.info}>
                    <View style={styles.state}>
                        <Text style = {styles.amount}> 21 </Text>
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
     }


});

