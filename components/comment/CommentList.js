import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';
import CommentBox from '../comment/CommentBox';
import Fire from '../firebase/Fire';
import _ from "underscore";

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            commentList: [],
            comment: '',
            isLoading: false,
            modalVisible: false,
            commentInArray: false,
            commentsToAdd: [],
        });
    }

    componentDidMount() {
        this.getData
    };

    handleComment = () => {
        if (this.state.comment.trim() === '') {
            alert('Comment is blank.');
            return;
        }

        Fire.shared.addComment({ text: this.state.comment.trim(), postKey: this.props.postKey }).then(ref => {
            Fire.shared.addCommentKey(ref.id);
            this.setState({ comment: "" });
            Fire.shared.updateCommentList({ commentId: ref.id, postId: this.props.postKey });
        }).catch(error => {
            alert(error.message);
        });
    };

    getData = () => {
        this.setState({ isLoading: true })

        this.unsubscribe = Fire.shared.firestore
            .collection("posts")
            .get()
            .then(snapshot => {
                //Load all posts from the database
                snapshot.forEach(doc => 
                {
                    //Verify if the post in the database is the same as the post we are currently in
                    if (doc.data().postKey == this.props.postKey) 
                    {
                        //Load all the keys of the comment of that posts
                        doc.data().listOfComments.forEach(postCommentKey => 
                        {
                            this.setState({ commentInArray: false })
                            this.state.commentList.forEach(currentComment => 
                            {
                                //Verify that the comment key loaded from the post are not already saved in the array
                                if (currentComment.commentKey == postCommentKey) 
                                {
                                    this.setState({ commentInArray: true })
                                }
                            })
                            if (!this.state.commentInArray) 
                            {
                                //Save the comment keys
                                this.state.commentsToAdd.push(postCommentKey);
                            }
                        })
                    }
                })
            }).finally(() => this.setState({ isLoading: false }))

        this.setState({ isLoading: true })

        this.unsubscribe = Fire.shared.firestore
            .collection("comments")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => 
                {
                    //Load the keys of the comments to be displayed
                    this.state.commentsToAdd.forEach(commentToAdd => 
                    {
                        //Verify that the comment key are equal to the comment key to be displayed
                        if (commentToAdd == doc.data().commentKey) 
                        {
                            //Fetch the comment and push it to the comment list array
                            this.state.commentList.push(doc.data())
                        }
                    })
                })
            }).finally(() => {
                this.setState({ isLoading: false })
                this.setState({ commentsToAdd: [] })
                this.setState({ commentList: this.state.commentList.sort((a, b) => a.timestamp - b.timestamp) })
            })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderComment = item => {
        return (
            <CommentBox uri={item.avatar} name={item.username} comment={item.comment} date={item.timestamp}></CommentBox>
        );
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.container}>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Icon name="ios-close" size={50} color="#73788B" style={styles.commentExitButton} />
                            </TouchableHighlight>
                        </View>

                        <FlatList
                            data={this.state.commentList}
                            renderItem={({ item }) => this.renderComment(item)}
                            refreshing={this.state.isLoading}
                            onRefresh={this.getData}
                        />

                        <View style={styles.commentContainer}>
                            <TextInput style={styles.commentBox}
                                keyboardType='default'
                                placeholderTextColor='white'
                                placeholder='Add a comment...'
                                autoCapitalize='none'
                                onChangeText={(text) => { this.setState({ comment: text }); }}
                                value={this.state.comment}
                            />

                            <Button style={styles.commentButton} title="Post comment" onPress={this.handleComment}>
                                <Text>Post comment</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Icon name="ios-chatboxes" size={24} color="#73788B"/>
                </TouchableHighlight>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1
    },
    commentExitButton:
    {
        marginRight: 50
    },
    commentContainer:
    {
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 64
    },
    commentBox:
    {
        height: 40,
        width: 200,
        margin: 10,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white'
    },
    commentButton:
    {
        marginRight: 10
    }
})

export default CommentList;