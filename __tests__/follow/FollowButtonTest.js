import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FollowButton from '../../components/profile/FollowButton'
import Fire from '../../components/firebase/Fire'

describe('FollowButton Test', () => {
    let followButtonSnapshot = renderer.create(<FollowButton />).toJSON();

    test('FollowButton Render Test', () => {
        expect(followButtonSnapshot).toMatchSnapshot();
    })
})