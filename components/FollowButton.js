import React, { Component } from 'react';
import { Alert, Button, TouchableHighlight, Text, StyleSheet} from 'react-native';
import { Avatar } from 'react-native-elements';

export default class FollowButton extends Component {

    state = {

    followClick: false,
    follow: false

    }


  render() {

        const buttonColor = this.state.followClick ? '#68a0cf' : 'white'
        const followState = this.state.follow ? 'Unfollow' : 'Follow'

    return (
        <TouchableHighlight
            style={{width: 70, height: 20, backgroundColor:buttonColor, borderRadius:5, borderWidth: 1, borderColor: 'black',  color: "#52575D", fontFamily: "HelveticaNeue", fontSize: 18,}}
            onPress={() => this.setState({followClick: !this.state.followClick, follow: !this.state.follow})}
        >
        <Text style = {{textAlign: 'center'}}>{followState}</Text>
        </TouchableHighlight>
    );
  }
}
