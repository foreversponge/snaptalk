
import React from 'react';
import {StyleSheet,View,Text, Image, TextInput,TouchableOpacity} from 'react-native';



import {Container, Content, Left, Right, Body, Button} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase';


export default class App extends React.Component{


        handleSearch = () => {
        firebase.database().ref('Users/').once('value', function (snapshot) {
                console.log(snapshot.val())
            });
    }

    render() {
        return(


            <View style = {{flex: 1}}>
                <View style = {styles.header}>
                    <View style = {styles.headerText}>
                        <TextInput placeholder="Search" style={{fontSize:24, marginLeft:15}}/>

                    </View>
                </View>
                 <View>
                 <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                                                       <Text style={{color:"#FFF", fontWeight: "500"}}>Click</Text>
                                                   </TouchableOpacity>
                 </View>
           </View>


        );
    }

}



const styles = StyleSheet.create({
 container: {
 flex:1,
 alignItems: 'center'

 },
 header :{
    height:80,
    backgroundColor: '#ADFF2F',
    justifyContent: 'center',
    paddingHorizontal: 5
 },
 headerText: {
    height : 50,
    backgroundColor: 'white'

 },
 button: {
             marginHorizontal: 30,
             backgroundColor: "#E9446A",
             borderRadius: 4,
             height: 52,
             alignItems: "center",
             justifyContent: "center"
}


});


