import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import styles from '../authentication/style/LoginScreenStyle';

export default class LoginScreen extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{'Welcome to SnapTalk'}</Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}>
          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}></TextInput>
            </View>

            <View style={styles.passwordBox}>
              <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}></TextInput>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.register}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.newToSnapTalk}>
              New to SnapTalk? <Text style={styles.signUp}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }

}