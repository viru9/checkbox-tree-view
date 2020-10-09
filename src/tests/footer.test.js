import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../components/footer/component/footer';

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});