import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import getVisibleExpenses from './selectors/expenses';
import configureStore from './store/configureStore';

const store = configureStore();
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

