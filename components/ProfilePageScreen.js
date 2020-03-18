import React, { Component } from 'react';
import {StyleSheet,View,Text, Image, Button, TouchableHighlightBase} from 'react-native';
import Fire from './Fire';
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
                <View style={{marginTop : 32, alignItems: "center"}}>
                    <View style={styles.avatarContaine}>
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
     }
});

