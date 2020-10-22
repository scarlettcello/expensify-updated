import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseItem = ({ id, description, note, amount, createdAt }) => {  
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <h3>{amount}</h3>
      <h3>{createdAt}</h3>
      <p>{note}</p>
    </div>        
  );
}

export default ExpenseItem;

