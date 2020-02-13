import React, { Component } from 'react';
import {StyleSheet,View,Text, Image} from 'react-native';
import {Icon, Container, Content, Left, Right, Body, Button} from 'native-base';

import FollowButton from './components/FollowButton';
import PostButton from './components/PostButton';
import HomeButton from './components/HomeButton';
import ProfilePicture from './components/ProfilePicture';

export default class ProfilePage extends Component {
   render() {
     return (
        <>
            <Container style={styles.container}>
                <Content>
                    <View>
                        <View style={{flexDirection: 'row'}}>

                            <View style={{flex:1, paddingLeft:10, paddingTop:10}}>
                                <ProfilePicture />
                            </View>
                            <View style = {{flex:3}}>
                                <View style={{flexDirection : 'row', justifyContent: 'space-around'}}>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{paddingTop:20}}> 12345 </Text>
                                        <Text style={{paddingTop:10}}> Posts </Text>
                                    </View>
                                    <View style={{flexDirection: 'column'}}>
                                         <Text style={{paddingTop:20}}> 12345 </Text>
                                          <Text style={{paddingTop:10}}> Followers</Text>
                                    </View>
                                     <View style={{flexDirection: 'column'}}>
                                          <Text style={{paddingTop:20}}> 12345 </Text>
                                          <Text style={{paddingTop:10}}>Following</Text>
                                     </View>
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
//            <View style = {containerStyle.container}>
//                <ProfilePicture />
//                <Text> Username </Text>
//                <HomeButton />
//            </View>
//            <View style={{ width: "20%", margin: 10 }}>
//                <PostButton style/>
//            </View>


const styles = StyleSheet.create({
     container: {
     flex:1,
     backgroundColor: '#fff',
     backgroundColor:'white',
     },

});

