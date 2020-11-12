import React from 'react';
import { connect } from 'react-redux';
import TransactionForm from './TransactionForm';
import { startEditTransaction, startRemoveTransaction } from '../actions/transactions';
import RemoveModal from './RemoveModal';

export class EditTransaction extends React.Component {
  state = {
    isOpen: undefined
  }

  onSubmit = (transaction) => {
    this.props.startEditTransaction(this.props.transaction.id, transaction);
    this.props.history.push('/');
  }

  handleOpenModal = () => {
    this.setState(() => ({ isOpen: true })
  )}

  handleCloseModal = () => {
    this.setState(() => ({ isOpen: undefined }))
  }

  onClickRemove = () => {
    this.props.startRemoveTransaction({ id: this.props.transaction.id });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Transaction</h1>
          </div>
        </div>
        <div className="content-container">
          <TransactionForm
            transaction={this.props.transaction}
            onSubmit={this.onSubmit}
          />
          <RemoveModal 
            isOpen={this.state.isOpen} 
            handleCloseModal={this.handleCloseModal} 
            onClickRemove={this.onClickRemove} 
          />
          <button className="button button--secondary" onClick={this.handleOpenModal} >
            Remove Transaction
          </button>       
        </div>        
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {  
  const subjectTransaction = state.transactions.find((transaction) => transaction.id === props.match.params.id);
  
  return {
    transaction: subjectTransaction,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return ({
    startEditTransaction: (id, transaction) => dispatch(startEditTransaction(id, transaction)),
    startRemoveTransaction: (transaction) => dispatch(startRemoveTransaction(transaction)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTransaction);