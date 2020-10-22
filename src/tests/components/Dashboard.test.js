import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import Dashboard from '../../components/DashBoard';

test('should render Dashboard', () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper).toMatchSnapshot();
});