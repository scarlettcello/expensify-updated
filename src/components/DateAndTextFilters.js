import React from 'react'
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
//import { Multiselect } from 'multiselect-react-dropdown';
import { setTextFilter, 
        sortByAmount, 
        sortByDate, 
        setStartDate, 
        setEndDate, 
        //setCategoryFilter 
      } from '../actions/filters';

export class DateAndTextFilters extends React.Component {
  state = {
    calendarFocused: null
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
            <select 
              className="select" 
              value={this.props.filters.sortBy} 
              onChange={this.onSortChange}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
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
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(DateAndTextFilters);
