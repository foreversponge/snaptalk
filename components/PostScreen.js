import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PermissionsAndroid} from 'react-native';
import Fire from "./Fire";
import ImagePicker from 'react-native-image-picker';

import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }



const firebase = require('firebase');
require("firebase/firestore");

export default class PostScreen extends React.Component {

    state = {
        text: "",
        image: null,
        likes: 0,
    };

    componentDidMount() {
        this.requestCameraRollPermission();
    }

    requestCameraRollPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'SnapTalk',
                message:
                  'SnapTalk needs access to your storage',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can access the external storage');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
            console.warn(err);
        }
    };

    handlePost = () => {
        Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image}).then(ref => {
            this.setState({text:"", image:null});
            this.props.navigation.goBack(); 
        })
        .catch(error => {   
            alert(error);
        });
    };

    pickImage = async () => {
        ImagePicker.launchImageLibrary({aspect: [4, 3], mediaType: 'photo'}, (response) => {
            console.log('Response =', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                const source = { uri: response.uri };
            this.setState({
                image: response.uri,
            });
            }
        });
    }

    render(){
        return(
            <SafeAreaView style = {StyleSheet.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress= {() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style= {{fontWeight: "bold"}}> Post </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.captionContainer}>
                    <Image  source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqR3FXPVUpubp2shDrw3X1iktFXSVpNFbpzl0dVz7Gao1Z-9zww&s',}} style={styles.profilePic}></Image>
                    <TextInput autofocus={true} multiline={true} numberOfLines={4} style = {{flex:1}} placeholder="Write your caption..." maxLength = {250} onChangeText={text => this.setState({text})} value={this.state.text}></TextInput>
                </View>
                <TouchableOpacity style = {styles.cameraIcon} onPress={this.pickImage}>
                    <Icon name = "ios-camera" size = {30}/>
                </TouchableOpacity>

                <View style = {{marginalHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source = {{uri: this.state.image}} style={{width: "70%", height:"70%"}}></Image>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12, 
        borderBottomWidth: 1,
        borderBottomColor: "#7E3DE8"
    },
    captionContainer: {
        margin: 32,
        flexDirection: "row"
    },
    profilePic:{
        width: 60,
        height: 60,
        borderRadius: 24,
        marginRight: 12
    },
    cameraIcon: {
        alignItems: "flex-end",
        marginHorizontal: 40
    }
});