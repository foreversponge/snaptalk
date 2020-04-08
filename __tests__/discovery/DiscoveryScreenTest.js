import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DiscoveryScreen from '../../components/discovery/DiscoveryScreen'

describe('DiscoveryScreen Test', () => {
    let discoveryScreenSnapshot = renderer.create(<DiscoveryScreen />).toJSON();

    test('DiscoveryTest Render Test', () => {
        expect(discoveryScreenSnapshot).toMatchSnapshot();
    })
})
