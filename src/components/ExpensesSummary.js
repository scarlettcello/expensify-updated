import React from 'react'
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expensesTotal';
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal).format('$0,0.00');

  return (
    <div>
      <h1>Viewing {expensesCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
    </div>
  );
}

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: expensesTotal(visibleExpenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary);