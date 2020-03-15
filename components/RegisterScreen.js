import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Fire from './Fire';

export default class RegisterScreen extends React.Component {

    state = {
        user: {
            name: "",
            email: "",
            password: "",
            errorMessage: null
        },
        errorMessage: null
     }

    handleSignUp = () =>
    {
        Fire.shared.createUser(this.state.user);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    {'Sign up to get started'}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y:0 }}
                    scrollEnabled={true}
                >
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Full Name</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none" 
                                onChangeText={name => this.setState({ user: {...this.state.user, name} })}
                                value={this.state.user.name}
                            ></TextInput>
                        </View>

                        <View style={{marginTop: 32}}>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput 
                                style={styles.input} 
                                autoCapitalize="none" 
                                onChangeText={email => this.setState({ user: {...this.state.user, email} })}
                                value={this.state.user.email}
                            ></TextInput>
                        </View>
                    
                        <View style={{marginTop: 32}}>
                            <View>
                                <Text style={styles.inputTitle}>Password</Text>
                                <TextInput 
                                    style={styles.input}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={password => this.setState({ user: {...this.state.user, password} })}
                                    value={this.state.user.password}
                                ></TextInput>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                        <Text style={{color:"#FFF", fontWeight: "500"}}>Sign up</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        greeting:{
            marginTop: 32,
            fontSize: 18,
            fontWeight: "400",
            textAlign: "center"
        },
        errorMessage:{
            height: 72,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 30
        },
        error:
        {
            color: "#E9446A",
            fontSize: 13,
            fontWeight: "600",
            textAlign: "center"
        },
        form:{
            marginBottom: 48,
            marginHorizontal: 30
        },
        inputTitle:
        {
            color: "#8A8F9E",
            fontSize: 10,
            textTransform: "uppercase"
        },
        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            fontSize: 15,
            color: "#161F3D"
        },
        button:
        {
            marginHorizontal: 30,
            marginBottom: 30,
            backgroundColor: "#E9446A",
            borderRadius: 4,
            height: 52,
            alignItems: "center",
            justifyContent: "center"
        }
    })