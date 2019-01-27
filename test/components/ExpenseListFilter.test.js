import React from 'react'
import { shallow } from 'enzyme';
import {ExpenseListFilter } from '../../src/components/ExpenseListFilter'
import { altfilters, filters } from '../data/filters';
import moment from 'moment'

let setTextFilter, sortByDate, sortByAmount , setStartDate , setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(<ExpenseListFilter 
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />)
})
test('should render ExpenseListFilters correctly',() => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt data correctly',() => {
  wrapper.setProps({
    filters: altfilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'New text filter'
  wrapper.find('input').simulate('change',{
    target:{
      value
    }
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)

})

test('should sort by date', () => {
  wrapper.setProps({
    filters: altfilters
  })
  wrapper.find('select').simulate('change',{
    target:{
      value: 'date'
    }
  })
  expect(sortByDate).toHaveBeenLastCalledWith()
})

test('should sort by amount', () => {
  wrapper.find('select').simulate('change',{
    target:{
      value: 'amount'
    }
  })
  expect(sortByAmount).toHaveBeenLastCalledWith()
})

test('should handle date changes', () => {
  const startDate = moment('2019-01-01')
  const endDate = moment('2019-01-31')
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle focus change', () => {
  const calendarFocused = 'startDate'
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})