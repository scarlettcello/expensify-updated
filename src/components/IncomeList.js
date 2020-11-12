import React from 'react';
import { connect } from 'react-redux';
import TransactionItem from './TransactionItem';
import selectTransactions from '../selectors/transactions';

export const IncomeList = (props) => (  
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Transaction</div>
      <div className="show-for-desktop">Date</div>
      <div className="show-for-desktop">Transaction</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.transactions.filter(transaction => !transaction.isExpense).length > 0 ? 
          props.transactions.filter(transaction => !transaction.isExpense).map(el => {
            return <TransactionItem key={el.id} {...el} />
          }
        ) : (
          <div className="list-item list-item--message">
            <span>No Incomes</span>
          </div>
        )          
      }
    </div>   
  </div>
);

const mapStateToProps = state => {
  return { 
    transactions: selectTransactions(state.transactions, state.filters)
  }
};

export default connect(mapStateToProps)(IncomeList);
