import React, { Component } from 'react';
import { Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PostButton extends Component {
  render() {
    return (
        <Button
            title="POST"
            type="outline"
            onPress={() => Alert.alert('POST button pressed')}
        />
    );
  }
}
