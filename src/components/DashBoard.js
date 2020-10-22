import React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';

const DashBoard = () => {
  return (
    <div>
      <ExpenseFilters />
      <ExpenseList />
    </div>
  )
}

export default DashBoard;
