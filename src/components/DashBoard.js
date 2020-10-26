import React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import ExpensesSummary from './ExpensesSummary';

const DashBoard = () => {
  return (
    <div>
      <ExpenseFilters />
      <ExpensesSummary />
      <ExpenseList />
    </div>
  )
}

export default DashBoard;
