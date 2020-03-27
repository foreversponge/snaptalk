import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';

export default class NumbPosts extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                Alert.alert("You have 12345 posts");
            }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ paddingTop: 20 }}> 12345 </Text>
                    <Text style={{ paddingTop: 10 }}> Posts</Text>
                </View>
            </TouchableOpacity>
        )
    };
}
