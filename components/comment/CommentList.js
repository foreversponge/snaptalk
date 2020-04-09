import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Textarea } from 'native-base';
import CommentBox from '../comment/CommentBox';
import CommentController from '../firebase/CommentController';
import Popover from 'react-native-popover-view';
import styles from '../comment/style/CommentListStyle';

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
            isPopupVisible: false,
            newComment: '',
            tmpCommentList: [],
            commentState: '',
            nbOfComments: this.props.nbOfComments,
            defaultErrorMessageHeader: 'Oops...'
        });
    }

    componentDidMount() {
        this.getData
    };

    handleComment = () => {
        CommentController.shared.addComment({ text: this.state.comment.trim(), postKey: this.props.postKey }).then(ref => {
            CommentController.shared.addCommentKey(ref.id);
            this.setState({ comment: "" });
            CommentController.shared.updateCommentList({ commentId: ref.id, postId: this.props.postKey });
        }).catch(error => {
            Alert.alert(this.state.defaultErrorMessageHeader, error.message);
        });
    };

    getData = () => {
        this.setState({ isLoading: true })

        this.unsubscribe = CommentController.shared.firestore
            .collection("posts")
            .get()
            .then(snapshot => {
                //Load all posts from the database
                snapshot.forEach(doc => {
                    //Verify if the post in the database is the same as the post we are currently in
                    if (doc.data().postKey == this.props.postKey) {
                        //Load all the keys of the comment of that posts
                        doc.data().listOfComments.forEach(postCommentKey => {
                            this.setState({ commentInArray: false })
                            this.state.commentList.forEach(currentComment => {
                                //Verify that the comment key loaded from the post are not already saved in the array
                                if (currentComment.commentKey == postCommentKey) {
                                    this.setState({ commentInArray: true })
                                }
                            })
                            if (!this.state.commentInArray) {
                                //Save the comment keys
                                this.state.commentsToAdd.push(postCommentKey);
                            }
                        })
                    }
                })
            }).finally(() => this.setState({ isLoading: false }))

        this.setState({ isLoading: true })

        this.unsubscribe = CommentController.shared.firestore
            .collection("comments")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //Load the keys of the comments to be displayed
                    this.state.commentsToAdd.forEach(commentToAdd => {
                        //Verify that the comment key are equal to the comment key to be displayed
                        if (commentToAdd == doc.data().commentKey) {
                            //Fetch the comment and push it to the comment list array
                            this.state.commentList.push(doc.data())
                        }
                    })
                })
            }).finally(() => {
                this.setState({ commentsToAdd: [] })
                this.setState({ commentList: this.state.commentList.sort((a, b) => a.timestamp - b.timestamp) })
                this.setState({ nbOfComments: this.state.commentList.length })
                this.setState({ isLoading: false })
            })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    showPopover() {
        this.setState({ isPopupVisible: true });
    }

    closePopover() {
        this.setState({ isPopupVisible: false });
    }

    //Removes a comment from the list when editing or deleting a comment.
    //When editing, this function is called because we want to remove the 
    //old comment (before the edit was done). Then, the comment will be 
    //readded to the list in the getData() function but this time, the
    //comment will be the updated version from the backend. When deleting,
    //this function is called because we want to remove the comment from
    //the list so that it doesn't keep showing up to the user.
    removeCommentFromList = (comment) => {
        this.state.commentList.forEach((commentIdToDelete) => {
            if (commentIdToDelete.commentKey != comment.commentKey) {
                this.state.tmpCommentList.push(commentIdToDelete);
            }
        });

        this.setState({ commentList: this.state.tmpCommentList });
        this.setState({ tmpCommentList: [] });
    }

    //Confirming with the user that they really want to delete the comment.
    //If they do, the function deleteComment() from the backend is called 
    //which will delete the comment in the database.
    promptUserDeleteComment = (comment) => {
        const title = 'Deleting comment';
        const message = 'Are you sure you want to delete your comment?';
        const buttons = [
            { text: 'Cancel', type: 'cancel' },
            {
                text: 'Delete', onPress: () => {

                    this.setState({ isLoading: true });

                    CommentController.shared.deleteComment(comment.commentKey, comment.postKey);

                    this.removeCommentFromList(comment);

                    this.setState({ isLoading: false });
                }
            }
        ];

        Alert.alert(title, message, buttons);
    }

    renderComment = item => {
        return (
            <View style={styles.commentContainer}>
                <CommentBox uri={item.avatar} name={item.username} comment={item.comment} date={item.timestamp}></CommentBox>
                <View style={styles.buttons}>
                    <TouchableHighlight
                        onPress={() => {
                            if (CommentController.shared.uid == item.uid) {
                                this.setState({ commentState: item });
                                this.showPopover();
                            }
                            else {
                                Alert.alert(this.state.defaultErrorMessageHeader, "You cannot edit a comment that you have not posted.");
                            }
                        }}>
                        <Icon name="md-create" size={30} style={styles.editButton} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            if (CommentController.shared.uid == item.uid) {

                                this.promptUserDeleteComment(item);
                            }
                            else {
                                Alert.alert(this.state.defaultErrorMessageHeader, "You cannot delete a comment that you have not posted.");
                            }
                        }}>
                        <Icon name="ios-trash" size={30} style={styles.deleteButton} />
                    </TouchableHighlight>
                </View>
            </View>
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
                    <View style={styles.flatListContainer}>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Icon name="ios-close-circle" size={40} style={styles.commentExitButton} />
                            </TouchableHighlight>
                        </View>
                        <FlatList
                            data={this.state.commentList}
                            renderItem={({ item }) => this.renderComment(item)}
                            refreshing={this.state.isLoading}
                            onRefresh={this.getData}
                        />
                    </View>
                    <View style={styles.addCommentContainer}>
                        <Textarea style={styles.commentBox}
                            keyboardType='default'
                            placeholderTextColor='black'
                            placeholder='Add a comment'
                            autoCapitalize='none'
                            onChangeText={(text) => { this.setState({ comment: text }); }}
                            value={this.state.comment}
                        />
                        <TouchableHighlight
                            onPress={this.handleComment}>
                            <View>
                                <Icon style={styles.commentButton} name="ios-send" size={40} color="#73788B" />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.popover}>
                        <Popover
                            isVisible={this.state.isPopupVisible}
                            fromView={this.touchable}
                            onRequestClose={() => this.closePopover()}
                            mode="rn-modal"
                            style={styles.popover}>
                            <Text style={styles.editTitle}>Please enter the new comment below</Text>
                            <View style={styles.popoverButtons}>
                                <Textarea
                                    style={styles.commentBox}
                                    value={this.state.newComment}
                                    onChangeText={(text) => { this.setState({ newComment: text }); }}
                                    placeholder='Type in your edited comment' />

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({ isLoading: true });

                                        CommentController.shared.modifyComment(this.state.commentState.commentKey, this.state.newComment);

                                        this.removeCommentFromList(this.state.commentState);

                                        this.closePopover();

                                        this.setState({ isLoading: false });
                                    }}>
                                    <View>
                                        <Icon style={styles.commentButton} name="ios-send" size={40} color="#73788B" />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </Popover>
                    </View>
                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <View>
                        <Icon name="ios-chatboxes" size={24} color="#73788B" />
                        <Text>{this.state.nbOfComments}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export default CommentList;