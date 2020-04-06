import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoadingScreen from '../../components/authentication/LoadingScreen'
import Fire from '../../components/firebase/Fire'

describe('LoadingScreen Test', () => {
    let loadingScreenSnapshot = renderer.create(<LoadingScreen />).toJSON();

    beforeAll(() => {
        //Initializing firebase
        Fire
    })

    test('LoadingScreen Render Test', () => {
        expect(loadingScreenSnapshot).toMatchSnapshot()
    })
})