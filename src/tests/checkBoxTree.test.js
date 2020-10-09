import React from 'react';
import renderer from 'react-test-renderer';
import checkBoxTree from '../components/checkBoxTree/component/checkBoxTree';

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<checkBoxTree />).toJSON();
  expect(tree).toMatchSnapshot();
});