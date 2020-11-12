import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const TransactionItem = ({ id, description, amount, createdAt }) => {  
  return (
    <Link className="list-item" to={`/edit/${id}`}>
      
        <span className="list-item__sub-title">
          {moment(createdAt).format('MMM Do, YYYY')}
        </span>
        <h3 className="list-item__title">
          {description}
        </h3> 
      
        <h3 className="list-item__data">
          {numeral(amount / 100).format('$0,0.00')} 
        </h3>
              
    </Link>    
  );
}

export default TransactionItem;

