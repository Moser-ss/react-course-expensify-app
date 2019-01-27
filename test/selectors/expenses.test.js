import moment from 'moment';
import selectExpenses from '../../src/selectors/expenses';
import expenses from '../data/expenses';

let filters = {}

beforeEach(() => {
  filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
});

test('should filter by text value', () => {
  filters.text = 'e'
  const result = selectExpenses(expenses,filters)

  expect(result).toEqual([
    expenses[2],
    expenses[1]
  ])
})

test('should filter by startDate', () => {
  filters.startDate = moment(0)

  const result = selectExpenses(expenses, filters)
  
  expect(result).toEqual([
    expenses[2],
    expenses[0]
  ])
})

test('should filter by endDate',() => {
  filters.endDate = moment(0).subtract(1, 'days')
  
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([
    expenses[1]
  ])
})

test('should sort by date', () => {  
  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([
    expenses[2],
    expenses[0],
    expenses[1]
  ])
})

test('should sort by amount', () => {
  filters.sortBy = 'amount'

  const result = selectExpenses(expenses, filters)

  expect(result).toEqual([
    expenses[1],
    expenses[2],
    expenses[0]
  ])
})