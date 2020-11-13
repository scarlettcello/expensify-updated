import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { TransactionsSummary } from '../../components/TransactionsSummary';

// test('should render Expenses Summary', () => {
//   const wrapper = shallow(<TransactionsSummary expensesCount ={1} expensesTotal={235} />);
//   expect(wrapper).toMatchSnapshot();
// });

test('should render Expenses Summary', () => {
  const wrapper = shallow(<TransactionsSummary expensesCount ={2} expensesTotal={4695} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Incomes Summary', () => {
  const wrapper = shallow(<TransactionsSummary incomesCount ={1} incomesTotal={109500} />);
  expect(wrapper).toMatchSnapshot();
});