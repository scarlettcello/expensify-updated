import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { TransactionList } from '../../components/TransactionList';
import transactions from '../fixtures/transactions';

test('should render TransactionList with transactions', () => {
  const wrapper = shallow(<TransactionList transactions={transactions}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render TransactionList with empty message', () => {
  const wrapper = shallow(<TransactionList transactions={[]}/>);
  expect(wrapper).toMatchSnapshot();
});