import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import CommentBox from './CommentBox';
import { Button } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import AddComment from './AddComment';
import * as firebase from 'firebase';


// function writeUserData(comment){
//     firebase.database().ref('Comments/').push({
//         comment : CommentBox
//     }).then((data)=>{
//         //success callback
//         console.log('data ' , data)
//     }).catch((error)=>{
//         //error callback
//         console.log('error ' , error)
//     })
// }

// function readUserData() {
//     firebase.database().ref('Comments/').on('value', function (snapshot) {
//         console.log(snapshot.val())
//     });
// }


const comm1 = <CommentBox uri="https://assets.change.org/photos/9/yq/ux/RWYquxnYdozJBBz-800x450-noPad.jpg?1484284968" name="Frank" message="Cool pic fam" date="09/12/2323" ></CommentBox>


export default class CommentList extends Component {

    render() {
      return (
        <ScrollView>

            <AddComment></AddComment>


            {/* <Button onPress={writeUserData(comm1)}><Text>Click me to write all the comments to the db</Text></Button> */}

            <CommentBox uri="https://assets.change.org/photos/9/yq/ux/RWYquxnYdozJBBz-800x450-noPad.jpg?1484284968" name="Frank" message="Cool pic fam" date="09/12/2323" ></CommentBox>
            <CommentBox uri="https://cdn.mos.cms.futurecdn.net/c7dppKDbG3JXuMfybV5tUX-970-80.jpg" name="Einstein" message="Nice" date="09/12/2333"></CommentBox>
            <CommentBox uri="https://gmsrp.cachefly.net/images/19/01/23/30af83f34eef97cc1af94b43c7f36ebd/960.jpg" name="Messi" message="How cute!" date="09/12/1000"></CommentBox>


            {/* <Button onPress={readUserData()}><Text>Click me to read all the comments</Text></Button> */}


      </ScrollView>
      );
    }
  }