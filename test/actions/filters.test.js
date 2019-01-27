import moment from 'moment';
import {
  setTextFilter,
  setEndDate,
  setStartDate,
  sortByAmount,
  sortByDate
} from '../../src/actions/filters';
const DATE = '2019-01-18'

test('should generate set start date action object', () => {
  const action = setStartDate(moment(DATE))

  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(DATE)
  })
})

test('should generate set end date action object', () => {
  const action = setEndDate(moment(DATE))

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(DATE)
  })
})

test('should generate sort by amount action object', () => {
  const action = sortByAmount()

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
})

test('should generate sort by date action object', () => {
  const action = sortByDate()

  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  })
})

test('should generate set text filter action object with default values', () => {
  const action = setTextFilter()

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})

test('should generate set text filter action object with given values', () => {
  const filter = 'Donuts'
  const action = setTextFilter(filter)

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: filter
  })
})