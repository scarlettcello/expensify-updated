//import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

export const addTransaction = (transaction) => ({
    type: 'ADD_TRANSACTION',
    transaction
});

export const startAddTransaction = (transactionData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { isExpense ='', description = '', note= '', amount = 0, createdAt = 0, category='' } = transactionData;
    const transaction = { isExpense, description, note, amount, createdAt, category }
    return database.ref(`users/${uid}/transactions`).push(transaction).then((ref) => {
      dispatch(addTransaction({ id: ref.key, ...transaction }));
    });
  };
}

export const removeTransaction = ({ id } = {}) => ({
  type: 'REMOVE_TRANSACTION',
  id
});

export const startRemoveTransaction = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${ uid }/transactions/${ id }`).remove().then(() => {
      dispatch(removeTransaction({ id }));
    });
  }
}

export const editTransaction = (id, updates) => ({
  type: 'EDIT_TRANSACTION',
  id,
  updates
});

export const startEditTransaction = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${ uid }/transactions/${ id }`).update(updates).then(() => {
      dispatch(editTransaction(id, updates));
    });
  }
}

export const setTransactions = (transactions) => ({
  type: 'SET_TRANSACTIONS',
  transactions
});

export const startSetTransactions = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/transactions`).once('value').then((snapshot) => {
      const transactions = [];

      snapshot.forEach((childSnapshot) => {
        transactions.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setTransactions(transactions));
    });
  }   
}