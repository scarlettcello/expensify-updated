import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import ExpenseItem from '../../components/ExpenseItem';
import expenses from '../fixtures/expenses';

test('should render an Expense Item', () => {
  const wrapper = shallow(<ExpenseItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});