import React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import ExpensesSummary from './ExpensesSummary';

const DashBoard = () => {
  return (
    <div>
      <ExpensesSummary />
      <ExpenseFilters />      
      <ExpenseList />
    </div>
  )
}

export default DashBoard;
