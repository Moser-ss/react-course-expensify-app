import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
//import 'react-dates/lib/css/_datepicker.css';
import { setTextFilter , sortByDate , sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }

  onTextChange = (event) => {
    this.props.setTextFilter(event.target.value)
  }

  onSortChange = (event) => {
    switch(event.target.value){
      case 'date':
        this.props.sortByDate()
        break;
      case 'amount':
        this.props.sortByAmount()
        break;
    }
  }

  render(){
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input 
              type="text"
              className="text-input"  
              placeholder="Search expenses"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select 
              className="select"
              value={this.props.filters.sortBy} 
              onChange={this.onSortChange}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="StartDateID"
              endDate={this.props.filters.endDate}
              endDateId="EndtDateID"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              displayFormat="DD/MM/YYYY"
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilter);