import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import CommentBox from './CommentBox';
import Fire from '../Firebase/Fire';
import _ from 'underscore';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: '',
      isLoading: false,
      modalVisible: false,
      commentInArray: false,
      commentsToAdd: [],
    };
  }

  componentDidMount() {
    this.getData;
  }

  handleComment = () => {
    if (this.state.comment.trim() === '') {
      alert('Comment is blank.');
      return;
    }

    Fire.shared
      .addComment({
        text: this.state.comment.trim(),
        postKey: this.props.postKey,
      })
      .then(ref => {
        Fire.shared.addCommentKey(ref.id);
        this.setState({comment: ''});
        Fire.shared.updateCommentList({
          commentId: ref.id,
          postId: this.props.postKey,
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  getData = () => {
    this.setState({isLoading: true});
    this.unsubscribe = Fire.shared.firestore
      .collection('posts')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().postKey == this.props.postKey) {
            doc.data().listOfComments.forEach(postCommentKey => {
              this.setState({commentInArray: false});
              this.state.comments.forEach(currentComment => {
                if (currentComment.commentKey == postCommentKey) {
                  this.setState({commentInArray: true});
                }
              });

              if (!this.state.commentInArray) {
                this.state.commentsToAdd.push(postCommentKey);
              }
            });
          }
        });
      })
      .finally(() => this.setState({isLoading: false}));

    this.setState({isLoading: true});

    this.unsubscribe = Fire.shared.firestore
      .collection('comments')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.state.commentsToAdd.forEach(commentToAdd => {
            if (commentToAdd == doc.data().commentKey) {
              this.state.comments.push(doc.data());
            }
          });
        });
      })
      .finally(() => {
        this.setState({isLoading: false});
        this.setState({commentsToAdd: []});
        this.setState({
          comments: this.state.comments.sort(
            (a, b) => a.timestamp - b.timestamp,
          ),
        });
      });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderComment = item => {
    return (
      <CommentBox
        uri={item.avatar}
        name={item.username}
        comment={item.comment}
        date={item.timestamp}></CommentBox>
    );
  };

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
          <View style={{flex: 1}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Icon
                  name="ios-close"
                  size={50}
                  color="#73788B"
                  style={{marginRight: 50}}
                />
              </TouchableHighlight>
            </View>

            <FlatList
              data={this.state.comments}
              renderItem={({item}) => this.renderComment(item)}
              refreshing={this.state.isLoading}
              onRefresh={this.getData}
            />

            <View
              style={{
                backgroundColor: 'gray',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: 64,
              }}>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  margin: 10,
                  borderColor: 'white',
                  borderWidth: 1,
                  color: 'white',
                }}
                keyboardType="default"
                placeholderTextColor="white"
                placeholder="Enter comment here"
                autoCapitalize="none"
                onChangeText={text => {
                  this.setState({comment: text});
                }}
                value={this.state.comment}
              />

              <Button
                style={{marginRight: 10}}
                title="add comment"
                onPress={this.handleComment}>
                <Text>Add comment</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Icon name="ios-chatboxes" size={24} color="#73788B" />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default CommentList;
