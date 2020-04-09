import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePageScreen from '../../components/profile/ProfilePageScreen';

describe('ProfilePageScreen Test', () => {
    let profilePageScreenSnapshot = renderer.create(<ProfilePageScreen />).toJSON();

    test('PicColor Render Test', () => {
        expect(profilePageScreenSnapshot).toMatchSnapshot();
    })
})