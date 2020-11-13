import selectTransactionsTotal from '../../selectors/transactionsTotal';
import transactions from '../fixtures/transactions';

test('should return 0 if no transactions', () => {
  const result = selectTransactionsTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
  const currentExpense = transactions[0];
  const result = selectTransactionsTotal([transactions[0]]);
  expect(result).toBe(currentExpense.amount);
});

// test('should correctly add up multiple expenses', () => {
//   const result = selectTransactionsTotal(transactions);
//   expect(result).toBe(114195);
// })