import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import NotFound from '../../components/NotFound';

test('should render Not Found page', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});