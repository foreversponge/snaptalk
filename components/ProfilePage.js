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
import ScrollFeed from './ScrollFeed';
import CommentList from './CommentList';

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
                                     <NumbPosts />
                                     <NumbFollowers />
                                     <NumbFollowing />
                                </View>
                            </View>
                        </View>
                     </View>

                    <View style={{flex:1, paddingLeft:30, paddingTop:30}}>
                                
                    </View>

                    {/* <Button   
                    onPress={() => this.props.navigation.navigate("CommentList")}>
           
                        <Text>See comments</Text>
        
                    </Button> */}


                    <CommentList></CommentList>

                    

                    {/* <ScrollFeed></ScrollFeed> */}
                    
                    
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

