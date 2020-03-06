import React, { Component } from 'react';
import { ScrollView, Text, View, Image, FlatList, TouchableHighlight, TextInput } from 'react-native';
import CommentBox from './CommentBox';
import { Button } from 'native-base';
import AddComment from './AddComment';
import * as firebase from 'firebase';
import {FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_APP_ID} from 'react-native-dotenv';

const API_KEY = FIREBASE_API_KEY;
const AUTH_DOMAIN = FIREBASE_AUTH_DOMAIN;
const DATABASE_URL = FIREBASE_DATABASE_URL;
const PROJECT_ID = FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = FIREBASE_STORAGE_BUCKET;
const APP_ID = FIREBASE_APP_ID;

var firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: "",
  appId: APP_ID
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


const rootRef = firebase.database().ref();
const commentRef = rootRef.child('Comments');



export default class CommentList extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = ({
            comments: [],
            avatar: '',
            name: '',
            comment: '',
            date: '',
            loading: false,
        });
    }

    componentDidMount() {

        this._isMounted = true;

        commentRef.on('value', (childSnapshot) => {
            const comments = [];
            childSnapshot.forEach((doc) => {
                comments.push({
                    key:  doc.key,
                    avatar: doc.toJSON().avatar,
                    name: doc.toJSON().name,
                    comment: doc.toJSON().comment,
                    date: doc.toJSON().date
                });

                if (this._isMounted) {
                    this.setState({isLoading: false})
                }

                this.setState({
                    comments: comments.sort((a, b) => {
                        return (a.date > b.date);
                    }),

                    
                    
                });
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    onPressAdd = () => {
        if (this.state.comment.trim() === '') {
            alert('Comment is blank');
            return;
        }
        commentRef.push({
            avatar: this.state.avatar,
            name: this.state.name,
            comment: this.state.comment,
            date: this.state.date
        });
    }

    

    ShowCurrentDate=()=>{
    
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
    
        return(date + '/' + month + '/' + year);
    
    }

    render() {
      return (
        <ScrollView>

            <View style={{ flex: 1}}>
                <View style={{
                    backgroundColor: 'gray',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <TextInput style={{
                        height: 40,
                        width: 200,
                        margin: 10,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'white'
                    }}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Enter comment here'
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {

                                //Change how we set the states here.
                                this.setState({ avatar: "https://cdn.mos.cms.futurecdn.net/c7dppKDbG3JXuMfybV5tUX-970-80.jpg" });
                                this.setState({ name: "Cristiano Ronaldo" });
                                this.setState({ comment: text });
                                this.setState({ date: this.ShowCurrentDate() });

                            }
                        }
                        value={this.state.comment}
                    />

                    

                    <Button style={{ marginRight: 10 }} title="add comment" onPress={this.onPressAdd}>
                        <Text>Add comment</Text>
                    </Button>

                        {//Keep the touchable below if we want to replace the button by a plus sign.
                        }

                    {/* <TouchableHighlight
                        style={{ marginRight: 10 }}
                        underlayColor='tomato'
                        onPress={this.onPressAdd}
                    >
                        <Image
                            source={{uri: "https://image.flaticon.com/icons/svg/60/60740.svg", width: 35, height: 35}}
                        />
                    </TouchableHighlight> */}
                </View>
                <FlatList
                    data={this.state.comments}
                    renderItem={({ item, index }) => {
                        

                        return (

                            <CommentBox uri={item.avatar} name={item.name} comment={item.comment} date={item.date}></CommentBox>

                        );    
                    }}                    
                >
                </FlatList>
            </View>

      </ScrollView>
      );
    }
  }