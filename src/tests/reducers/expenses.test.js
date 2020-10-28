import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1' }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'test',
    note: '',
    amount: 999,
    createdAt: 1000
  }
  const action = { type: 'ADD_EXPENSE', expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ ...expenses, expense ]);
});

test('should edit an expense', () => {
  const idToBeUpdated = expenses[0].id;
  const updatedDescription = 'chocolate';
  const action = { 
    type: 'EDIT_EXPENSE', 
    id:idToBeUpdated, 
    updates: { description: updatedDescription 
  }};
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe(updatedDescription);
});

test('should not edit expense if expense not found', () => {
  const updates = {
    id: expenses[4],
    description: 'Chocolate',
    note: '',
    amount: 195,
    createdAt: 0
  }
  const action = { type: 'EDIT_EXPENSE', updates };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = { type: 'SET_EXPENSES', expenses: [expenses[1]] }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});