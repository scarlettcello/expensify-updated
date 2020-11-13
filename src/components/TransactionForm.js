import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

export default class TransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpense: props.transaction ? props.transaction.isExpense : true,
      description: props.transaction ? props.transaction.description : '',
      note: props.transaction ? props.transaction.note : '',
      amount: props.transaction ? (props.transaction.amount / 100).toString() : '',
      createdAt: props.transaction ? moment(props.transaction.createdAt) : moment(),
      calendarFocused: false,
      category: props.transaction ? props.transaction.category : '',
      error: '',
    }
  }

  onToggleChange = (e) => {
    const isExpense = !this.state.isExpense;
    const isCategoryDisabled = !this.state.disabled;
    this.setState(() => ({ isExpense }));
    this.setState(() => ({ disabled: isCategoryDisabled }));
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }
  
  onAmountChange = (e) => {
    const amount = e.target.value;
    
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }  
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  onSelectChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }));
    } else if (this.state.isExpense&&this.state.category === '') {
      this.setState(() => ({ error: 'Please select a category'}));
    } else {
      this.setState(() => ({ error: '' }));
      if (this.state.isExpense) {
        this.props.onSubmit({
          isExpense: this.state.isExpense,
          description: this.state.description,
          amount: parseFloat(this.state.amount, 10) * 100,
          createdAt: this.state.createdAt.valueOf(),
          note: this.state.note,
          category: this.state.category
        });
      } else {
        this.props.onSubmit({
          isExpense: this.state.isExpense,
          description: this.state.description,
          amount: parseFloat(this.state.amount, 10) * 100,
          createdAt: this.state.createdAt.valueOf(),
          note: this.state.note,
          category: ''
        });   
      }
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="toggle">
          <label>Income</label>
          <label className="switch">
            <input 
              type="checkbox" 
              value={this.state.isExpense}
              checked={this.state.isExpense}
              onChange={this.onToggleChange} 
            />
            <span className="slider round"></span>
          </label>
          <label>Expense</label>
        </div>             
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={(day) => false}
        />
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />  
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <select
          onChange={this.onSelectChange}
          value={this.state.category}
          className="select"
          disabled={!this.state.isExpense}
        >
          <option value="">Category</option>
          <option value="Beauty">Beauty</option>          
          <option value="Clothes">Clothes</option>
          <option value="Communication">Communication</option>
          <option value="Education">Education</option>
          <option value="Food">Food</option>
          <option value="Gift">Gift</option>  
          <option value="Housing">Housing</option>  
          <option value="Investment">Investment</option>
          <option value="Leisure">Leisure</option>          
          <option value="Medical">Medical</option>                   
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Tax">Tax</option>
          <option value="Transportation">Transportation</option>
          <option value="Utility Bills">Utility Bills</option>
        </select>
        <textarea
          placeholder="Add a note for your transaction (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button" type="submit">
            Submit
          </button>
        </div>        
      </form>  
    );
  }
}
