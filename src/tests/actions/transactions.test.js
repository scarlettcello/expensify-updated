import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  startAddTransaction, 
  addTransaction, 
  editTransaction, 
  removeTransaction,
  setTransactions, 
  startSetTransactions,
  startRemoveTransaction,
  startEditTransaction
} from '../../actions/transactions';
import transactions from '../fixtures/transactions';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const transactionsData = {};
  transactions.forEach(({ id, description, note, amount, createdAt, isExpense, category }) => {
    transactionsData[id] = { description, note, amount, createdAt, isExpense, category }
  });
  database.ref(`users/${uid}/transactions`).set(transactionsData).then(() => done());
});

test('should setup remove transaction action object', () => {
  const action = removeTransaction({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_TRANSACTION',
    id: '123abc'
  });
}); 

test('should remove the transaction from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = transactions[2].id;
  store.dispatch(startRemoveTransaction({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_TRANSACTION',
      id
    });
    return database.ref(`users/${uid}/transactions/${id}`).once('value');
  }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    }
  );  
});

test('should setup edit transaction action object', () => {
  const action = editTransaction('123abc', { note: 'test' });
  expect(action).toEqual({
    type: 'EDIT_TRANSACTION',
    id: '123abc',
    updates: {
      note: 'test'
    }
  });
});

test('should edit transaction from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = transactions[1].id;
  const updates = { description: "Updated description" }
  store.dispatch(startEditTransaction(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_TRANSACTION',
      id,
      updates
    });
    return database.ref(`users/${uid}/transactions/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe("Updated description");
    done();
  });
});

test('should setup add transaction action object with provided values', () => {
  const action = addTransaction(transactions[2]);
  expect(action).toEqual({
    type: 'ADD_TRANSACTION',
    transaction: transactions[2] 
  });
});

test('should add transaction to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const transactionData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is the most popular one',
    createdAt: 1000,
    isExpense: true,
    category: 'Education'
  }

  store.dispatch(startAddTransaction(transactionData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_TRANSACTION',
      transaction: {
        id: expect.any(String),
        ...transactionData
      }
    });

    return database
    .ref(`users/${uid}/transactions/${actions[0].transaction.id}`)
    .once('value')})
    .then((snapshot) => 
      {
        expect(snapshot.val()).toEqual(transactionData);
        done();
      }
    );
  }
);

test('should add transaction with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const transactionDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
    isExpense: true,
    category: ''
  }

  store.dispatch(startAddTransaction({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_TRANSACTION',
      transaction: {
        id: expect.any(String),
        ...transactionDefault
      }
    });

    return database
    .ref(`users/${uid}/transactions/${actions[0].transaction.id}`)
    .once('value')})
    .then((snapshot) => 
    {
      expect(snapshot.val()).toEqual(transactionDefault);
      done();
    }
  );
});

test('should setup set transaction action object with data', () => {
  const action = setTransactions(transactions);
  expect(action).toEqual({
    type: 'SET_TRANSACTIONS',
    transactions
  });
});

test('should fetch the transactions from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetTransactions()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_TRANSACTIONS',
      transactions
    });
    done();
  });
});