import React, { Component } from 'react';
import {StyleSheet,View,Text, Image, Button, TouchableHighlight, Modal, Alert} from 'react-native';
import Fire from './Fire';


export default class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been close');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{this.props.username}</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.modalProfile}>{this.props.username}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  modalProfile:{
    paddingBottom:2

  }

});