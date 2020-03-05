import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
// import Fire from "./Fire";
// import * as ImagePicker from 'expo-image-picker';


// const firebase = require('firebase');
// require("firebase/firestore");

export default class PostScreen extends React.Component {

    state = {
        text: "",
        image: null
    };

//     componentDidMount() {
//         this.getPicPermission();
//     }

    // getPhotoPermission = async() => {
    //     if (Constants.platform.android){
    //         const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
    //         if (status != "granted") {
    //             alert("Sorry, permission is needed to access your camera roll.");
    //         }
    //     }
    // };

//     handlePost = () => {
//         FirebasePicture.shared.addPost({texT:this.state.text.trim(), localUri:this.state.image}).then(ref => {
//             this.setState({text:"", image:null});
//             this.props.navigation.goBack();
//         })
//         .catch(error => {
//             alert(error);
//         });
//     };

//     chooseImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4,3]
//         })
        
//         if (!result.cancelled){
//             this.setState({image: result.uri});
//         }
//     }

    render(){
        return(
            <SafeAreaView style = {StyleSheet.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style= {{fontWeight: "500"}}> Post </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.captionContainer}>
                    <Image  source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqR3FXPVUpubp2shDrw3X1iktFXSVpNFbpzl0dVz7Gao1Z-9zww&s',}} style={styles.profilePic}></Image>
                    <TextInput autofocus={true} multiline={true} numberOfLines={4} style = {{flex:1}} placeholder="Write your caption..." maxLength = {250} onChangeText={text => this.setState({text})} value={this.state.text}></TextInput>
                </View>
                <TouchableOpacity style = {styles.cameraIcon} onPress={this.chooseImage}>
                    <Icon name = "ios-camera" size = {30}/>
                </TouchableOpacity>

                <View style = {{marginalHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source = {{uri: this.state.image}} style={{width: "100%", height:"100%"}}></Image>
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