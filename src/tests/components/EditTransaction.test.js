import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { EditTransaction } from '../../components/EditTransaction';
import transactions from '../fixtures/transactions';
import RemoveModal from '../../components/RemoveModal';

let startEditTransaction, startRemoveTransaction, history, wrapper;

beforeEach(() => {
  startEditTransaction = jest.fn();
  startRemoveTransaction = jest.fn();
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditTransaction
      startEditTransaction={startEditTransaction} 
      startRemoveTransaction={startRemoveTransaction}
      history={history}
      transaction={transactions[2]}
    />
  );
})

test('should render EditTransaction page', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editTransaction', () => {
  wrapper.find('TransactionForm').prop('onSubmit')(transactions[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditTransaction).toHaveBeenLastCalledWith(transactions[2].id, transactions[2]);
});

test('should handle startRemoveTransaction', () => {
  wrapper.find(RemoveModal).dive().find('button').at(0).prop('onClick')(transactions[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveTransaction).toHaveBeenLastCalledWith({ id: transactions[2].id });
});