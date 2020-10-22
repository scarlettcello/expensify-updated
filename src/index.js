import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import configureStore from './store/configureStore';

const store = configureStore();

console.log(store.getState());

store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>    
  ,
  document.getElementById('root')
);

