import React from 'react';
import HomeScreen from '../home/HomeScreen';

export default class DiscoveryScreen extends React.Component {
  render() {
    return <HomeScreen isDiscoveryTab={true} />;
  }
}
