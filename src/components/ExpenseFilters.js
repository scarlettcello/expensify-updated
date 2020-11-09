import React from 'react'
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { Multiselect } from 'multiselect-react-dropdown';
import { setTextFilter, 
        sortByAmount, 
        sortByDate, 
        setStartDate, 
        setEndDate, 
        setCategoryFilter } from '../actions/filters';

export class ExpenseFilters extends React.Component {
  state = {
    calendarFocused: null,
    options: [
      { id: 1, category: 'Food' },
      { id: 2, category: 'Clothes' },
      { id: 3, category: 'Housing' },
      { id: 4, category: 'Leisure' },
      { id: 5, category: 'Education' },
      { id: 6, category: 'Communication' },
      { id: 7, category: 'Transportation' },
      { id: 8, category: 'Beauty' },
      { id: 9, category: 'Medical' },
      { id: 10, category: 'Gift' },
      { id: 11, category: 'Miscellaneous' },
      { id: 12, category: 'Investment' },
      { id: 13, category: 'Tax' },
    ]
  };

  onInputChange = (e) => {
    this.props.setTextFilter(e.target.value);
  }

  onSortChange = (e) => {
    e.target.value === 'amount' ? this.props.sortByAmount() : this.props.sortByDate()
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  
  onSelect = (selectedList) => {
    this.props.setCategoryFilter(selectedList);
  }

  onRemove = (selectedList) => {
    this.props.setCategoryFilter(selectedList);
  }

  render() {
    return(
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input 
              type="text" 
              className="text-input" 
              placeholder="Search Transactions"
              value={this.props.filters.text} 
              onChange={this.onInputChange}
            />
          </div>
          <div className="input-group__item">
            <DateRangePicker 
              startDateId={"startDate"}
              startDate={this.props.filters.startDate}
              endDateId={"endDate"}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className="input-group__item">
            <label>Sort&nbsp;by:</label>&nbsp;&nbsp;
            <select 
              className="select" 
              value={this.props.filters.sortBy} 
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        </div>
        <div className="input-group">
          <Multiselect
            options={this.state.options}
            selectedValues={this.state.selectedValue}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
            displayValue="category"
            placeholder="Filter by category"
            showCheckbox={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setCategoryFilter: (categories) => dispatch(setCategoryFilter(categories)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilters);
