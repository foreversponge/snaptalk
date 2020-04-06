import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../../components/home/HomeScreen'

describe('HomeScreen Test', () => {
    let homeScreenSnapshot = renderer.create(<HomeScreen />).toJSON();

    test('HomeTest Render Test', () => {
        expect(homeScreenSnapshot).toMatchSnapshot();
    })
})

