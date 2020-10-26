import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render Expenses Summary', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount ={1} expensesTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Expenses Summary', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount ={3} expensesTotal={111235} />);
  expect(wrapper).toMatchSnapshot();
});