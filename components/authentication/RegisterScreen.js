import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Fire from '../firebase/Fire';
import ImagePicker from 'react-native-image-picker';
import styles from '../authentication/style/RegisterScreenStyle';

export default class RegisterScreen extends React.Component {

  state = {
    user: {
      name: '',
      email: '',
      password: '',
      avatar: null
    },
    errorMessage: null
  };

  handlePickAvatar = async () => {
    ImagePicker.launchImageLibrary(
      { aspect: [4, 3], mediaType: 'photo' },
      response => {
        console.log('Response =', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };
          this.setState({ user: { ...this.state.user, avatar: response.uri } });
        }
      },
    );
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}>
          <Text style={styles.greeting}>{'Sign up to get started'}</Text>

          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.avatarPlaceHolder}
              onPress={this.handlePickAvatar}>
              <Image
                source={{ uri: this.state.user.avatar }}
                style={styles.avatar}></Image>
              <Icon
                name="ios-add"
                size={40}
                color="#FFF"
                style={styles.addPictureIcon}></Icon>
            </TouchableOpacity>
          </View>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={name =>
                  this.setState({ user: { ...this.state.user, name } })
                }
                value={this.state.user.name}></TextInput>
            </View>

            <View style={styles.emailBox}>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={email =>
                  this.setState({ user: { ...this.state.user, email } })
                }
                value={this.state.user.email}></TextInput>
            </View>

            <View style={styles.passwordBox}>
              <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password =>
                    this.setState({ user: { ...this.state.user, password } })
                  }
                  value={this.state.user.password}></TextInput>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }

}