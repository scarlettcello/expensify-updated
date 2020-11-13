import moment from 'moment';
import selectTransactions from '../../selectors/transactions';
import transactions from '../fixtures/transactions';

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    categories: []
  };

  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[2], transactions[1] ]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
    categories: []
  };

  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[2], transactions[0] ]);
});

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days'),
    categories: []
  };

  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[0], transactions[1]]);
});

test('should filter by a category', () => {
  const filters = {
    text: '',
    sortBy: '',
    startDate: undefined,
    endDate: undefined,
    categories: [{ id: 5, category: 'Food' }]
  };

  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[0]]);
});

test('should filter by multiple categories', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    categories: [{ id: 5, category: 'Food' }, { id: 13, category: 'Transportation' }]
  };

  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[2], transactions[0] ]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    categories: []
  };
  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[2], transactions[0], transactions[1]]);
});

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
    categories: []
  };

  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([ transactions[1], transactions[2], transactions[0] ]);
});