import React from 'react'
import TransactionList from './TransactionList';
import DateAndTextFilters from './DateAndTextFilters';
import TransactionsSummary from './TransactionsSummary';

const DashBoard = () => {
  return (
    <div>
      <TransactionsSummary />
      <DateAndTextFilters />    
      <TransactionList />
    </div>
  )
}

export default DashBoard;
