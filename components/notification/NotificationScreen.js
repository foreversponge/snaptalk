import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import NotificationBox from '../notification/NotificationBox';
import styles from '../notification/style/NotificationScreenStyle';
import Firebase from 'firebase';
require('firebase/firestore');

export default class NotificationScreen extends Component {

  state = {
    user: {},
    toFollowedUserId: {},
    notifList: [],
    isLoading: false
  };

  componentDidMount() {
    this.getNotifData();
    this.renderNotif();
  };

  //This will render each notification found in the list of notifications (called in the flatlist)
  renderNotif = notification => {
    if (this.state.notifList && this.state.notifList.length > 0) {
      return (
        <NotificationBox notif={notification}></NotificationBox>
      )
    } else {
      return (
        <Text>Nothing to see here...</Text>
      )
    }
  };

  //The list of notification will be fetched from the database and stored inside notifList
  getNotifData = async () => {
    this.setState({ isLoading: true })
    const user = await Firebase.firestore()
      .collection('users')
      .doc(Firebase.auth().currentUser.uid)
      .get();
    const fieldPathListOfNotif = new Firebase.firestore.FieldPath('listOfNotif');
    let tmpListOfNotif = await user.get(fieldPathListOfNotif);
    this.setState({ notifList: tmpListOfNotif });
    this.setState({ isLoading: false })
  };

  //This method get the path to the list of notifications and removes the notification 
  //that matches the one given as a parameter.
  async deleteNotif(notification) {
    let notifRef = Firebase.firestore()
      .collection('users')
      .doc(Firebase.auth().currentUser.uid);

    let arrRemoveNotif = notifRef.update({
      listOfNotif: Firebase.firestore.FieldValue.arrayRemove(
        notification
      ),
    });

    this.getNotifData();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}> Notifications </Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.notifList}
          extraData={this.state}
          renderItem={({ item }) => this.renderNotif(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isLoading}
          onRefresh={this.getNotifData}
        />
      </View>
    );
  }

}



