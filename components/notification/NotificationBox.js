import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from '../notification/style/NotificationBoxStyle';
import NotificationScreen from '../notification/NotificationScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NotificationBox extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.notif}>
                    <Text title="notifText">{this.props.notif}</Text>
                    <TouchableHighlight onPress={() => { NotificationScreen.prototype.deleteNotif(this.props.notif) }} >
                        <Icon name="ios-trash" size={25} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}