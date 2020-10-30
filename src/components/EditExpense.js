import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  onClickRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onClickRemove}>
          Remove
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {  
  const subjectExpense = state.expenses.find((expense) => expense.id === props.match.params.id);
  return {
    expense: subjectExpense
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);