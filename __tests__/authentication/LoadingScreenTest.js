import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoadingScreen from '../../components/authentication/LoadingScreen';
import AuthenticationController from '../../components/firebase/AuthenticationController';

describe('LoadingScreen Test', () => {
  let loadingScreenSnapshot = renderer.create(<LoadingScreen />).toJSON();

  beforeAll(() => {
    //Initializing firebase
    AuthenticationController;
  });

  test('LoadingScreen Render Test', () => {
    expect(loadingScreenSnapshot).toMatchSnapshot();
  });
});
