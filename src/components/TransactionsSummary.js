import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectTransactions from '../selectors/transactions';
import expensesTotal from '../selectors/transactionsTotal';
import numeral from 'numeral';

export const TransactionsSummary = ({ incomesCount, incomesTotal, expensesCount, expensesTotal }) => {
  const incomeWord = incomesCount === 1 ? 'income' : 'incomes';
  const formattedIncomesTotal = numeral(incomesTotal/100).format('$0,0.00');
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">
          <span>{incomesCount}</span> 
          &nbsp;{incomeWord} total:&nbsp; 
          <span className="color-blue">{formattedIncomesTotal}</span>
        </h2>

        <h2 className="page-header__title">
          <span>{expensesCount}</span> 
          &nbsp;{expenseWord} total:&nbsp;
          <span className="color-red">{formattedExpensesTotal}</span>
        </h2>
        
        <div className="page-header__actions">
          <Link className="button" to="/create">Add New</Link>
        </div>
      </div>      
    </div>
  );
}

const mapStateToProps = state => {
  const visibleIncomes = selectTransactions(state.transactions, state.filters).filter((el) => !el.isExpense);
  const visibleExpenses = selectTransactions(state.transactions, state.filters).filter((el) => el.isExpense);

  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: expensesTotal(visibleExpenses),
    incomesCount: visibleIncomes.length,
    incomesTotal: expensesTotal(visibleIncomes)
  }
}

export default connect(mapStateToProps)(TransactionsSummary);
