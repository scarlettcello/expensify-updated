import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import TransactionItem from '../../components/TransactionItem';
import transactions from '../fixtures/transactions';

test('should render an Transaction Item', () => {
  const wrapper = shallow(<TransactionItem {...transactions[0]} />);
  expect(wrapper).toMatchSnapshot();
});