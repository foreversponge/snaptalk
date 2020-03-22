import React, { Component } from 'react';
import {StyleSheet,View,Text, Image, Button, TouchableHighlight, Modal, Alert, ImageBackground} from 'react-native';
import Fire from './Fire';
import FollowButton from './FollowButton';



const firebase = require('firebase');
require("firebase/firestore");

export default class ModalExample extends Component {




  state = {
    modalVisible: false,
    user:{},
    nbOfFollowers:0,
    nbOfFollowing:0
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

 componentDidMount() {


 this.unsubscribe = Fire.shared.firestore
                                   .collection("users")
                                   .get()
                                   .then(snapshot => {

                                       snapshot.forEach(doc => {

                                           if (doc.data().name == this.props.username) {

                                               this.setState({user: doc.data()});
                                           //    console.log(this.state.user)

                                              this.getListSize();


                                           }
                                       })
                                   })

    };


    getListSize = async () => {

     const user = await firebase.firestore().collection("users").doc(this.props.postUserId).get();

     const listOfFollowers = new firebase.firestore.FieldPath('listOfFollowers');

     this.setState({nbOfFollowers:await user.get(listOfFollowers).length});

     const listOfFollowing = new firebase.firestore.FieldPath('listOfFollowing');

     this.setState({nbOfFollowing:await user.get(listOfFollowing).length});

    };


  render() {
    return (

      <View >
        <Modal

          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>



          <View style={{backgroundColor: "#EFECF4"}} >
            <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible);}}><Text style={styles.returnButton}>Return</Text></TouchableHighlight>
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

                    <View  style={styles.followStyle}>
                     <FollowButton/>
                    </View>






                <View style = {styles.info}>
                    <View style={styles.state}>
                        <Text style = {styles.amount}> {this.state.user.nbOfPosts} </Text>
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

        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.modalProfile}>{this.props.username}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


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
             fontFamily: "HelveticaNeue"
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
         followStyle:{
         alignItems:'center',
         justifyContent: 'center',

         }


});