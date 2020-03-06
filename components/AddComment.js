import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from 'native-base';

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Enter your comment here!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text style={{padding: 5, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>

        <Button title="Post comment">
          <Text>Post comment</Text>
      </Button>
      </View>

      
      
    );
  }
}