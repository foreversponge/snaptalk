import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../components/authentication/LoginScreen'

describe('LoginScreen Test', () => {
    let loginScreenSnapshot = renderer.create(<LoginScreen />).toJSON();

    test('LoginScreen Render Test', () => {
        expect(loginScreenSnapshot).toMatchSnapshot()
    })

    //Authentication is verified by Firebase.
    //Emails and Passwords are verified by Firebase.
    //Therefore, there is nothing else to test for the login page.
})
