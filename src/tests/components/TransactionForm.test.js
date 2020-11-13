import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import TransactionForm from '../../components/TransactionForm';
import transactions from '../fixtures/transactions';

test('should render TransactionForm correctly', () => {
  const wrapper = shallow(<TransactionForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render TransactionForm with transaction data', () => {
  const wrapper = shallow(<TransactionForm transaction={transactions[1]} />)
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<TransactionForm />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<TransactionForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<TransactionForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<TransactionForm />);
  wrapper.find('input').at(2).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<TransactionForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<TransactionForm transaction={transactions[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: transactions[0].description,
    amount: transactions[0].amount,
    note: transactions[0].note,
    createdAt: transactions[0].createdAt,
    isExpense: transactions[0].isExpense,
    category: transactions[0].category
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<TransactionForm />);
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<TransactionForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});

test('should change isExpense on toggle', () => {
  const isExpense = false;
  const wrapper = shallow(<TransactionForm />);
  wrapper.find('input').at(0).simulate('change', { target: { checked: isExpense }});
  expect(wrapper.state('isExpense')).toBe(isExpense);
})