import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import OtherUserProfile from '../../components/profile/OtherUserProfile'
import Fire from '../../components/firebase/Fire'

describe('OtherUserProfile Test', () => {
    let otherUserProfileSnapshot = renderer.create(<OtherUserProfile />).toJSON();

    test('OtherUserProfile Render Test', () => {
        expect(otherUserProfileSnapshot).toMatchSnapshot();
    })
})