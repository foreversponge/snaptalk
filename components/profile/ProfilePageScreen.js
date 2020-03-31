import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, FlatList, Modal, Button } from 'react-native';
import Fire from '../firebase/Fire';
import LogoutButton from '../profile/LogoutButton';
import firebase from 'firebase';
import Post from '../post/Post';
import PicColor from './PicColor';
import styles from '../profile/style/ProfilePageScreenStyle';

export default class ProfilePageScreen extends Component {

  state = {
    user: {},
    nbOfFollowers: 0,
    nbOfFollowing: 0,
    nbOfPosts: 0,
    posts: [],
    isLoading: false,
    postInArray: false,
    infoColor: "#EFECF4",
    isModalVisible: false
  };

  unsubscribe = null;

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
      .collection('users')
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });

    this.getListSize();
    this.getCurrentUserPost();
  };

  getListSize = async () => {
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(Fire.shared.uid)
      .get();

    const listOfPosts = new firebase.firestore.FieldPath('listOfPosts');

    this.setState({ nbOfPosts: await user.get(listOfPosts).length });

    const listOfFollowers = new firebase.firestore.FieldPath('listOfFollowers');

    this.setState({ nbOfFollowers: await user.get(listOfFollowers).length });

    const listOfFollowing = new firebase.firestore.FieldPath('listOfFollowing');

    this.setState({ nbOfFollowing: await user.get(listOfFollowing).length });
  };

  changeModalVisibility = (bool) => {
    this.setState({ isModalVisible: bool });
  }

  setColor = (data) => {
    this.setState({ infoColor: data });
  }

  getCurrentUserPost = async () => {
    this.setState({ isLoading: true });

    this.setState({ posts: [] })

    Fire.shared.firestore
      .collection('posts')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ postInArray: false });

          if (Fire.shared.uid == doc.data().uid) {
            this.state.posts.push(doc.data());
          }
        });

        this.setState({ posts: this.state.posts.sort(function (a, b) { return (parseInt(b.timestamp) - parseInt(a.timestamp)) }) })
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  renderPost = post => {
    return <Post post={post} profilePagePost={true} />;
  };

  profileHeaderRender = () => {
    return (
      <View style={{ backgroundColor: this.state.infoColor }} >
        <View style={styles.header}>
          <Button title="Change Color" color="purple" onPress={() => this.changeModalVisibility(true)}>
            <Text>Open Modal</Text>
          </Button>

          <Modal visible={this.state.isModalVisible} onRequestClose={() => this.changeModalVisibility(false)}>
            <PicColor changeModalVisibility={this.changeModalVisibility} setColor={this.setColor} />
          </Modal>
          <LogoutButton />
        </View>

        <View>
          <View styles={styles.container}>
            <View style={styles.imageContainer}>
              <ImageBackground source={require('../../assets/Default-profile-bg.jpg')} style={styles.imageBackground}>
                <View style={styles.avatarContainer}>
                  <Image style={styles.avatar} source={this.state.user.profilePicture ? { uri: this.state.user.profilePicture } : require('../../assets/tempAvatar.jpg')}></Image>
                </View>

                <Text style={styles.name}> {this.state.user.name} </Text>
              </ImageBackground>
            </View>

            <View style={styles.info}>
              <View style={styles.state}>
                <Text style={styles.amount}> {this.state.nbOfPosts} </Text>
                <Text style={styles.title}> Posts </Text>
              </View>

              <View style={[styles.state, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                <Text style={styles.amount}> {this.state.nbOfFollowers} </Text>
                <Text style={styles.title}> Followers </Text>
              </View>

              <View style={styles.state}>
                <Text style={styles.amount}> {this.state.nbOfFollowing} </Text>
                <Text style={styles.title}> Following </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          ListHeaderComponent={this.profileHeaderRender}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isLoading}
          onRefresh={this.getData}
        />
      </View>
    );
  }
}