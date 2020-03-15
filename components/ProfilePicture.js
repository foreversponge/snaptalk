import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class ProfilePicture extends Component {
  render() {
    return (
        <View>
          <View>
            <Avatar
              rounded
              size = "large"
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqR3FXPVUpubp2shDrw3X1iktFXSVpNFbpzl0dVz7Gao1Z-9zww&s',
              }}
              onPress={() => Alert.alert('PROFILE PIC pressed')}
            />
          </View>
          
          <View>
          <Text style={{paddingTop : 10, paddingLeft : 10, fontWeight: "bold"}}>Cristiano Ronaldo</Text>
          </View>
        </View>
    );
  }
}