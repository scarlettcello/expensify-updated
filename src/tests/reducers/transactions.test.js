import transactionsReducer from '../../reducers/transactions';
import transactions from '../fixtures/transactions';

test('should set default state', () => {
  const state = transactionsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove transaction by id', () => {
  const action = { type: 'REMOVE_TRANSACTION', id: transactions[1].id }
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([ transactions[0], transactions[2]]);
});

test('should not remove transactions if id not found', () => {
  const action = { type: 'REMOVE_TRANSACTION', id: '-1' }
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual(transactions);
});

test('should add an transaction', () => {
  const transaction = {
    id: '4',
    description: 'test',
    note: '',
    amount: 999,
    createdAt: 1000,
    isExpense: false,
    category: ''
  }
  const action = { type: 'ADD_TRANSACTION', transaction };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([ ...transactions, transaction ]);
});

test('should edit an transaction', () => {
  const idToBeUpdated = transactions[0].id;
  const updatedDescription = 'chocolate';
  const action = { 
    type: 'EDIT_TRANSACTION', 
    id:idToBeUpdated, 
    updates: { description: updatedDescription 
  }};
  const state = transactionsReducer(transactions, action);
  expect(state[0].description).toBe(updatedDescription);
});

test('should not edit transaction if transaction not found', () => {
  const updates = {
    id: transactions[4],
    description: 'Chocolate',
    note: '',
    amount: 195,
    createdAt: 0,
    isExpense: true,
    category: 'food'
  }
  const action = { type: 'EDIT_TRANSACTION', updates };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual(transactions);
});

test('should set transactions', () => {
  const action = { type: 'SET_TRANSACTIONS', transactions: [transactions[1]] }
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([transactions[1]]);
});