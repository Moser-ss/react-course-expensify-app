import moment from 'moment'
import filtersReducer from '../../src/reducers/filters';

test('should setup default filter values',() => {
  const state = filtersReducer(undefined, { type: '@@INIT'})

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'})
  expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  }

  const action = { type: 'SORT_BY_DATE' }
  const state = filtersReducer(currentState, action)

  expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
  const text = 'Super dude'
  
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text })

  expect(state.text).toBe(text)
})

test('should set start Date', () => {
  const date = moment('2019-01-18')

  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate : date})

  expect(state.startDate).toEqual(date)
})

test('should set end Date', () => {
  const date = moment('2019-01-31')

  const state = filtersReducer(undefined, { type: 'SET_END_DATE' , endDate: date })

  expect(state.endDate).toEqual(date)
})