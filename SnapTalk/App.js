
import React from 'react';
import {StyleSheet,View,Text, Image} from 'react-native';
import {Icon, Container, Content, Left, Right, Body, Button} from 'native-base';




export default class App extends React.Component{
    constructor(){
    super();
    this.state = {nbPosts: '22', nbFollowers: '222', nbFollowing: '2222'};
    }



    render() {
        return(


        <Container style={styles.container}>
            <Content>
                <View>
                    <View style={{flexDirection: 'row'}}>

                                <View style={{flex:1, paddingLeft:10, paddingTop:10}}>

                                    <Image source={require('C:/Users/laure/Documents/Concordia/GitRepos/snapstalk/SnapTalk/assets/GettyImages-1192179860.jpg')}
                                    style={{ width: 75, height: 75, borderRadius: 37.5}}/>

                                </View>

                                <View style = {{flex:3}}>
                                    <View style={{flexDirection : 'row', justifyContent: 'space-around'}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <Text style={{paddingTop:10}}>{this.state.nbPosts}</Text>
                                            <Text style={{paddingTop:10}}>Post</Text>
                                        </View>
                                        <View style={{flexDirection: 'column'}}>
                                             <Text style={{paddingTop:10}}>{this.state.nbFollowers}</Text>
                                              <Text style={{paddingTop:10}}>Followers</Text>
                                        </View>
                                         <View style={{flexDirection: 'column'}}>
                                              <Text style={{paddingTop:10}}>{this.state.nbFollowing}</Text>
                                              <Text style={{paddingTop:10}}>Following</Text>
                                         </View>
                                    </View>
                                </View>

                    </View>
                    <Text style={{paddingTop : 10, paddingLeft : 10}}>Cristiano Ronaldo</Text>
                 </View>

            </Content>
        </Container>




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


