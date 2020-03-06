import React, { Component } from 'react';
import {StyleSheet,View,Text, Image} from 'react-native';
import {Icon, Container, Content, Left, Right, Body, Button} from 'native-base';

import FollowButton from './FollowButton';
import PostButton from './PostButton';
import HomeButton from './HomeButton';
import ProfilePicture from './ProfilePicture';
import NumbFollowers from './NumbFollowers';
import NumbPosts from './NumbPosts';
import NumbFollowing from './NumbFollowing';

import * as firebase from 'firebase';

export default class ProfilePage extends Component {


    constructor(){
    super()




    }




   render() {
     return (
        <>
            <Container style={styles.container}>
                <Content>
                    <View>
                        <View style={{flexDirection: 'row'}}>

                            <View style={{flex:2, paddingLeft:10, paddingTop:10}}>
                                <ProfilePicture />
                                <FollowButton />
                            </View>
                            <View style = {{flex:3}}>
                                <View style={{flexDirection : 'row', justifyContent: 'space-around'}}>
                                     <NumbPosts />
                                     <NumbFollowers />
                                     <NumbFollowing />
                                </View>
                            </View>
                        </View>
                     </View>
                </Content>
            </Container>
        </>
     );
   }
}

const styles = StyleSheet.create({
     container: {
     flex:1,
     backgroundColor: '#fff',
     backgroundColor:'white',
     },

});

