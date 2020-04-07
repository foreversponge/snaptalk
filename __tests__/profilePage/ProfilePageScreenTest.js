import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePageScreen from '../../components/profile/ProfilePageScreen'
import Fire from '../../components/firebase/Fire'

describe('ProfilePageScreen Test', () => {
    let profilePageScreenSnapshot = renderer.create(<ProfilePageScreen />).toJSON();

    test('ProfilePageScreen Render Test', () => {
        expect(profilePageScreenSnapshot).toMatchSnapshot();
    })
})