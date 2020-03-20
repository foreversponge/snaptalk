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
            style={{width: 70, height: 20, backgroundColor:buttonColor, marginRight:90, marginTop:10,paddingBottom:20, borderRadius:10, borderWidth: 1, borderColor: 'black'}}
            onPress={() => this.setState({followClick: !this.state.followClick, follow: !this.state.follow})}
        >
        <Text style = {{textAlign: 'center'}}>{followState}</Text>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
     buttonStyle: {
     flex:1
     },

});