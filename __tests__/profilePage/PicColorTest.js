import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PicColor from '../../components/profile/PicColor';

describe('PicColor Test', () => {
  let picColorSnapshot = renderer.create(<PicColor />).toJSON();

  test('PicColor Render Test', () => {
    expect(picColorSnapshot).toMatchSnapshot();
  });
});
