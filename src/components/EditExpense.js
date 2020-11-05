import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import RemoveModal from './RemoveModal';

export class EditExpense extends React.Component {
  state = {
    isOpen: undefined
  }

  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  handleOpenModal = () => {
    console.log("click to open modal");
    this.setState(() => ({ isOpen: true })
  )}

  handleCloseModal = () => {
    this.setState(() => ({ isOpen: undefined }))
  }

  onClickRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <RemoveModal 
            isOpen={this.state.isOpen} 
            handleCloseModal={this.handleCloseModal} 
            onClickRemove={this.onClickRemove} 
          />
          <button className="button button--secondary" onClick={this.handleOpenModal} >
            Remove Expense
          </button>       
        </div>        
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {  
  const subjectExpense = state.expenses.find((expense) => expense.id === props.match.params.id);
  
  return {
    expense: subjectExpense,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);